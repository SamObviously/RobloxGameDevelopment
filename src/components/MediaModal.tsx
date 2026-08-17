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
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
              {media.type}
            </span>
            <p className="text-sm font-medium text-zinc-300 truncate max-w-md">
              {media.caption || "Footage preview"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {media.type !== 'youtube' && (
              <a
                href={media.url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors"
                title="Open raw file"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 bg-black flex items-center justify-center overflow-auto p-2">
          {media.type === 'video' ? (
            <video
              src={media.url}
              controls
              autoPlay
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
          ) : media.type === 'youtube' ? (
            <div className="w-full aspect-video">
              <iframe
                src={media.url.replace('watch?v=', 'embed/')}
                title="YouTube clip"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={media.url}
              alt={media.caption || "Screenshot"}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
          )}
        </div>

        {/* Caption */}
        {media.caption && (
          <div className="p-3 bg-zinc-900/70 border-t border-zinc-800 text-xs text-zinc-400">
            {media.caption}
          </div>
        )}
      </div>
    </div>
  )
}
