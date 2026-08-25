import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { DevlogFeed } from './components/DevlogFeed'
import { MediaModal } from './components/MediaModal'
import { Footer } from './components/Footer'
import { initialDevlogs } from './data/devlogs'
import { initialGameProfile } from './data/gameProfile'
import type { MediaItem } from './types/devlog'

export function App() {
  const [devlogs] = useState(initialDevlogs)
  const [gameProfile] = useState(initialGameProfile)

  // Lightbox Modal state
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Calculate total media items and max days
  const totalMediaCount = devlogs.reduce((acc, entry) => acc + (entry.media?.length || 0), 0)
  const maxDay = devlogs.reduce((max, e) => Math.max(max, e.day), 0)

  const handleJumpToFirst = () => {
    const el = document.getElementById('day-1')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleJumpToLatest = () => {
    const el = document.getElementById(`day-${maxDay}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300 antialiased">
      {/* Apple / X Frosted Header */}
      <Header
        gameProfile={gameProfile}
        totalDays={maxDay}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero / Game & Creator Profile */}
      <Hero
        gameProfile={gameProfile}
        totalDays={maxDay}
        totalMediaCount={totalMediaCount}
        onJumpToFirst={handleJumpToFirst}
        onJumpToLatest={handleJumpToLatest}
      />

      {/* Main Feed */}
      <main className="flex-1">
        <DevlogFeed
          entries={devlogs}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          onOpenModal={(media) => setSelectedMedia(media)}
        />
      </main>

      {/* Footer */}
      <Footer gameProfile={gameProfile} />

      {/* Lightbox / Video Modal */}
      <MediaModal
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </div>
  )
}

export default App
