import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const devlogsPath = path.resolve(__dirname, '../src/data/devlogs.ts')
const devlogsContent = fs.readFileSync(devlogsPath, 'utf-8')

// Find highest day number
const dayMatches = [...devlogsContent.matchAll(/day:\s*(\d+)/g)].map(m => parseInt(m[1]))
const nextDay = (dayMatches.length > 0 ? Math.max(...dayMatches) : 0) + 1
const today = new Date().toISOString().split('T')[0]

console.log(`\n🎮 Creating template for Day ${nextDay} (${today})...\n`)

const template = `  {
    id: "day-${nextDay}",
    day: ${nextDay},
    date: "${today}",
    title: "Day ${nextDay}: [Title of today's progress]",
    summary: "[Brief overview of what the game did / what you worked on today]",
    bulletPoints: [
      "[Specific change or mechanic added]",
      "[Another bugfix or improvement]"
    ],
    tags: ["Mechanics", "Progress"],
    media: [
      {
        id: "m${nextDay}-1",
        type: "video",
        url: "footage/day-${nextDay}.mp4",
        caption: "Day ${nextDay} gameplay footage"
      }
    ]
  },`

// Insert template after `export const initialDevlogs: DevlogEntry[] = [`
const updatedContent = devlogsContent.replace(
  /export const initialDevlogs: DevlogEntry\[\] = \[\r?\n/,
  `export const initialDevlogs: DevlogEntry[] = [\n${template}\n`
)

fs.writeFileSync(devlogsPath, updatedContent, 'utf-8')

console.log(`✅ Added Day ${nextDay} entry to src/data/devlogs.ts!`)
console.log(`📹 Place your footage in: public/footage/day-${nextDay}.mp4`)
console.log(`✍️  Edit src/data/devlogs.ts to fill in your notes.\n`)
