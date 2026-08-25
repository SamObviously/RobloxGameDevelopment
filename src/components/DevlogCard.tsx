import React, { useState } from 'react'
import { CheckCircle2, Share2, Check, Calendar, Maximize2 } from 'lucide-react'
import type { DevlogEntry, MediaItem } from '../types/devlog'
import { VideoPlayer } from './VideoPlayer'

interface DevlogCardProps {
  entry: DevlogEntry
  onOpenModal: (media: MediaItem) => void
  onTagClick?: (tag: string) => void
}

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

export const DevlogCard: React.FC<DevlogCardProps> = ({ entry, onOpenModal, onTagClick }) => {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const url = new URL(window.location.href)
    url.hash = `day-${entry.day}`
    navigator.clipboard.writeText(url.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format text to highlight hashtags in blue like X.com
  const renderFormattedText = (text: string) => {
    const paragraphs = text.split('\n\n')
    return paragraphs.map((paragraph, pIdx) => {
      const parts = paragraph.split(/(#[a-zA-Z0-9_]+)/g)
      return (
        <p key={pIdx} className="text-zinc-200 text-sm sm:text-[15px] leading-relaxed mb-3 last:mb-0">
          {parts.map((part, i) => {
            if (part.startsWith('#')) {
              const tagText = part.slice(1)
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onTagClick && onTagClick(tagText)}
                  className="text-sky-400 hover:text-sky-300 font-medium hover:underline cursor-pointer inline"
                >
                  {part}
                </button>
              )
            }
            return <span key={i}>{part}</span>
          })}
        </p>
      )
    })
  }

  const renderMediaGrid = () => {
    if (!entry.media || entry.media.length === 0) return null

    const hasVideo = entry.media.some(m => m.type === 'video' || m.type === 'youtube')

    if (hasVideo) {
      return (
        <div className="space-y-3.5 my-4">
          {entry.media.map(item => (
            <div key={item.id}>
              <VideoPlayer media={item} onOpenModal={onOpenModal} />
            </div>
          ))}
        </div>
      )
    }

    const count = entry.media.length

    if (count === 1) {
      const item = entry.media[0]
      return (
        <div 
          className="relative my-4 rounded-2xl overflow-hidden bg-black/60 border border-white/[0.12] cursor-pointer group shadow-xl transition-all"
          onClick={() => onOpenModal(item)}
        >
          <img
            src={item.url}
            alt={item.caption || entry.title}
            className="w-full max-h-[500px] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute top-3 right-3 p-2 rounded-full aero-glass-pill text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
          {item.caption && (
            <div className="p-3 bg-black/80 backdrop-blur-md text-xs text-zinc-300 border-t border-white/[0.08]">
              {item.caption}
            </div>
          )}
        </div>
      )
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {entry.media.map(item => (
            <div 
              key={item.id}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/[0.12] cursor-pointer group shadow-lg transition-all"
              onClick={() => onOpenModal(item)}
            >
              <img
                src={item.url}
                alt={item.caption || entry.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 p-1.5 rounded-full aero-glass-pill text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          {entry.media.map(item => (
            <div 
              key={item.id}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/[0.12] cursor-pointer group shadow-lg transition-all"
              onClick={() => onOpenModal(item)}
            >
              <img
                src={item.url}
                alt={item.caption || entry.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 p-1.5 rounded-full aero-glass-pill text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    // 4 items (2x2 grid)
    return (
      <div className="grid grid-cols-2 gap-3 my-4">
        {entry.media.slice(0, 4).map(item => (
          <div 
            key={item.id}
            className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/[0.12] cursor-pointer group shadow-lg transition-all"
            onClick={() => onOpenModal(item)}
          >
            <img
              src={item.url}
              alt={item.caption || entry.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 p-1.5 rounded-full aero-glass-pill text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <article 
      id={`day-${entry.day}`}
      className="relative aero-glass-card rounded-3xl p-6 sm:p-8 transition-all duration-300"
    >
      {/* Top Header: Author info, Verified badge, Date, and Day badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-400 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center font-bold text-xs text-white">
              SD
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                SamObviously
              </span>
              <VerifiedBadge />
              <span className="text-zinc-400 text-xs hidden sm:inline">@erdongsam</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <Calendar className="w-3 h-3 text-emerald-400" />
              <span>{entry.date}</span>
            </div>
          </div>
        </div>

        {/* Day Badge & Share */}
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full font-mono font-bold text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            DAY {String(entry.day).padStart(2, '0')}
          </span>

          <button
            onClick={handleShare}
            className="p-2 text-zinc-300 hover:text-white aero-glass-pill rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Copy link to this day"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Title */}
      <h2 className="text-lg sm:text-xl font-extrabold text-white mb-3.5 tracking-tight">
        {entry.title}
      </h2>

      {/* Formatted Post Text */}
      <div className="mb-4 font-normal">
        {renderFormattedText(entry.summary)}
      </div>

      {/* Media Showcase Grid */}
      {renderMediaGrid()}

      {/* Aero Glass Key Accomplishments Specs Card */}
      {entry.bulletPoints && entry.bulletPoints.length > 0 && (
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-3 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Key Deliverables & Updates
          </h4>
          <ul className="space-y-2">
            {entry.bulletPoints.map((point, index) => (
              <li key={index} className="text-xs sm:text-sm text-zinc-200 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_6px_#34d399]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags Footer */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-3.5 border-t border-white/[0.08]">
          {entry.tags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick && onTagClick(tag)}
              className="px-3 py-1 rounded-full text-xs font-mono aero-glass-pill text-zinc-300 hover:text-emerald-300 transition-all cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}
