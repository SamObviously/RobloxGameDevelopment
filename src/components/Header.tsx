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

const XIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

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
          {gameProfile.links?.twitter && (
            <a
              href={gameProfile.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
              title="Follow @erdongsam on X"
            >
              <XIcon className="w-4 h-4" />
            </a>
          )}

          {gameProfile.links?.github && (
            <a
              href={gameProfile.links.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

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
