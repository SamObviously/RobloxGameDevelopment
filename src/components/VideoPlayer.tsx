import React, { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react'
import type { MediaItem } from '../types/devlog'

interface VideoPlayerProps {
  media: MediaItem
  onOpenModal?: (media: MediaItem) => void
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ media, onOpenModal }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // YouTube embed helper
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const id = new URL(url).searchParams.get('v')
        return `https://www.youtube-nocookie.com/embed/${id}`
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0]
        return `https://www.youtube-nocookie.com/embed/${id}`
      }
      if (url.includes('youtube.com/embed/')) {
        return url
      }
    } catch {
      return url
    }
    return url
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          setIsPlaying(false)
        })
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  if (media.type === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl(media.url)
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg">
        <iframe
          src={embedUrl}
          title={media.caption || "Devlog Video"}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {media.caption && (
          <div className="p-2.5 bg-zinc-900/90 text-xs text-zinc-400 border-t border-zinc-800">
            {media.caption}
          </div>
        )}
      </div>
    )
  }

  if (media.type === 'image') {
    return (
      <div 
        className="relative group rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer"
        onClick={() => onOpenModal && onOpenModal(media)}
      >
        <img
          src={media.url}
          alt={media.caption || "Gameplay screenshot"}
          className="w-full max-h-[500px] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          onError={() => setHasError(true)}
        />
        {hasError && (
          <div className="p-8 text-center bg-zinc-900 text-zinc-400">
            <Film className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Image not found: <code className="text-xs text-zinc-300">{media.url}</code></p>
            <p className="text-xs text-zinc-500 mt-1">Place file in <code className="text-zinc-400">public/footage/</code></p>
          </div>
        )}
        {media.caption && (
          <div className="p-2.5 bg-zinc-900/90 text-xs text-zinc-400 border-t border-zinc-800">
            {media.caption}
          </div>
        )}
      </div>
    )
  }

  // Local Video Player
  return (
    <div className="relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl group">
      <div className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={media.url}
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setHasError(true)}
        />

        {hasError ? (
          <div className="p-8 text-center text-zinc-400">
            <Film className="w-10 h-10 mx-auto mb-2 text-zinc-500" />
            <p className="text-sm font-medium text-zinc-300">Footage File Missing</p>
            <p className="text-xs text-zinc-500 mt-1">File path: <code className="text-emerald-400 bg-zinc-950 px-1 py-0.5 rounded">{media.url}</code></p>
            <p className="text-xs text-zinc-400 mt-2">Place your MP4/WebM video in <code className="text-zinc-300 font-mono">public/{media.url}</code></p>
          </div>
        ) : (
          <>
            {/* Play Overlay button when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                <div className="w-16 h-16 rounded-full bg-emerald-500/90 text-zinc-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 transform transition-transform group-hover:scale-110">
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {onOpenModal && (
                <button
                  type="button"
                  onClick={() => onOpenModal(media)}
                  className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 transition-colors"
                  title="Expand"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {media.caption && (
        <div className="p-2.5 bg-zinc-900/90 text-xs text-zinc-400 border-t border-zinc-800/80 flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-emerald-400" />
          <span>{media.caption}</span>
        </div>
      )}
    </div>
  )
}
