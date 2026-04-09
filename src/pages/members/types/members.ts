export type MemberRole       = 'member' | 'admin' | 'moderator';
export type MemberType       = 'full' | 'associate' | 'honorary';
export type MemberGender     = 'male' | 'female' | 'prefer_not_to_say';
export type MemberRegion     = 'Accra' | 'Kumasi' | 'Tamale' | 'Sunyani';

export interface Member {
  id:           string;
  email:        string;
  name:         string;
  photo_url:    string | null;
  gender:       MemberGender | null;
  ghana_phone:  string | null;
  french_phone: string | null;
  city:         string | null;
  occupation:   string | null;
  region:       MemberRegion | null;
  role:         MemberRole;
  member_type:  MemberType;
  is_complete:  boolean;
  is_verified:  boolean;
  member_since: string;   // ISO date
  created_at:   string;   // ISO datetime
  updated_at:   string;
}

export interface MembersResponse {
  members: Member[];
  total:   number;
  page:    number;
  limit:   number;
  pages:   number;
}

export interface MemberStats {
  total:      number;
  verified:   number;
  complete:   number;
  incomplete: number;
  by_region:  Record<string, number>;
}

export interface MemberFilters {
  page?:              number;
  limit?:             number;
  search?:            string;
  region?:            MemberRegion;
  gender?:            MemberGender;
  role?:              MemberRole;
  member_type?:       MemberType;
  is_verified?:       boolean;
  is_complete?:       boolean;
  member_since_from?: string;
  member_since_to?:   string;
  created_from?:      string;
  created_to?:        string;
  sort_by?:           string;
  sort_order?:        'asc' | 'desc';
}

export interface UpdateMemberPayload {
  name?:         string;
  gender?:       MemberGender;
  ghana_phone?:  string;
  french_phone?: string | null;
  city?:         string;
  occupation?:   string;
  region?:       MemberRegion;
  role?:         MemberRole;
  member_type?:  MemberType;
  is_verified?:  boolean;
  is_complete?:  boolean;
  member_since?: string;
}