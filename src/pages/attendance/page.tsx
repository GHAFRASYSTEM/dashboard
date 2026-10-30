
import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { CalendarDays, UserCheck, UserX, TrendingUp, Search } from 'lucide-react'
import { Input } from '../../components/ui/input'

export default function AttendancePage() {
  const meetings = [
    { name: 'Community Meeting', date: '18 Oct 2026', present: 24, absent: 6 },
    { name: 'Volunteer Training', date: '15 Oct 2026', present: 18, absent: 2 },
    { name: 'Planning Session', date: '10 Oct 2026', present: 20, absent: 5 },
  ]

  const members = [
    { id: 1, name: 'Ama Mensah', email: 'ama@example.com', meeting: 'Community Meeting', status: 'Present' },
    { id: 2, name: 'Kojo Asante', email: 'kojo@example.com', meeting: 'Community Meeting', status: 'Absent' },
    { id: 3, name: 'Abena Owusu', email: 'abena@example.com', meeting: 'Volunteer Training', status: 'Present' },
    { id: 4, name: 'Kofi Boateng', email: 'kofi@example.com', meeting: 'Volunteer Training', status: 'Absent' },
    { id: 5, name: 'Akosua Addo', email: 'akosua@example.com', meeting: 'Planning Session', status: 'Present' },
  ]

  const [selectedMeeting, setSelectedMeeting] = useState(meetings[0].name)
  const [searchTerm, setSearchTerm] = useState('')

  const selectedMeetingData = meetings.find(
    (meeting) => meeting.name === selectedMeeting
  )

  const totalPresent = meetings.reduce((sum, meeting) => sum + meeting.present, 0)
  const totalAbsent = meetings.reduce((sum, meeting) => sum + meeting.absent, 0)

  const displayedPresent = selectedMeetingData?.present ?? totalPresent
  const displayedAbsent = selectedMeetingData?.absent ?? totalAbsent
  const totalAttendees = displayedPresent + displayedAbsent

  const attendanceRate = totalAttendees
    ? Math.round((displayedPresent / totalAttendees) * 100)
    : 0

  const filteredMeetings = meetings.filter(
    (meeting) => meeting.name === selectedMeeting
  )

  const filteredMembers = members.filter(
    (member) =>
      member.meeting === selectedMeeting &&
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const stats = [
    {
      label: 'Total Attendees',
      value: totalAttendees,
      icon: <CalendarDays className="size-6 text-primary" />,
      bg: 'bg-primary/10',
      gradient: 'from-primary/5 to-primary/10',
    },
    {
      label: 'Present',
      value: displayedPresent,
      icon: <UserCheck className="size-6 text-emerald-500" />,
      bg: 'bg-emerald-500/10',
      gradient: 'from-emerald-500/5 to-emerald-500/10',
    },
    {
      label: 'Absent',
      value: displayedAbsent,
      icon: <UserX className="size-6 text-red-500" />,
      bg: 'bg-red-500/10',
      gradient: 'from-red-500/5 to-red-500/10',
    },
    {
      label: 'Attendance Rate',
      value: `${attendanceRate}%`,
      icon: <TrendingUp className="size-6 text-blue-500" />,
      bg: 'bg-blue-500/10',
      gradient: 'from-blue-500/5 to-blue-500/10',
    },
  ]

  return (
    <DashboardLayout
      title="Attendance"
      subtitle="Monitor attendance across GHAFRA meetings."
      breadcrumbs={[{ label: 'Attendance' }]}
    >
      {/* Summary cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={`relative overflow-hidden border-border bg-gradient-to-br ${stat.gradient}`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Meeting attendance */}
      <Card className="mb-8 border-border">
        <div className="border-b border-border p-5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Meeting attendance</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                View attendance figures for each meeting.
              </p>
            </div>

            <select
              value={selectedMeeting}
              onChange={(event) => setSelectedMeeting(event.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm sm:max-w-xs"
              aria-label="Select a meeting"
            >
              {meetings.map((meeting) => (
                <option key={meeting.name} value={meeting.name}>
                  {meeting.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 font-medium">Meeting</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Present</th>
                <th className="p-4 font-medium">Absent</th>
                <th className="p-4 font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeetings.map((meeting) => {
                const rate = Math.round(
                  (meeting.present / (meeting.present + meeting.absent)) * 100
                )

                return (
                  <tr
                    key={meeting.name}
                    className="border-t border-border transition-colors hover:bg-muted/30"
                  >
                    <td className="p-4 font-medium">{meeting.name}</td>
                    <td className="p-4 text-muted-foreground">{meeting.date}</td>
                    <td className="p-4">{meeting.present}</td>
                    <td className="p-4">{meeting.absent}</td>
                    <td className="p-4 font-medium">{rate}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Member attendance */}
      <Card className="border-border">
        <div className="border-b border-border p-5">
          <h2 className="text-lg font-semibold">Member attendance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Attendance records for the selected meeting.
          </p>

          <div className="relative mt-4 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by member name or email..."
              aria-label="Search members by name or email"
              className="border-border bg-card pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 font-medium">Member</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-t border-border transition-colors hover:bg-muted/30"
                >
                  <td className="p-4 font-medium">{member.name}</td>
                  <td className="p-4 text-muted-foreground">{member.email}</td>
                  <td className="p-4">
                    <span
                      className={
                        member.status === 'Present'
                          ? 'rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500'
                          : 'rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500'
                      }
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-muted-foreground">
                    No attendance records found for this meeting.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-4 text-xs text-muted-foreground">
        Demonstration data only. These are fictional examples, not actual GHAFRA attendance records.
      </p>
    </DashboardLayout>
  )
}
