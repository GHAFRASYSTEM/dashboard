
import { useState } from 'react'
import { Search, ClipboardList, Filter, RotateCcw } from 'lucide-react'
import { Card } from '../../../components/ui/card'
import type { AttendanceRecord, AttendanceStatus } from '../types/attendance'

export function AttendanceRecords() {
  const [memberSearch, setMemberSearch] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [meetingDate, setMeetingDate] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [meetingSearch, setMeetingSearch] = useState('')

  // Real records will be retrieved from the backend.
  const records: AttendanceRecord[] = []

  const filteredRecords = records.filter(record => {
    const matchesMember = record.memberName
      .toLowerCase()
      .includes(memberSearch.toLowerCase())

    const matchesMonth = !selectedMonth ||
      record.meetingDate.startsWith(selectedMonth)

    const matchesDate = !meetingDate ||
      record.meetingDate === meetingDate

    const matchesStatus = selectedStatus === 'all' ||
      record.status === selectedStatus

    const matchesMeeting = record.meetingTitle
      .toLowerCase()
      .includes(meetingSearch.toLowerCase())

    return matchesMember && matchesMonth && matchesDate &&
      matchesStatus && matchesMeeting
  })

  const clearFilters = () => {
    setMemberSearch('')
    setSelectedMonth('')
    setMeetingDate('')
    setSelectedStatus('all')
    setMeetingSearch('')
  }

  const statusStyles: Record<AttendanceStatus, string> = {
    present: 'bg-emerald-500/10 text-emerald-500',
    absent: 'bg-red-500/10 text-red-500',
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Monthly Attendance Records</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          View and filter attendance records for GHAFRA meetings.
        </p>
      </div>

      {/* Filters */}
      <Card className="border-border p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-primary" />
            <h3 className="font-medium">Search and Filters</h3>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            Clear filters
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Member Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={memberSearch}
                onChange={e => setMemberSearch(e.target.value)}
                placeholder="Search member..."
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Meeting Date</label>
            <input
              type="date"
              value={meetingDate}
              onChange={e => setMeetingDate(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Attendance Status</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            >
              <option value="all">All statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Specific Meeting</label>
            <input
              value={meetingSearch}
              onChange={e => setMeetingSearch(e.target.value)}
              placeholder="Search meeting title..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
        </div>
      </Card>

      {/* Records table */}
      <Card className="overflow-hidden border-border">
        <div className="border-b border-border p-5">
          <h3 className="font-semibold">Attendance History</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredRecords.length} records found
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30 text-muted-foreground">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Member</th>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Registration ID</th>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Meeting</th>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Date</th>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Status</th>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Recorded At</th>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Validation</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredRecords.map(record => (
                <tr key={record.id} className="hover:bg-muted/20">
                  <td className="whitespace-nowrap px-4 py-4 font-medium">
                    {record.memberName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {record.registrationNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {record.meetingTitle}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {record.meetingDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[record.status]}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {record.recordedAt ?? '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {record.validationStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="flex min-h-[200px] flex-col items-center justify-center p-6 text-center">
            <ClipboardList className="mb-3 size-9 text-muted-foreground" />
            <h3 className="font-medium">No attendance records available</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Attendance records will appear here once they are retrieved
              from the backend.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
