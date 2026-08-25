import React from 'react'
import { Search, Flame } from 'lucide-react'
import type { GameProfile } from '../types/devlog'

interface HeaderProps {
  gameProfile: GameProfile
  totalDays: number
  searchQuery: string
  onSearchChange: (q: string) => void
}

const XIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const VerifiedBadge = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6s-2.95.875-3.6 2.148c-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5s.875 2.95 2.148 3.6c-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148s2.95-.875 3.6-2.148c.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6z"
      fill="#1D9BF0"
    />
    <path
      d="M9.8 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.9-5.9 1.4 1.4-7.3 7.3z"
      fill="#FFFFFF"
    />
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
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-50 aero-glass border-b border-white/[0.12] transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Branding & Creator Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-zinc-900 border border-emerald-500/30 flex items-center justify-center text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] shrink-0">
            <span className="font-bold font-mono text-sm tracking-tight text-emerald-300">SD</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm md:text-base tracking-tight">
                SamObviously
              </span>
              <VerifiedBadge />
            </div>
            <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
              <span>@erdongsam</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                Day {totalDays}
              </span>
            </p>
          </div>
        </div>

        {/* Center: Search input (Aero Glass search pill) */}
        <div className="flex-1 max-w-sm relative hidden sm:block">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search diary (e.g. biomes, tools, weather)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2 aero-glass-pill rounded-full text-xs text-white placeholder-zinc-400 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right: X Follow Pill & GitHub Link */}
        <div className="flex items-center gap-2.5">
          {gameProfile.links?.twitter && (
            <a
              href={gameProfile.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-white to-zinc-200 text-black hover:from-zinc-100 hover:to-zinc-300 rounded-full text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] active:scale-95 cursor-pointer"
            >
              <XIcon className="w-3.5 h-3.5" />
              <span>Follow @erdongsam</span>
            </a>
          )}

          {gameProfile.links?.github && (
            <a
              href={gameProfile.links.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 text-zinc-300 hover:text-white aero-glass-pill rounded-full transition-all"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
