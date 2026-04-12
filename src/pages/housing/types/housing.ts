export type HousingType = 'Studio' | 'Apartment' | 'Room' | 'Colocation';

export interface Charge {
  label:  string;
  amount: number;
}

export interface Housing {
  id:          string;
  title:       string;
  description: string;
  address:     string;
  city:        string;
  location:    string;
  type:        HousingType;
  bedrooms:    number;
  bathrooms:   number;
  size:        number;       // m²
  price:       number;       // monthly
  available:   boolean;
  images:      string[];     // Supabase storage URLs
  charges:     Charge[];
  notes:       string;
  author_id:   string;
  created_at:  string;
  updated_at:  string;
}

export interface HousingResponse {
  housing: Housing[];
  total:   number;
  page:    number;
  limit:   number;
  pages:   number;
}

export interface HousingFilters {
  page?:       number;
  limit?:      number;
  city?:       string;
  type?:       HousingType;
  available?:  boolean;
  min_price?:  number;
  max_price?:  number;
  sort_by?:    'price' | 'created_at' | 'size';
  sort_order?: 'asc' | 'desc';
}

export interface RoomRequest {
  id:         string;
  housing_id: string;
  user_id:    string;
  message:    string;
  status:     'pending' | 'approved' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
  housing?: {
    id:       string;
    title:    string;
    city:     string;
    location: string;
    type:     HousingType;
    price:    number;
    images:   string[];
    address:  string;
  };
  user?: {
    id:          string;
    name:        string;
    email:       string;
    photo_url:   string | null;
    ghana_phone: string | null;
    region:      string | null;
    occupation:  string | null;
    is_verified: boolean;
  };
}

export interface CreateHousingPayload {
  title:       string;
  description: string;
  address:     string;
  city:        string;
  location:    string;
  type:        HousingType;
  bedrooms:    number;
  bathrooms:   number;
  size:        number;
  price:       number;
  available:   boolean;
  notes:       string;
  charges:     Charge[];
  images:      string[];     // base64 data URLs — backend converts
}