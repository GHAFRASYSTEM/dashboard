import { supabase } from "../lib/supabase"

const BASE_URL = import.meta.env.VITE_API_URL as string

type ApiError = {
  status: number
  data: unknown
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  // ✅ Get current session
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  const isFormData = options.body instanceof FormData

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  let dataResponse: unknown = null

  try {
    dataResponse = await res.json()
  } catch {
    dataResponse = null
  }

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      data: dataResponse,
    }
    throw error
  }

  return dataResponse as T
}