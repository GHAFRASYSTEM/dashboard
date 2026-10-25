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
import AttendancePage from './pages/attendance/page'
import AttendancePreview from './pages/attendance/preview'


export default function App() {
  return (
    <Routes>
      {import.meta.env.DEV && (
        <Route
           path="/attendance-preview"
          element={<AttendancePreview />}
       />
    )}

        <Route path="/auth/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
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
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}