import type { DevlogEntry } from '../types/devlog'

/**
 * DAILY DEVLOGS LIST
 * 
 * To add a new day's update:
 * 1. Add an entry to the top of this array (or use the "+ Add Day's Update" button on the webpage to generate it).
 * 2. Put any footage video/image files into the `public/footage/` folder (e.g., `public/footage/day-1.mp4`),
 *    or paste a YouTube / external video URL.
 * 3. Commit and push to GitHub — GitHub Pages will automatically deploy your latest log!
 */
export const initialDevlogs: DevlogEntry[] = [
  {
    id: "day-1",
    day: 1,
    date: new Date().toISOString().split('T')[0],
    title: "Day 1: Project Setup & Core Mechanics",
    summary: "Started working on the game! Set up the initial repository, configured the engine, and began implementing the core character controller and physics.",
    bulletPoints: [
      "Initialized the game project and scene hierarchy",
      "Created first playable character controller with basic input handling",
      "Configured gravity, ground detection, and movement friction"
    ],
    tags: ["Setup", "Movement", "Core Mechanics"],
    media: [
      // Example of linking a local video file (place file in public/footage/):
      // { id: "m1", type: "video", url: "footage/day-1.mp4", caption: "First movement test" }
      // Or YouTube:
      // { id: "m2", type: "youtube", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Gameplay clip" }
    ]
  }
]
