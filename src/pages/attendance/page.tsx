
import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout'
import { Card, CardContent } from '../../components/ui/card'
import { CalendarDays, ChartNoAxesCombined } from 'lucide-react'
import { AttendanceOverview } from './components/attendance-overview'
import { MeetingsManagement } from './components/meetings-management'
import { GeofenceSettings } from './components/geofence-settings'
import { AttendanceRecords } from './components/attendance-records'
import { MemberAttendanceHistory } from './components/member-attendance-history'


export default function AttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState('November')
  const [selectedYear, setSelectedYear] = useState('2026')

  return (
    <DashboardLayout
      title="Attendance"
      subtitle="Monitor member attendance and manage GHAFRA meetings."
      breadcrumbs={[{ label: 'Attendance' }]}
    >
      {/* Attendance Overview */}
      <AttendanceOverview stats={null} loading={false} />

      {/* Monthly Attendance Summary */}
      <Card className="mt-8 border-border">
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Monthly Attendance Summary
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor attendance trends across GHAFRA meetings.
            </p>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
              aria-label="Select month"
            >
              {[
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December',
              ].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
              aria-label="Select year"
            >
              {['2025', '2026', '2027'].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
            <ChartNoAxesCombined className="mb-4 size-8 text-primary" />
            <h3 className="font-semibold">
              Monthly attendance data unavailable
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Monthly statistics and trends will appear here once the
              attendance backend is connected.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Selected period: {selectedMonth} {selectedYear}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Meetings */}
      <Card className="mt-8 border-border">
        <div className="border-b border-border p-5">
          <h2 className="text-lg font-semibold">Recent Meetings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of recently completed attendance meetings.
          </p>
        </div>

        <div className="flex min-h-[180px] flex-col items-center justify-center p-6 text-center">
          <CalendarDays className="mb-3 size-8 text-muted-foreground" />
          <h3 className="font-medium">No meeting records available</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Meeting records will appear here when they are available
            from the backend.
          </p>
        </div>
      </Card>

      {/* Meeting Management */}
       <div className="mt-10">
         <MeetingsManagement />
       </div>

     {/* Geofence Settings */}
       <div className="mt-10">
        <GeofenceSettings />
      </div>

      {/* Attendance Records */}
      <div className="mt-10">
        <AttendanceRecords />
      </div>

      {/* Member Attendance History */}
      <div className="mt-10">
        <MemberAttendanceHistory />
      </div>
    </DashboardLayout>
  )
}
