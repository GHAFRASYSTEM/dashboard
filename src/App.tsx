import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import AnnouncementsPage from './pages/announcements/page'
import ContributionsPage from './pages/contributions/page'
import ExecutivesPage from './pages/executives/page'
import GalleryPage from './pages/gallery/page'
import HousingPage from './pages/housing/page'
import InternshipsPage from './pages/internships/page'
import MarketingPage from './pages/marketing/page'
import MembersPage from './pages/members/page'
import TrendsPage from './pages/trends/page'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
      <Route path="/contributions" element={<ContributionsPage />} />
      <Route path="/executives" element={<ExecutivesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/housing" element={<HousingPage />} />
      <Route path="/internships" element={<InternshipsPage />} />
      <Route path="/marketing" element={<MarketingPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/trends" element={<TrendsPage />} />
    </Routes>
  )
}