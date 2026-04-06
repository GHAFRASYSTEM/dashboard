import { DashboardLayout } from '../components/dashboard-layout'
import { StatCard } from '../components/stat-card'
import { RecentActivity } from '../components/recent-activity'
import { QuickActions } from '../components/quick-actions'
import { PendingApprovals } from '../components/pending-approvals'
import { ContributionsChart } from '../components/contributions-chart'
import {
  Users,
  Home,
  DollarSign,
  Briefcase,
  UserCog,
  ShoppingBag,
  Megaphone,
  Images,
} from 'lucide-react'

export default function HomePage() {
  return (
    <DashboardLayout title="Dashboard Overview">
      <div className="space-y-5">

        {/* Primary KPI row */}
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Members"
            value="2,847"
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
            description="from last month"
            variant="green"
          />
          <StatCard
            title="Active Housing"
            value="156"
            icon={Home}
            trend={{ value: 8.2, isPositive: true }}
            description="listings available"
            variant="blue"
          />
          <StatCard
            title="Monthly Contributions"
            value="$92.4k"
            icon={DollarSign}
            trend={{ value: 15.3, isPositive: true }}
            description="collected this month"
            variant="green"
          />
          <StatCard
            title="Active Internships"
            value="42"
            icon={Briefcase}
            trend={{ value: 4.1, isPositive: true }}
            description="opportunities posted"
            variant="amber"
          />
        </div>

        {/* Secondary KPI row */}
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Executives"
            value="24"
            icon={UserCog}
            description="Active leadership"
            variant="green"
            size="mini"
          />
          <StatCard
            title="Pending Marketing"
            value="8"
            icon={ShoppingBag}
            description="requests awaiting review"
            variant="amber"
            size="mini"
          />
          <StatCard
            title="Announcements"
            value="12"
            icon={Megaphone}
            description="published this month"
            variant="blue"
            size="mini"
          />
          <StatCard
            title="Gallery Uploads"
            value="1,240"
            icon={Images}
            trend={{ value: 22.1, isPositive: true }}
            description="total images"
            variant="green"
            size="mini"
          />
        </div>

        {/* Chart + Quick Actions */}
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContributionsChart />
          </div>
          <QuickActions />
        </div>

        {/* Activity + Approvals */}
        <div className="grid gap-5 lg:grid-cols-2">
          <RecentActivity />
          <PendingApprovals />
        </div>

      </div>
    </DashboardLayout>
  )
}
