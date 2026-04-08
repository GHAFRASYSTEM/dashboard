import type { MarketplaceAd } from '../types/marketplace'

export const formatMarketplacePrice = (ad: MarketplaceAd) => {
  if (ad.priceType === 'free') return 'Free'
  if (ad.priceType === 'contact') return 'Contact for Price'

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(ad.price)

  return ad.priceType === 'negotiable' ? `${formatted}` : formatted
}

export const filterMarketplaceAds = (
  ads: MarketplaceAd[],
  selectedCategory: string,
  statusFilter: 'all' | 'pending' | 'approved' | 'rejected',
  searchQuery: string
) => {
  const query = searchQuery.trim().toLowerCase()

  return ads.filter((ad) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || ad.category === selectedCategory

    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter

    const matchesSearch =
      query === '' ||
      ad.title.toLowerCase().includes(query) ||
      ad.description.toLowerCase().includes(query) ||
      ad.submittedBy.toLowerCase().includes(query)

    return matchesCategory && matchesStatus && matchesSearch
  })
}

export const getMarketplaceStats = (ads: MarketplaceAd[]) => {
  return {
    pendingCount: ads.filter((ad) => ad.status === 'pending').length,
    approvedCount: ads.filter((ad) => ad.status === 'approved').length,
    rejectedCount: ads.filter((ad) => ad.status === 'rejected').length,
    totalViews: ads.reduce((sum, ad) => sum + ad.views, 0),
  }
}

export const renderMarketplaceDescription = (text: string) => {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="ml-4 text-foreground">
          {line.slice(2)}
        </li>
      )
    }

    if (line.endsWith(':')) {
      return (
        <p key={i} className="mt-4 mb-2 font-semibold text-foreground">
          {line}
        </p>
      )
    }

    if (line === '') {
      return <br key={i} />
    }

    return (
      <p key={i} className="text-foreground">
        {line}
      </p>
    )
  })
}