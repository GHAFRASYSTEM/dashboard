import { DashboardLayout } from '../components/dashboard-layout'
import { StatCard } from '../components/stat-card'
import { RecentActivity } from '../components/recent-activity'
import { QuickActions } from '../components/quick-actions'
import { PendingApprovals } from '../components/pending-approvals'
import { ContributionsChart } from '../components/contributions-chart'
import {
  Users,
  UserCog,
  Home,
  Briefcase,
  ShoppingBag,
  Megaphone,
  DollarSign,
  Images,
} from 'lucide-react'

export default function HomePage() {
  return (
    <DashboardLayout title="Dashboard Overview">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Members"
            value="2,847"
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
            description="from last month"
          />
          <StatCard
            title="Total Executives"
            value="24"
            icon={UserCog}
            description="Active leadership"
          />
          <StatCard
            title="Active Housing"
            value="156"
            icon={Home}
            trend={{ value: 8.2, isPositive: true }}
            description="listings available"
          />
          <StatCard
            title="Active Internships"
            value="42"
            icon={Briefcase}
            trend={{ value: 4.1, isPositive: true }}
            description="opportunities posted"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Pending Marketing"
            value="8"
            icon={ShoppingBag}
            description="requests awaiting review"
          />
          <StatCard
            title="Announcements"
            value="12"
            icon={Megaphone}
            description="published this month"
          />
          <StatCard
            title="Monthly Contributions"
            value="$92,400"
            icon={DollarSign}
            trend={{ value: 15.3, isPositive: true }}
            description="collected this month"
          />
          <StatCard
            title="Gallery Uploads"
            value="1,240"
            icon={Images}
            trend={{ value: 22.1, isPositive: true }}
            description="total images"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContributionsChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity />
          <PendingApprovals />
        </div>
      </div>
    </DashboardLayout>
  )
}