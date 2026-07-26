export type Gare = 'Lille Flandres' | 'Lille Europe';
export type PickupStatus = 'pending' | 'assigned' | 'completed' | 'cancelled';

// Shared shape for both the student who filed the request and the
// volunteer assigned to meet them — both are just `profiles` rows.
export type PickupContact = {
  name:          string;
  email:         string;
  photo_url:     string | null;
  ghana_phone:   string | null;
  french_phone:  string | null;
};

export type PickupRequest = {
  id:                 string;
  user_id:            string;
  phone:              string;
  arrival_date:       string; // YYYY-MM-DD
  arrival_time:       string; // HH:mm
  train_number:       string;
  gare:               Gare;
  expected_luggage:   string | null;
  house_address:      string;
  photo_url:          string | null;
  ticket_photo_url:   string | null;
  photo_signed_url:   string | null;
  ticket_signed_url:  string | null;
  status:             PickupStatus;
  assigned_to:        string | null;
  admin_notes:        string | null;
  created_at:         string;
  updated_at:         string;
  student:            PickupContact | null; // the member who filed the request
  volunteer:          PickupContact | null; // populated once assigned_to is set
};

export type PickupFilters = {
  status?: PickupStatus;
  gare?:   Gare;
  date?:   string;
};

export type AssignPickupPayload = {
  status:       PickupStatus;
  assigned_to?: string | null;
  admin_notes?: string | null;
};