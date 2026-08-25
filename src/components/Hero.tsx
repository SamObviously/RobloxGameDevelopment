import React from 'react'
import { Calendar, Film, Layers, ArrowDown, ArrowUp, Trees, Compass } from 'lucide-react'
import type { GameProfile } from '../types/devlog'

interface HeroProps {
  gameProfile: GameProfile
  totalDays: number
  totalMediaCount: number
  onJumpToFirst: () => void
  onJumpToLatest: () => void
}

const XIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const VerifiedBadge = ({ className = "w-4 h-4" }: { className?: string }) => (
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

export const Hero: React.FC<HeroProps> = ({
  gameProfile,
  totalDays,
  totalMediaCount,
  onJumpToFirst,
  onJumpToLatest
}) => {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 px-4">
      {/* Natural ambient forest canopy and deep ocean lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-emerald-500/15 via-teal-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[300px] h-[200px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Creator profile tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full aero-glass-pill text-xs font-mono mb-6 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-zinc-100 font-semibold">SamObviously</span>
          <VerifiedBadge />
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">@erdongsam</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
          Roblox Survival Game <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(52,211,153,0.2)]">
            Dev Diary
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-zinc-300/90 max-w-2xl mx-auto leading-relaxed mb-9">
          Documenting my Roblox survival game development progress day by day. Follow along with daily mechanics breakdowns, biomes, crafting trees, and in-game video footage.
        </p>

        {/* Natural & Apple-style badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs font-medium">
          <span className="px-4 py-1.5 rounded-full aero-glass-pill text-zinc-200 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            Roblox Studio & Luau
          </span>
          <span className="px-4 py-1.5 rounded-full aero-glass-pill text-zinc-200 flex items-center gap-1.5">
            <Trees className="w-3.5 h-3.5 text-teal-400" />
            Survival Sandbox RPG
          </span>
          <span className="px-4 py-1.5 rounded-full aero-glass-pill text-zinc-200">
            ⚡ Solo Developer
          </span>
        </div>

        {/* Aero Glass Stats Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto mb-9">
          <div className="p-4 sm:p-5 rounded-3xl aero-glass-card text-center transition-all hover:scale-[1.02]">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white drop-shadow-sm">
              {totalDays}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-300 font-medium flex items-center justify-center gap-1.5 mt-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Days Logged</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl aero-glass-card text-center transition-all hover:scale-[1.02]">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white drop-shadow-sm">
              {totalMediaCount}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-300 font-medium flex items-center justify-center gap-1.5 mt-1.5">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>Clips & Shots</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl aero-glass-card text-center transition-all hover:scale-[1.02]">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white drop-shadow-sm">
              4
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-300 font-medium flex items-center justify-center gap-1.5 mt-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Crafting Tiers</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onJumpToFirst}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full aero-glass-pill text-zinc-200 hover:text-white text-xs font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Start from Day 1</span>
          </button>

          <button
            onClick={onJumpToLatest}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full aero-glass-pill text-zinc-200 hover:text-white text-xs font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5 text-teal-400" />
            <span>Latest: Day {totalDays}</span>
          </button>

          {gameProfile.links?.twitter && (
            <a
              href={gameProfile.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-b from-white to-zinc-200 text-black font-bold text-xs shadow-[0_4px_16px_rgba(255,255,255,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <XIcon className="w-3 h-3" />
              <span>@erdongsam on X</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
