import React from 'react'
import { Sparkles, Calendar, Film, Edit3, ShieldCheck, Heart } from 'lucide-react'
import type { GameProfile } from '../types/devlog'

interface HeroProps {
  gameProfile: GameProfile
  totalDays: number
  totalMediaCount: number
  onEditProfile: () => void
  onOpenNewEntry: () => void
}

export const Hero: React.FC<HeroProps> = ({
  gameProfile,
  totalDays,
  totalMediaCount,
  onEditProfile,
  onOpenNewEntry
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900/80 via-zinc-950/60 to-zinc-950 border-b border-zinc-800/80 pt-10 pb-12 px-4">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{gameProfile.status}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Public Game Dev Diary
          </span>
        </div>

        {/* Headline */}
        <div className="flex items-center justify-center gap-2 group mb-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
            {gameProfile.title}
          </h1>
          <button
            onClick={onEditProfile}
            className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/70 rounded-lg transition-colors cursor-pointer"
            title="Edit Game Title & Info"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Subtext */}
        <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mb-6">
          {gameProfile.tagline}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs font-mono text-zinc-400">
          <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Genre: <strong className="text-zinc-200">{gameProfile.genre}</strong></span>
          </span>
          <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Written by: <strong className="text-zinc-200">{gameProfile.devName}</strong></span>
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
          <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-sm">
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {totalDays}
            </div>
            <div className="text-xs text-zinc-400 flex items-center justify-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3 text-zinc-500" />
              <span>Days Documented</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-sm">
            <div className="text-2xl font-bold font-mono text-zinc-100">
              {totalMediaCount}
            </div>
            <div className="text-xs text-zinc-400 flex items-center justify-center gap-1 mt-0.5">
              <Film className="w-3 h-3 text-zinc-500" />
              <span>Pictures & Clips</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-sm flex flex-col justify-center">
            <button
              onClick={onOpenNewEntry}
              className="w-full py-1.5 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold font-mono transition-colors cursor-pointer"
            >
              + Write Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
