import React, { useState } from 'react'
import { X, Plus, Trash2, Copy, Check, Save, Download, Image as ImageIcon, BookOpen, ShieldCheck } from 'lucide-react'
import type { DevlogEntry, MediaItem, MediaType } from '../types/devlog'
import confetti from 'canvas-confetti'

interface NewEntryModalProps {
  isOpen: boolean
  onClose: () => void
  nextDayNumber: number
  onSaveEntry: (entry: DevlogEntry) => void
  allEntries: DevlogEntry[]
}

export const NewEntryModal: React.FC<NewEntryModalProps> = ({
  isOpen,
  onClose,
  nextDayNumber,
  onSaveEntry,
  allEntries
}) => {
  const [day, setDay] = useState<number>(nextDayNumber)
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [title, setTitle] = useState<string>(`Day ${nextDayNumber}: `)
  const [summary, setSummary] = useState<string>('')
  const [bulletPoints, setBulletPoints] = useState<string[]>([''])
  const [tagInput, setTagInput] = useState<string>('GameDev, Visuals, Progress')
  
  // Media items (pictures, videos, GIFs)
  const [mediaList, setMediaList] = useState<Array<{ type: MediaType; url: string; caption: string }>>([
    { type: 'image', url: `footage/day-${nextDayNumber}.png`, caption: '' }
  ])

  const [copied, setCopied] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  if (!isOpen) return null

  const handleAddBullet = () => {
    setBulletPoints([...bulletPoints, ''])
  }

  const handleRemoveBullet = (index: number) => {
    setBulletPoints(bulletPoints.filter((_, i) => i !== index))
  }

  const handleBulletChange = (index: number, val: string) => {
    const updated = [...bulletPoints]
    updated[index] = val
    setBulletPoints(updated)
  }

  const handleAddMedia = () => {
    setMediaList([...mediaList, { type: 'image', url: '', caption: '' }])
  }

  const handleRemoveMedia = (index: number) => {
    setMediaList(mediaList.filter((_, i) => i !== index))
  }

  const handleMediaChange = (index: number, field: 'type' | 'url' | 'caption', val: any) => {
    const updated = [...mediaList]
    updated[index] = { ...updated[index], [field]: val }
    setMediaList(updated)
  }

  // Handle local image or video selection for instant live preview
  const handleFileSelect = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const isVideo = file.type.startsWith('video')
      const isImg = file.type.startsWith('image')
      const url = URL.createObjectURL(file)
      
      const updated = [...mediaList]
      updated[index] = {
        type: isVideo ? 'video' : isImg ? 'image' : 'image',
        url: url,
        caption: updated[index].caption || file.name
      }
      setMediaList(updated)
    }
  }

  const buildEntryObject = (): DevlogEntry => {
    const tags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)

    const cleanedBullets = bulletPoints.filter(b => b.trim().length > 0)

    const cleanedMedia: MediaItem[] = mediaList
      .filter(m => m.url.trim().length > 0)
      .map((m, idx) => ({
        id: `media-${Date.now()}-${idx}`,
        type: m.type,
        url: m.url.trim(),
        caption: m.caption.trim() || undefined
      }))

    return {
      id: `day-${day}`,
      day: Number(day),
      date: date,
      title: title.trim() || `Day ${day} Progress`,
      summary: summary.trim(),
      bulletPoints: cleanedBullets.length > 0 ? cleanedBullets : undefined,
      media: cleanedMedia.length > 0 ? cleanedMedia : undefined,
      tags: tags
    }
  }

  const handleSaveToSite = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry = buildEntryObject()
    onSaveEntry(newEntry)
    setSavedSuccess(true)
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } })
    } catch {}
    setTimeout(() => {
      onClose()
      setSavedSuccess(false)
    }, 1000)
  }

  const handleCopyCode = () => {
    const newEntry = buildEntryObject()
    const codeSnippet = JSON.stringify(newEntry, null, 2)
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleDownloadFullData = () => {
    const newEntry = buildEntryObject()
    const updatedEntries = [newEntry, ...allEntries.filter(e => e.day !== newEntry.day)]
    const fileContent = `import type { DevlogEntry } from '../types/devlog'\n\nexport const initialDevlogs: DevlogEntry[] = ${JSON.stringify(updatedEntries, null, 2)}\n`
    
    const blob = new Blob([fileContent], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'devlogs.ts'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="relative max-w-2xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold font-mono text-sm shadow-inner">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100">Write Today's Diary Entry</h2>
              <p className="text-xs text-zinc-400">Share what you worked on, attach pictures and gameplay clips</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSaveToSite} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Reassurance Banner */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-300">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>This is your public diary. Your private game source code is never needed or uploaded!</span>
          </div>

          {/* Day & Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Day #</label>
              <input
                type="number"
                min="1"
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-mono text-emerald-400 focus:border-emerald-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-mono text-zinc-200 focus:border-emerald-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Entry Title</label>
            <input
              type="text"
              placeholder="e.g. Added my first animated character and world lighting!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 outline-none"
              required
            />
          </div>

          {/* Journal Text */}
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              Diary Text / Thoughts (What did you work on? How did it go?)
            </label>
            <textarea
              rows={5}
              placeholder="Write freely like a personal diary... Today I drew the player sprite, tested how the jump feels, ran into a funny physics bug, and added glowing lanterns to the level."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:border-emerald-500 outline-none resize-none leading-relaxed"
              required
            />
          </div>

          {/* Pictures & Video Footage */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                Pictures, Screenshots & Video Clips
              </label>
              <button
                type="button"
                onClick={handleAddMedia}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add picture / clip
              </button>
            </div>

            {mediaList.map((m, idx) => (
              <div key={idx} className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2.5">
                <div className="flex items-center gap-2">
                  <select
                    value={m.type}
                    onChange={(e) => handleMediaChange(idx, 'type', e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 px-2.5 py-1.5 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="image">📸 Screenshot / Picture</option>
                    <option value="video">🎥 Video Clip (MP4/WebM)</option>
                    <option value="youtube">▶️ YouTube URL</option>
                  </select>

                  <input
                    type="text"
                    placeholder={
                      m.type === 'youtube'
                        ? 'https://youtube.com/watch?v=...'
                        : m.type === 'video'
                        ? `footage/day-${day}.mp4`
                        : `footage/day-${day}.png`
                    }
                    value={m.url}
                    onChange={(e) => handleMediaChange(idx, 'url', e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 font-mono outline-none"
                  />

                  {mediaList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(idx)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Caption / Picture description (e.g. 'Early sketch of the cave level')"
                    value={m.caption}
                    onChange={(e) => handleMediaChange(idx, 'caption', e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400 outline-none"
                  />
                  <label className="text-xs font-mono px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg cursor-pointer transition-colors shrink-0 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Browse Picture</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => handleFileSelect(idx, e)}
                    />
                  </label>
                </div>
              </div>
            ))}
            <p className="text-[11px] text-zinc-500 font-mono">
              💡 Tip: Put your images/clips into <code className="text-zinc-400">public/footage/</code> and specify <code className="text-emerald-400">footage/your-file.png</code>.
            </p>
          </div>

          {/* Bullet Points / Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-zinc-400">Quick list of changes today (Optional)</label>
              <button
                type="button"
                onClick={handleAddBullet}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add item
              </button>
            </div>
            <div className="space-y-2">
              {bulletPoints.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. Created tree sprites in Aseprite"
                    value={bullet}
                    onChange={(e) => handleBulletChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:border-emerald-500 outline-none"
                  />
                  {bulletPoints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(idx)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Topics / Tags (Comma separated)</label>
            <input
              type="text"
              placeholder="Art, Animation, LevelDesign, Story"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-2 text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy code for src/data/devlogs.ts"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Snippet!' : 'Copy Snippet'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadFullData}
                className="px-3 py-2 text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Download updated devlogs.ts file directly"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export devlogs.ts</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>{savedSuccess ? 'Published!' : 'Post to Diary'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
