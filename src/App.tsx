import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { DevlogFeed } from './components/DevlogFeed'
import { MediaModal } from './components/MediaModal'
import { NewEntryModal } from './components/NewEntryModal'
import { GuideModal } from './components/GuideModal'
import { EditProfileModal } from './components/EditProfileModal'
import { Footer } from './components/Footer'
import { initialDevlogs } from './data/devlogs'
import { initialGameProfile } from './data/gameProfile'
import type { DevlogEntry, GameProfile, MediaItem } from './types/devlog'

export function App() {
  // Load devlogs from localStorage if present, else fallback to initialDevlogs
  const [devlogs, setDevlogs] = useState<DevlogEntry[]>(() => {
    const saved = localStorage.getItem('gamedev_devlogs')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch {}
    }
    return initialDevlogs
  })

  // Load game profile from localStorage if present, else fallback to initialGameProfile
  const [gameProfile, setGameProfile] = useState<GameProfile>(() => {
    const saved = localStorage.getItem('gamedev_profile')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {}
    }
    return initialGameProfile
  })

  // Modal states
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gamedev_devlogs', JSON.stringify(devlogs))
  }, [devlogs])

  useEffect(() => {
    localStorage.setItem('gamedev_profile', JSON.stringify(gameProfile))
  }, [gameProfile])

  // Count total media across all devlogs
  const totalMediaCount = devlogs.reduce((acc, entry) => acc + (entry.media?.length || 0), 0)
  
  // Calculate highest day number
  const maxDay = devlogs.reduce((max, e) => Math.max(max, e.day), 0)
  const nextDayNumber = maxDay + 1

  const handleSaveEntry = (newEntry: DevlogEntry) => {
    // Replace if exists (same day) or prepend
    const existingIndex = devlogs.findIndex(e => e.day === newEntry.day)
    if (existingIndex >= 0) {
      const updated = [...devlogs]
      updated[existingIndex] = newEntry
      setDevlogs(updated)
    } else {
      setDevlogs([newEntry, ...devlogs])
    }
  }

  const handleSaveProfile = (updated: GameProfile) => {
    setGameProfile(updated)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Navbar */}
      <Header
        gameProfile={gameProfile}
        totalDays={maxDay}
        totalEntries={devlogs.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNewEntry={() => setIsNewEntryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* Hero Banner */}
      <Hero
        gameProfile={gameProfile}
        totalDays={maxDay}
        totalMediaCount={totalMediaCount}
        onEditProfile={() => setIsEditProfileOpen(true)}
        onOpenNewEntry={() => setIsNewEntryOpen(true)}
      />

      {/* Main Feed */}
      <main className="flex-1">
        <DevlogFeed
          entries={devlogs}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          onOpenModal={(media) => setSelectedMedia(media)}
          onOpenNewEntry={() => setIsNewEntryOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer gameProfile={gameProfile} />

      {/* Lightbox / Video Modal */}
      <MediaModal
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

      {/* Log Today's Progress Modal */}
      <NewEntryModal
        isOpen={isNewEntryOpen}
        onClose={() => setIsNewEntryOpen(false)}
        nextDayNumber={nextDayNumber}
        onSaveEntry={handleSaveEntry}
        allEntries={devlogs}
      />

      {/* Deployment & Footage Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Game Profile Editor Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={gameProfile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  )
}

export default App
