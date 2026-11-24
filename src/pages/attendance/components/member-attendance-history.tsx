
import { useState } from 'react'
import { Search, History } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import type { AttendanceRecord } from '../types/attendance'

export function MemberAttendanceHistory() {
  const [memberSearch, setMemberSearch] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  // Real member history will be loaded from the backend API.
  const records: AttendanceRecord[] = []

  const filteredRecords = records.filter((record) => {
    const matchesMember =
      record.memberName.toLowerCase().includes(memberSearch.toLowerCase()) ||
      record.registrationNumber.toLowerCase().includes(memberSearch.toLowerCase())

    const matchesMonth =
      !selectedMonth || record.meetingDate.startsWith(selectedMonth)

    return matchesMember && matchesMonth
  })

  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <History className="size-6 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Individual Member Attendance History
            </h2>
            <p className="text-sm text-muted-foreground">
              View a member's attendance across meetings.
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Search Member
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={memberSearch}
                onChange={(event) => setMemberSearch(event.target.value)}
                placeholder="Member name or registration ID"
                className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Filter by Month
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-3 py-3 font-medium">Meeting</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Attendance</th>
                <th className="px-3 py-3 font-medium">Recorded At</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-border">
                    <td className="px-3 py-3">{record.meetingTitle}</td>
                    <td className="px-3 py-3">{record.meetingDate}</td>
                    <td className="px-3 py-3">
                      <span
                        className={
                          record.status === 'present'
                            ? 'text-emerald-500'
                            : 'text-red-500'
                        }
                      >
                        {record.status === 'present' ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {record.recordedAt ?? '—'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-10 text-center text-muted-foreground"
                  >
                    {memberSearch
                      ? 'Member history will be available when the backend is connected.'
                      : 'Search for a member to view their attendance history. Member search requires backend integration.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
