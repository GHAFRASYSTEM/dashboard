
export type AttendanceStatus = 'present' | 'absent'

export type MeetingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled'

export interface AttendanceStats {
  totalMembers: number
  totalAttended: number
  totalAbsent: number
  attendanceRate: number
  meetingsHeld: number
}

export interface Meeting {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  status: MeetingStatus
}

export interface AttendanceRecord {
  id: string
  memberId: string
  memberName: string
  registrationNumber: string
  meetingId: string
  meetingTitle: string
  meetingDate: string
  status: AttendanceStatus
  recordedAt: string | null
  validationStatus: 'validated' | 'pending' | 'rejected'
}

export interface GeofenceSettings {
  enabled: boolean
  locationName: string
  latitude: number | null
  longitude: number | null
  radiusMetres: number
}
