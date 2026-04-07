import type { MediaItem } from '../types/gallery'

export const filterMediaItems = (
  media: MediaItem[],
  search: string,
  selectedCategory: string,
  typeFilter: string
) => {
  const normalizedSearch = search.trim().toLowerCase()

  return media.filter((item) => {
    const matchSearch =
      normalizedSearch === '' ||
      item.title.toLowerCase().includes(normalizedSearch)

    const matchCategory =
      selectedCategory === 'All' || item.category === selectedCategory

    const matchType =
      typeFilter === 'All Media' ||
      (typeFilter === 'Pictures' ? item.type === 'image' : item.type === 'video')

    return matchSearch && matchCategory && matchType
  })
}

export const getGalleryStats = (media: MediaItem[], groupsCount: number) => {
  const imageCount = media.filter((m) => m.type === 'image').length
  const videoCount = media.filter((m) => m.type === 'video').length
  const totalSize = media.reduce((acc, item) => acc + parseFloat(item.size), 0)

  const now = new Date()
  const thisMonth = media.filter((item) => {
    return (
      item.uploadedAt.getMonth() === now.getMonth() &&
      item.uploadedAt.getFullYear() === now.getFullYear()
    )
  }).length

  return {
    totalMedia: media.length,
    imageCount,
    videoCount,
    groupsCount,
    thisMonth,
    totalSize: `${totalSize.toFixed(1)} MB`,
  }
}