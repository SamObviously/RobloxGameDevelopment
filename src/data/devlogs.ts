import type { DevlogEntry } from '../types/devlog'

/**
 * DAILY DEVLOGS LIST
 * 
 * Documenting Roblox Survival Game Development by @erdongsam
 */
export const initialDevlogs: DevlogEntry[] = [
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
    id: "day-3",
    day: 3,
    date: "2026-08-17",
    title: "Day 3: Deep Cold Ocean Biome & Underground Cave System",
    summary: "Expanding the map today! 🌊❄️\n\nI just finished implementing two brand-new biomes: the Deep Cold Ocean (complete with brand new mobs) and an underground Cave system.",
    bulletPoints: [
      "Implemented Deep Cold Ocean biome with custom underwater atmosphere and fog",
      "Added brand new aquatic & cold-ocean mobs",
      "Constructed subterranean underground Cave system for exploration"
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
    id: "day-4",
    day: 4,
    date: "2026-08-18",
    title: "Day 4: Real-Time Temperature UI & Survival Status",
    summary: "Just added a new temperature UI that tracks your comfort in real-time! 🌡️🟡\n\nKeep an eye on the little yellow face—ignore it, and you'll either freeze to death or catch heat stroke.",
    bulletPoints: [
      "Built dynamic temperature meter UI reacting to environmental biomes",
      "Created visual status indicators (yellow face comfort expressions)",
      "Implemented hypothermia freezing and hyperthermia heat stroke mechanics"
    ],
    tags: ["RobloxDev", "TemperatureUI", "SurvivalMechanics", "HUD"],
    media: [
      {
        id: "d4-m1",
        type: "video",
        url: "footage/day-4-1.mp4",
        caption: "Temperature UI tracking and environmental reactions"
      },
      {
        id: "d4-m2",
        type: "video",
        url: "footage/day-4-2.mp4",
        caption: "Freezing & heat exposure status gameplay test"
      }
    ]
  },
  {
    id: "day-5",
    day: 5,
    date: "2026-08-19",
    title: "Day 5: Crafting System Backend & First Recipes Live",
    summary: "Crafting is officially live! 🛠️🚀\n\nI just finished coding the backend for the crafting system and hooked up the first set of recipes. You can now craft a Stone Hatchet, Pickaxe, and Shovel!",
    bulletPoints: [
      "Engineered backend crafting pipeline and recipe data structures",
      "Hooked up initial starter recipes (Stone Hatchet, Pickaxe, Shovel)",
      "Validated ingredient consumption and inventory item generation"
    ],
    tags: ["RobloxDev", "Crafting", "Recipes", "Tools", "IndieGame"],
    media: [
      {
        id: "d5-m1",
        type: "video",
        url: "footage/day-5-1.mp4",
        caption: "Crafting menu UI & recipe selection workflow"
      },
      {
        id: "d5-m2",
        type: "video",
        url: "footage/day-5-2.mp4",
        caption: "Crafting Stone Hatchet & Pickaxe in real-time"
      }
    ]
  },
  {
    id: "day-6",
    day: 6,
    date: "2026-08-20",
    title: "Day 6: Visual Remodel of Pickaxes, Hatchets & Spades",
    summary: "Taking a quick break from scripting today to focus on visuals! 🖌️🔨\n\nCompletely remodeled the pickaxes, hatchets, and spades to give them a much cleaner, more tactile survival aesthetic.",
    bulletPoints: [
      "Redesigned 3D model assets for all starter pickaxes",
      "Crafted detailed new hatchet & spade meshes",
      "Optimized tool scale and grip positioning in character hands"
    ],
    tags: ["RobloxDev", "3DModeling", "Visuals", "Tools", "IndieGame"],
    media: [
      {
        id: "d6-m1",
        type: "image",
        url: "footage/day-6-1.jpg",
        caption: "Remodeled survival tool meshes"
      },
      {
        id: "d6-m2",
        type: "image",
        url: "footage/day-6-2.jpg",
        caption: "Pickaxe & Hatchet 3D models showcase"
      },
      {
        id: "d6-m3",
        type: "image",
        url: "footage/day-6-3.jpg",
        caption: "In-game tool grip & visual test"
      }
    ]
  },
  {
    id: "day-7",
    day: 7,
    date: "2026-08-21",
    title: "Day 7: Gold Tier Tools & 3D Ore Models",
    summary: "Added Gold tier tools to the crafting progression today! 🚀✨\n\nAlso finished modeling all the major ores across the world: Iron, Copper, Gold, Gem, and Titanium.",
    bulletPoints: [
      "Integrated Gold tool tier with distinct stats and durability",
      "Completed 3D models for all ore deposits (Iron, Copper, Gold, Gem, Titanium)",
      "Implemented ore node collision and harvestable resource drops"
    ],
    tags: ["RobloxDev", "GoldTier", "Ores", "Crafting", "IndieGame"],
    media: [
      {
        id: "d7-m1",
        type: "image",
        url: "footage/day-7-1.jpg",
        caption: "Gold Tier tools lineup"
      },
      {
        id: "d7-m2",
        type: "image",
        url: "footage/day-7-2.jpg",
        caption: "3D Ore node models (Iron, Copper, Gold)"
      },
      {
        id: "d7-m3",
        type: "image",
        url: "footage/day-7-3.jpg",
        caption: "Gem & Titanium ore deposits"
      },
      {
        id: "d7-m4",
        type: "image",
        url: "footage/day-7-4.jpg",
        caption: "Mining ore nodes in world"
      }
    ]
  },
  {
    id: "day-8",
    day: 8,
    date: "2026-08-22",
    title: "Day 8: Dynamic Lighting, Craftable Torches & Steel Tool Tier",
    summary: "Implemented dynamic lighting with craftable torches to make cave exploration viable! 🔦🔥\n\nAlso integrated the new Steel tool tier to expand the mid-game progression tree.",
    bulletPoints: [
      "Added craftable handheld Torches with dynamic ambient lighting",
      "Implemented realistic shadow casting and light falloff for caves",
      "Created Steel tool tier bridging mid-game resource gathering"
    ],
    tags: ["RobloxDev", "DynamicLighting", "Torches", "SteelTier", "GameDev"],
    media: [
      {
        id: "d8-m1",
        type: "image",
        url: "footage/day-8-1.jpg",
        caption: "Torch dynamic lighting in dark cave"
      },
      {
        id: "d8-m2",
        type: "image",
        url: "footage/day-8-2.jpg",
        caption: "Steel tool tier items"
      },
      {
        id: "d8-m3",
        type: "image",
        url: "footage/day-8-3.jpg",
        caption: "Underground exploration with torchlight"
      },
      {
        id: "d8-m4",
        type: "image",
        url: "footage/day-8-4.jpg",
        caption: "Torch craft recipe and inventory test"
      }
    ]
  },
  {
    id: "day-9",
    day: 9,
    date: "2026-08-23",
    title: "Day 9: Mineable Minerals & Coal Nodes in World Gen",
    summary: "Mineable natural minerals and coal nodes have been successfully added to the world generation! ⛏️💎\n\nThe base resource gathering loop is now fully operational.",
    bulletPoints: [
      "Generated procedural mineral and coal node spawns across the map",
      "Connected mining yields to inventory resource economy",
      "Balanced tool wear and gathering speeds across different tiers"
    ],
    tags: ["RobloxDev", "WorldGen", "Minerals", "CoalNodes", "GameDev"],
    media: [
      {
        id: "d9-m1",
        type: "image",
        url: "footage/day-9-1.jpg",
        caption: "Natural coal node spawns"
      },
      {
        id: "d9-m2",
        type: "image",
        url: "footage/day-9-2.jpg",
        caption: "Mineral deposits along cliff faces"
      },
      {
        id: "d9-m3",
        type: "image",
        url: "footage/day-9-3.jpg",
        caption: "Resource gathering loop demonstration"
      },
      {
        id: "d9-m4",
        type: "image",
        url: "footage/day-9-4.jpg",
        caption: "Harvesting coal in the wild"
      }
    ]
  },
  {
    id: "day-10",
    day: 10,
    date: "2026-08-24",
    title: "Day 10: Dynamic Weather System & Deep Cold Ocean",
    summary: "Dynamic weather systems are now fully functional! 🌧️⚡\n\nBringing changing environmental conditions, rain, and storms to the game world. Also refined the deep cold ocean biome.",
    bulletPoints: [
      "Engineered dynamic weather controller with smooth weather transitions",
      "Added particle weather effects (rain, storms, overcast fog)",
      "Polished deep cold ocean atmosphere and water shaders"
    ],
    tags: ["RobloxDev", "WeatherSystem", "Atmosphere", "OceanBiome", "GameDev"],
    media: [
      {
        id: "d10-m1",
        type: "image",
        url: "footage/day-10-1.jpg",
        caption: "Dynamic weather change in world"
      },
      {
        id: "d10-m2",
        type: "image",
        url: "footage/day-10-2.jpg",
        caption: "Deep cold ocean storm view"
      }
    ]
  },
  {
    id: "day-11",
    day: 11,
    date: "2026-08-25",
    title: "Day 11: Underwater Valley, Bioluminescent Corals & Vents",
    summary: "The deep ocean biome has been expanded with an underwater valley! 🪸🌊\n\nPopulated with varied marine flora, bioluminescent glowing corals, and hydrothermal vents.",
    bulletPoints: [
      "Sculpted dramatic underwater ocean trenches and valleys",
      "Added custom bioluminescent glowing corals for atmospheric deep-sea lighting",
      "Created hydrothermal volcanic vents with bubbling particle effects"
    ],
    tags: ["RobloxDev", "OceanExpansion", "Bioluminescence", "Corals", "GameDev"],
    media: [
      {
        id: "d11-m1",
        type: "image",
        url: "footage/day-11-1.jpg",
        caption: "Underwater valley and marine flora"
      },
      {
        id: "d11-m2",
        type: "image",
        url: "footage/day-11-2.jpg",
        caption: "Bioluminescent corals & hydrothermal vents"
      }
    ]
  }
]
