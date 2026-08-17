import type { GameProfile } from '../types/devlog'

export const initialGameProfile: GameProfile = {
  title: "Roblox Game Dev Diary",
  devName: "SamObviously",
  tagline: "Documenting my Roblox game development progress, screenshots, and footage day by day.",
  engine: "Roblox Studio",
  genre: "Roblox Game Project",
  startDate: new Date().toISOString().split('T')[0],
  status: "In Active Development",
  links: {
    github: "https://github.com/SamObviously/RobloxGameDevelopment",
    youtube: "",
    twitter: "",
    discord: "",
    steam: ""
  }
}
