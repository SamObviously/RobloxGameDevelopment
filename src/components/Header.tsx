import React from 'react'
import { BookOpen, Plus, HelpCircle, Flame, Search } from 'lucide-react'
import type { GameProfile } from '../types/devlog'

interface HeaderProps {
  gameProfile: GameProfile
  totalDays: number
  totalEntries: number
  searchQuery: string
  onSearchChange: (q: string) => void
  onOpenNewEntry: () => void
  onOpenGuide: () => void
  onEditProfile: () => void
}

export const Header: React.FC<HeaderProps> = ({
  gameProfile,
  totalDays,
  totalEntries,
  searchQuery,
  onSearchChange,
  onOpenNewEntry,
  onOpenGuide,
  onEditProfile
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Game Title / Dev Diary badge */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onEditProfile}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            title="Click to edit game title & info"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors text-base md:text-lg tracking-tight">
                  {gameProfile.title}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Dev Diary
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Day {totalDays}</span>
                <span className="text-zinc-600">•</span>
                <span>{totalEntries} {totalEntries === 1 ? 'diary entry' : 'diary entries'}</span>
              </p>
            </div>
          </button>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-xs relative hidden md:block">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search diary entries, topics, pictures..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors cursor-pointer"
            title="How this diary works"
          >
            <HelpCircle className="w-4 h-4 text-zinc-400" />
            <span className="hidden sm:inline">How to Post</span>
          </button>

          <button
            onClick={onOpenNewEntry}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-xl shadow-lg shadow-emerald-500/10 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Write Diary Entry</span>
          </button>
        </div>
      </div>
    </header>
  )
}
