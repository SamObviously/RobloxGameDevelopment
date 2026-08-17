import type { DevlogEntry } from '../types/devlog'

/**
 * DAILY DEVLOGS LIST
 * 
 * Real updates from @erdongsam on X documenting Roblox Survival Game Development!
 */
export const initialDevlogs: DevlogEntry[] = [
  {
    id: "day-3",
    day: 3,
    date: "2026-08-17",
    title: "Day 3: Deep Cold Ocean Biome & Underground Cave System",
    summary: "Expanding the map today! 🌊❄️\n\nI just finished implementing two brand-new biomes: the Deep Cold Ocean (complete with brand new mobs) and an underground Cave system.",
    bulletPoints: [
      "Implemented Deep Cold Ocean biome with custom underwater atmosphere and fog",
      "Added brand new aquatic & cold-ocean mobs",
      "Constructed subterranean underground Cave system for subterranean exploration"
    ],
    tags: ["RobloxDev", "Biomes", "CaveSystem", "OceanBiome", "Mobs"],
    media: [
      {
        id: "d3-m1",
        type: "image",
        url: "footage/day-3-deep-cold-ocean-biome.jpg",
        caption: "Deep Cold Ocean Biome with new mobs"
      },
      {
        id: "d3-m2",
        type: "image",
        url: "footage/day-3-underground-cave-system.jpg",
        caption: "Underground Cave System exploration"
      }
    ]
  },
  {
    id: "day-2",
    day: 2,
    date: "2026-08-16",
    title: "Day 2: Resource Gathering, Axes & Spades Crafting Tiers",
    summary: "Today was all about the resource grind! 🌲⚒️\n\nI just fully implemented Axes and Spades! Players will progress through 4 different crafting tiers for each weapon: Stone, Copper, Iron, and Titanium (currently working on Stone tier).",
    bulletPoints: [
      "Implemented tree chopping and wood harvesting mechanics with Axes",
      "Implemented terrain digging and resource gathering with Spades",
      "Configured 4-tier crafting progression system (Stone, Copper, Iron, Titanium)",
      "Added tool hit feedback, swinging animations, and particle effects"
    ],
    tags: ["RobloxDev", "ResourceGrind", "Crafting", "Tools", "Axes", "Spades"],
    media: [
      {
        id: "d2-m1",
        type: "video",
        url: "footage/day-2-axes-spades-harvesting.mp4",
        caption: "Tree chopping & Axe harvesting gameplay footage"
      },
      {
        id: "d2-m2",
        type: "video",
        url: "footage/day-2-resource-tier-progression.mp4",
        caption: "Spade digging & resource collection gameplay clip"
      }
    ]
  },
  {
    id: "day-1",
    day: 1,
    date: "2026-08-15",
    title: "Day 1: Project Announcement & Core Survival Systems",
    summary: "Day 1 of documenting my Roblox survival game! 🎮\n\nI'm already a few weeks into development, and I have completed the GUI, animals/mobs, crafting mechanics, shovel, hotbar, and tools.",
    bulletPoints: [
      "Designed custom survival GUI, health/hunger gauges, and HUD",
      "Implemented inventory hotbar with quick-select tool slots",
      "Added wild animals with roaming and detection mechanics",
      "Created recipe-based Crafting system and tool interactions"
    ],
    tags: ["RobloxDev", "ProjectLaunch", "GUI", "Hotbar", "Animals", "SurvivalGame"],
    media: [
      {
        id: "d1-m1",
        type: "image",
        url: "footage/day-1-gui-crafting.jpg",
        caption: "Custom Survival GUI & Crafting Menu"
      },
      {
        id: "d1-m2",
        type: "image",
        url: "footage/day-1-hotbar-tools.jpg",
        caption: "Hotbar & Tool selection interface"
      },
      {
        id: "d1-m3",
        type: "image",
        url: "footage/day-1-animals-world.jpg",
        caption: "World terrain & animal mob test"
      },
      {
        id: "d1-m4",
        type: "image",
        url: "footage/day-1-gameplay-preview.jpg",
        caption: "Gameplay perspective and HUD layout"
      }
    ]
  }
]
