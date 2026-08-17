import React, { useState, useMemo } from 'react'
import { ArrowUpDown, LayoutList, CalendarDays, SearchX, Plus } from 'lucide-react'
import type { DevlogEntry, MediaItem } from '../types/devlog'
import { DevlogCard } from './DevlogCard'

interface DevlogFeedProps {
  entries: DevlogEntry[]
  searchQuery: string
  selectedTag: string | null
  onSelectTag: (tag: string | null) => void
  onOpenModal: (media: MediaItem) => void
  onOpenNewEntry: () => void
}

export const DevlogFeed: React.FC<DevlogFeedProps> = ({
  entries,
  searchQuery,
  selectedTag,
  onSelectTag,
  onOpenModal,
  onOpenNewEntry
}) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('asc')
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards')

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
        // Tag filter
        if (selectedTag && !entry.tags?.includes(selectedTag)) {
          return false
        }
        // Search query filter
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
        return sortOrder === 'desc' ? b.day - a.day : a.day - b.day
      })
  }, [entries, selectedTag, searchQuery, sortOrder])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Controls Bar: Tag filters, View toggle, Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800/80">
        {/* Tag Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onSelectTag(null)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              selectedTag === null
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            All Logs ({entries.length})
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* View & Sort options */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg transition-colors font-mono cursor-pointer"
            title="Toggle sort order"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>

          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1 rounded-md text-xs transition-colors cursor-pointer ${
                viewMode === 'cards' ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Full cards view"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1 rounded-md text-xs transition-colors cursor-pointer ${
                viewMode === 'compact' ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Compact timeline view"
            >
              <CalendarDays className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Feed content */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
          <SearchX className="w-10 h-10 mx-auto text-zinc-600 mb-3" />
          <h3 className="text-lg font-bold text-zinc-200 mb-1">No devlogs found</h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-6">
            {searchQuery || selectedTag 
              ? "Try clearing your search query or tag filters to see all updates." 
              : "No logs have been added yet. Add your first day's update now!"}
          </p>
          <div className="flex items-center justify-center gap-3">
            {(searchQuery || selectedTag) && (
              <button
                onClick={() => {
                  onSelectTag(null)
                }}
                className="px-4 py-2 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={onOpenNewEntry}
              className="px-4 py-2 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-zinc-950 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Add Today's Update</span>
            </button>
          </div>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="space-y-6">
          {filteredEntries.map(entry => (
            <DevlogCard
              key={entry.id || entry.day}
              entry={entry}
              onOpenModal={onOpenModal}
              onTagClick={(tag) => onSelectTag(tag)}
            />
          ))}
        </div>
      ) : (
        /* Compact Timeline View */
        <div className="relative border-l border-zinc-800 ml-4 space-y-6">
          {filteredEntries.map(entry => (
            <div key={entry.id || entry.day} className="relative pl-6 group">
              <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-zinc-900 border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors" />
              <div className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 rounded-xl p-4 transition-all">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    DAY {String(entry.day).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{entry.date}</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-1">
                  {entry.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-2">
                  {entry.summary}
                </p>
                {entry.tags && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
