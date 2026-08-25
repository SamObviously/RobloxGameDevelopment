import React, { useState, useMemo } from 'react'
import { ArrowUpDown, LayoutGrid, LayoutList, SearchX, Film, Image as ImageIcon } from 'lucide-react'
import type { DevlogEntry, MediaItem } from '../types/devlog'
import { DevlogCard } from './DevlogCard'

interface DevlogFeedProps {
  entries: DevlogEntry[]
  searchQuery: string
  selectedTag: string | null
  onSelectTag: (tag: string | null) => void
  onOpenModal: (media: MediaItem) => void
}

export const DevlogFeed: React.FC<DevlogFeedProps> = ({
  entries,
  searchQuery,
  selectedTag,
  onSelectTag,
  onOpenModal
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [viewMode, setViewMode] = useState<'feed' | 'gallery'>('feed')

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    entries.forEach(entry => {
      entry.tags?.forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet)
  }, [entries])

  // Filter & sort entries
  const filteredEntries = useMemo(() => {
    return entries
      .filter(entry => {
        if (selectedTag && !entry.tags?.includes(selectedTag)) {
          return false
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchesTitle = entry.title.toLowerCase().includes(q)
          const matchesSummary = entry.summary.toLowerCase().includes(q)
          const matchesDay = `day ${entry.day}`.includes(q) || `day-${entry.day}`.includes(q)
          const matchesBullets = entry.bulletPoints?.some(b => b.toLowerCase().includes(q))
          const matchesTags = entry.tags?.some(t => t.toLowerCase().includes(q))
          return matchesTitle || matchesSummary || matchesDay || matchesBullets || matchesTags
        }
        return true
      })
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.day - b.day : b.day - a.day
      })
  }, [entries, selectedTag, searchQuery, sortOrder])

  // Extract all media items for the Media Gallery view
  const allMediaItems = useMemo(() => {
    const items: Array<{ media: MediaItem; day: number; title: string }> = []
    filteredEntries.forEach(entry => {
      entry.media?.forEach(m => {
        items.push({ media: m, day: entry.day, title: entry.title })
      })
    })
    return items
  }, [filteredEntries])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Controls Bar: Tag filters, View toggle, Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/[0.08]">
        {/* Tag Pills (Aero Glass pills) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onSelectTag(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedTag === null
                ? 'bg-gradient-to-b from-white to-zinc-200 text-black font-bold shadow-[0_2px_12px_rgba(255,255,255,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]'
                : 'aero-glass-pill text-zinc-300 hover:text-white'
            }`}
          >
            All Logs ({entries.length})
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-gradient-to-b from-emerald-300 to-teal-400 text-black font-bold shadow-[0_2px_12px_rgba(52,211,153,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]'
                  : 'aero-glass-pill text-zinc-300 hover:text-white'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* View mode & Chronological Sort toggle */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-zinc-200 hover:text-white aero-glass-pill rounded-full transition-all font-medium cursor-pointer"
            title="Toggle sort order"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>{sortOrder === 'asc' ? 'Day 1 → 11' : 'Latest First'}</span>
          </button>

          <div className="flex items-center aero-glass-pill rounded-full p-0.5">
            <button
              onClick={() => setViewMode('feed')}
              className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                viewMode === 'feed' ? 'bg-white text-black font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              title="Full Diary Feed"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                viewMode === 'gallery' ? 'bg-white text-black font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              title="Media Gallery View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-20 px-4 aero-glass-card rounded-3xl">
          <SearchX className="w-10 h-10 mx-auto text-zinc-500 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No logs match your search</h3>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto mb-6">
            Try clearing your search query or tag filter to view all 11 days.
          </p>
          {(searchQuery || selectedTag) && (
            <button
              onClick={() => {
                onSelectTag(null)
              }}
              className="px-5 py-2 text-xs font-semibold bg-white text-black rounded-full transition-all hover:bg-zinc-200 cursor-pointer shadow-md"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : viewMode === 'feed' ? (
        /* Feed View */
        <div className="space-y-7">
          {filteredEntries.map(entry => (
            <DevlogCard
              key={entry.id}
              entry={entry}
              onOpenModal={onOpenModal}
              onTagClick={(tag) => onSelectTag(tag)}
            />
          ))}
        </div>
      ) : (
        /* Immersive Media Gallery View */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {allMediaItems.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-2xl overflow-hidden bg-black/60 border border-white/[0.12] cursor-pointer group shadow-lg transition-all hover:scale-[1.02]"
              onClick={() => onOpenModal(item.media)}
            >
              {item.media.type === 'video' ? (
                <div className="relative w-full h-full">
                  <video
                    src={item.media.url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="p-2 rounded-full bg-black/70 text-white backdrop-blur-md">
                      <Film className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.media.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-[11px] font-mono text-zinc-200 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-semibold">DAY {item.day}</span>
                {item.media.type === 'video' ? <Film className="w-3.5 h-3.5 text-emerald-400" /> : <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
