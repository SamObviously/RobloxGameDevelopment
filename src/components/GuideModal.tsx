import React from 'react'
import { X, Globe, Terminal, UploadCloud, CheckCircle, ShieldCheck, Image as ImageIcon } from 'lucide-react'

interface GuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-zinc-100">How to Post Pictures & Diary Updates</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-sm text-zinc-300 leading-relaxed">
          {/* Reassurance */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-200 block mb-1">Your Game Code Stays 100% Private</strong>
              This website is only a public dev journal. You do not need to upload your game project or source code here. You only share your screenshots, footage, and diary thoughts!
            </div>
          </div>

          {/* Step 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                Drop Your Pictures / Video Clips
              </h3>
              <p className="text-xs text-zinc-400">
                Save your game screenshots (`.png`, `.jpg`, `.gif`) or video clips (`.mp4`) into the <code className="text-emerald-300 bg-zinc-900 px-1.5 py-0.5 rounded">public/footage/</code> folder.
              </p>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 font-mono text-xs text-zinc-300">
                Example: <span className="text-emerald-400">public/footage/day-1.png</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Write Today's Diary Entry
              </h3>
              <p className="text-xs text-zinc-400">
                Click <strong className="text-zinc-200">+ Write Diary Entry</strong> on the website to type what you worked on, or edit <code className="text-emerald-300 bg-zinc-900 px-1.5 py-0.5 rounded">src/data/devlogs.ts</code> directly in your editor.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Push to GitHub
              </h3>
              <p className="text-xs text-zinc-400">
                Commit your diary update and push to GitHub:
              </p>
              <pre className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-300 overflow-x-auto">
{`git add .
git commit -m "Day 2: Added level art & lighting screenshot"
git push origin main`}
              </pre>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
              4
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                Public Access on GitHub Pages
              </h3>
              <p className="text-xs text-zinc-400">
                Under repository <strong>Settings</strong> &gt; <strong>Pages</strong>, select <strong>GitHub Actions</strong>. Your public diary is live for everyone to follow at:
              </p>
              <p className="text-xs font-mono text-emerald-400">
                https://yourusername.github.io/your-repo
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900/40 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
