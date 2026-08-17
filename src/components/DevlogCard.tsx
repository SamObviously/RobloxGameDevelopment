import React, { useState } from 'react'
import { Calendar, Tag, CheckCircle2, Share2, Check, BookOpen } from 'lucide-react'
import type { DevlogEntry, MediaItem } from '../types/devlog'
import { VideoPlayer } from './VideoPlayer'

interface DevlogCardProps {
  entry: DevlogEntry
  onOpenModal: (media: MediaItem) => void
  onTagClick?: (tag: string) => void
}

export const DevlogCard: React.FC<DevlogCardProps> = ({ entry, onOpenModal, onTagClick }) => {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const url = new URL(window.location.href)
    url.hash = `day-${entry.day}`
    navigator.clipboard.writeText(url.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Split summary into multiple paragraphs if provided
  const paragraphs = entry.summary.split('\n\n').filter(p => p.trim().length > 0)

  return (
    <article 
      id={`day-${entry.day}`}
      className="relative bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-xl group"
    >
      {/* Top Header: Day Badge, Date, Share */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-xl font-mono font-bold text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            DAY {String(entry.day).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{entry.date}</span>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/60 hover:bg-zinc-800 rounded-lg border border-zinc-700/50 transition-colors cursor-pointer"
          title="Share link to this diary entry"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Main Title */}
      <h2 className="text-xl md:text-2xl font-extrabold text-zinc-100 mb-4 tracking-tight">
        {entry.title}
      </h2>

      {/* Pictures / Video Footage */}
      {entry.media && entry.media.length > 0 && (
        <div className="mb-6 space-y-4">
          {entry.media.map((item) => (
            <div key={item.id}>
              <VideoPlayer media={item} onOpenModal={onOpenModal} />
            </div>
          ))}
        </div>
      )}

      {/* Journal Entry Text (supports multi-paragraphs) */}
      <div className="text-zinc-300 text-sm md:text-base leading-relaxed space-y-3 mb-6 font-normal">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line text-zinc-300">
              {p}
            </p>
          ))
        ) : (
          <p className="whitespace-pre-line text-zinc-300">{entry.summary}</p>
        )}
      </div>

      {/* Bullet Points / Progress Checklist */}
      {entry.bulletPoints && entry.bulletPoints.length > 0 && (
        <div className="mb-6 p-4 md:p-5 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
          <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 mb-3 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Key updates & milestones today:
          </h4>
          <ul className="space-y-2">
            {entry.bulletPoints.map((point, index) => (
              <li key={index} className="text-sm text-zinc-300 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags Footer */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-zinc-800/60">
          <Tag className="w-3.5 h-3.5 text-zinc-500 mr-1" />
          {entry.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick && onTagClick(tag)}
              className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-emerald-300 border border-zinc-700/60 transition-colors cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}
