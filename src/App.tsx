import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import AnnouncementsPage from './pages/announcements/page'
import ContributionsPage from './pages/contributions/page'
import HousingPage from './pages/housing/page'
import InternshipsPage from './pages/internships/page'
import MarketingPage from './pages/marketing/page'
import MembersPage from './pages/members/page'
import TrendsPage from './pages/trends/page'
import TrendDetailPage from './pages/trends/trenddetailpage'
import HousingDetailPage from './pages/housing/housingdetailpage'
import MarketplaceDetailPage from './pages/marketing/marketingdetailpage'
import MemberDetailPage from './pages/members/membersdetailpage'
import LoginPage from './pages/auth/login'
import PickupsPage from './pages/pickups/page'
import { ProtectedRoute } from './auth/protected-route'
import AuthCallback from './auth/AuthCallback'
import RoomRequestsPage from './pages/housing/RoomRequestsPage'
import { FinanceAdminRoute } from './pages/finance/components/finance-states'
import FinancePage from './pages/finance/page'
import FinanceRecordsPage from './pages/finance/records/page'
import NewFinanceRecordPage from './pages/finance/records/new/page'
import FinanceRecordDetailPage from './pages/finance/records/[id]/page'
import EditFinanceRecordPage from './pages/finance/records/[id]/edit/page'

export default function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

        <Route path="/auth/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/contributions" element={<ContributionsPage />} />

        <Route path="/housing" element={<HousingPage />} />
        <Route path="/housing/:id" element={<HousingDetailPage />} />
        <Route path="/housing/requests"  element={<RoomRequestsPage />} />

        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path='/pickup' element={<PickupsPage/>}/>
        <Route path="/trends/:id" element={<TrendDetailPage />} />
        <Route path="/marketing/:id" element={<MarketplaceDetailPage />} />
        <Route path="/members/:id" element={<MemberDetailPage />} />

        <Route element={<FinanceAdminRoute />}>
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/finance/records" element={<FinanceRecordsPage />} />
          <Route path="/finance/records/new" element={<NewFinanceRecordPage />} />
          <Route path="/finance/records/:id" element={<FinanceRecordDetailPage />} />
          <Route path="/finance/records/:id/edit" element={<EditFinanceRecordPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}