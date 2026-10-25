import { useState } from 'react'
export default function AttendancePreview() {
  const meetings = [
    { name: 'Community Meeting', date: '18 Oct 2026', present: 24, absent: 6 },
    { name: 'Volunteer Training', date: '15 Oct 2026', present: 18, absent: 2 },
    { name: 'Planning Session', date: '10 Oct 2026', present: 20, absent: 5 },
  ]
   const members = [
    {id: 1, name: 'Ama Mensah', email: 'ama@example.com', meeting: 'Community Meeting', status: 'Present'},
    {id: 2, name: 'Kojo Asante', email: 'kojo@example.com', meeting: 'Community Meeting', status: 'Absent'},
    {id: 3, name: 'Abena Owusu', email: 'abena@example.com', meeting: 'Volunteer Training', status: 'Present'},
    {id: 4, name: 'Kofi Boateng', email: 'kofi@example.com', meeting: 'Volunteer Training', status: 'Absent' },
    {id: 5, name: 'Akosua Addo', email: 'akosua@example.com', meeting: 'Planning Session', status: 'Present', },
   ]

  const [selectedMeeting, setSelectedMeeting] = useState(meetings[0].name)
  const [searchTerm, setSearchTerm] = useState('')
  const totalPresent = meetings.reduce((sum, meeting) => sum + meeting.present, 0)
  const totalAbsent = meetings.reduce((sum, meeting) => sum + meeting.absent, 0)
  const attendanceRate = Math.round(
    (totalPresent / (totalPresent + totalAbsent)) * 100,
  )
  const selectedMeetingData = meetings.find(
  (meeting) => meeting.name === selectedMeeting,
)

   const displayedPresent = selectedMeetingData?.present ?? totalPresent
   const displayedAttendanceRate = selectedMeetingData
     ? Math.round(
         (selectedMeetingData.present /
           (selectedMeetingData.present + selectedMeetingData.absent)) *
           100,
        )
       : attendanceRate
    const filteredMeetings = meetings.filter(
         (meeting) => meeting.name === selectedMeeting,
        )
    const filteredMembers = members.filter(
     (member) =>
       member.meeting === selectedMeeting &&
       (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         member.email.toLowerCase().includes(searchTerm.toLowerCase())),
)

  return (
    <main className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <p className="text-sm font-medium text-primary">
            GHAFRA ADMIN
          </p>
          <h1 className="mt-2 text-3xl font-bold">Attendance Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor attendance across GHAFRA meetings.
          </p>
          <p className="mt-3 inline-block rounded-md border px-3 py-1 text-xs">
            Local preview · Mock data only
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Meetings</p>
            <p className="mt-2 text-3xl font-bold">{selectedMeetingData ? 1 : meetings.length}</p>
          </div>
          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Present</p>
            <p className="mt-2 text-3xl font-bold">{displayedPresent}</p>
          </div>
          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Attendance rate</p>
            <p className="mt-2 text-3xl font-bold">{displayedAttendanceRate}%</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border">
          <div className="border-b p-5">
            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-medium">Select a meeting</span>
              <select
                 value={selectedMeeting}
                 onChange={(event) => setSelectedMeeting(event.target.value)}
                 className="w-full rounded-md border bg-background p-2 sm:max-w-sm"
       >
                 {meetings.map((meeting) => (
                   <option key={meeting.name} value={meeting.name}>
                     {meeting.name}
                    </option>
                  ))}
                 </select>
            </label>
            <h2 className="text-lg font-semibold">Meeting attendance</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Example records for layout testing.
            </p>
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
                    (meeting.present /
                      (meeting.present + meeting.absent)) *
                      100,
                  )

                  return (
                    <tr key={meeting.name} className="border-t">
                      <td className="p-4 font-medium">{meeting.name}</td>
                      <td className="p-4">{meeting.date}</td>
                      <td className="p-4">{meeting.present}</td>
                      <td className="p-4">{meeting.absent}</td>
                      <td className="p-4">{rate}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="overflow-hidden rounded-xl border">
          <div className="border-b p-5">
            <h2 className="text-lg font-semibold">Member attendance</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Attendance records for the selected meeting.
            </p>

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by member name or email..."
              aria-label="Search members by name or email"
              className="mt-4 w-full rounded-md border bg-background p-2 sm:max-w-md"
            />
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
                  <tr key={member.id} className="border-t">
                    <td className="p-4 font-medium">{member.name}</td>
                    <td className="p-4">{member.email}</td>
                    <td className="p-4">
                      <span
                        className={
                          member.status === 'Present'
                            ? 'rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800'
                            : 'rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800'
                        }
                      >
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-muted-foreground">
                      No attendance records for this meeting.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-muted-foreground">
          These figures are fictional examples, not actual GHAFRA attendance records.
        </p>
      </div>
    </main>
  )
}
