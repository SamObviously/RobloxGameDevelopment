import React, { useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'
import type { MediaItem } from '../types/devlog'

interface MediaModalProps {
  media: MediaItem | null
  onClose: () => void
}

export const MediaModal: React.FC<MediaModalProps> = ({ media, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (media) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [media, onClose])

  if (!media) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 transition-all"
      onClick={onClose}
    >
      <div 
        className="relative max-w-6xl w-full bg-zinc-950/80 border border-white/[0.1] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar (Apple / X style header) */}
        <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-0.5 rounded-full text-xs font-mono bg-white/[0.08] text-white border border-white/[0.1] uppercase">
              {media.type}
            </span>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 truncate max-w-md">
              {media.caption || "Footage Preview"}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={media.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors"
              title="Open full resolution"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 bg-black flex items-center justify-center overflow-auto p-2 sm:p-4">
          {media.type === 'video' ? (
            <video
              src={media.url}
              controls
              autoPlay
              className="max-w-full max-h-[75vh] object-contain rounded-2xl"
            />
          ) : (
            <img
              src={media.url}
              alt={media.caption || "Screenshot"}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
          )}
        </div>

        {/* Bottom Caption */}
        {media.caption && (
          <div className="px-5 py-3 bg-black/60 border-t border-white/[0.06] text-xs text-zinc-400 text-center">
            {media.caption}
          </div>
        )}
      </div>
    </div>
  )
}
