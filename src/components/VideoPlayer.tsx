import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, Film } from 'lucide-react'
import type { MediaItem } from '../types/devlog'

interface VideoPlayerProps {
  media: MediaItem
  onOpenModal?: (media: MediaItem) => void
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ media, onOpenModal }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black border border-white/[0.08] shadow-2xl group transition-all">
      <div 
        className="relative aspect-video w-full bg-zinc-950 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
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
            <p className="text-sm font-medium text-zinc-300">Video not found: {media.url}</p>
          </div>
        ) : (
          <>
            {/* Minimal Apple-style Play button overlay when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex items-center justify-center transition-all">
                <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Apple / X Bottom Controls Bar */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Scrubber */}
              <div 
                className="w-full h-1 bg-white/20 hover:h-2 rounded-full cursor-pointer transition-all relative overflow-hidden"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {onOpenModal && (
                  <button
                    type="button"
                    onClick={() => onOpenModal(media)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                    title="Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {media.caption && (
        <div className="p-3 bg-zinc-950/90 text-xs text-zinc-400 border-t border-white/[0.06] flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{media.caption}</span>
        </div>
      )}
    </div>
  )
}
