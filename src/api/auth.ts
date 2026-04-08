import { apiFetch } from "./api"

export async function adminGoogleSignIn(access_token: string) {
  return apiFetch('/auth/admin/google', {
    method: 'POST',
    body: JSON.stringify({ access_token }),
  })
}