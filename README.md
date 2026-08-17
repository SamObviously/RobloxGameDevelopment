# 📖 Game Dev Diary & Visual Journal

A clean, public web diary for documenting your daily game development journey with **pictures, video clips, and text reflections**. 

> 🔒 **100% Code Privacy**: Your game project and actual source code stay private on your computer. This repository only hosts your public dev diary website for anyone on the internet to follow!

---

## 🌟 How to Post Your Daily Updates

### Option 1: Using the Website (Fastest)
1. Run `npm run dev` and open the site.
2. Click **`+ Write Diary Entry`** in the top-right corner.
3. Type what you worked on, select your screenshot or video file, and click **`Post to Diary`**.
4. Click **`Export devlogs.ts`** or **`Copy Snippet`** to update [`src/data/devlogs.ts`](file:///d:/Personal/Documents/ai/Privateserver/Gitty/src/data/devlogs.ts).

### Option 2: Directly in Code
1. Drop your screenshot or clip in [`public/footage/`](file:///d:/Personal/Documents/ai/Privateserver/Gitty/public/footage) (e.g. `public/footage/day-1.png`).
2. Add a new entry to the array in [`src/data/devlogs.ts`](file:///d:/Personal/Documents/ai/Privateserver/Gitty/src/data/devlogs.ts):
   ```ts
   {
     id: "day-2",
     day: 2,
     date: "2026-08-18",
     title: "Day 2: Drew the First Level Tiles & Lighting",
     summary: "Worked on drawing the forest tileset in Aseprite and testing normal map lighting in the engine. Really happy with how atmospheric it looks!",
     bulletPoints: [
       "Created 16x16 mossy stone wall tiles",
       "Set up dynamic point lights with gentle flicker effect"
     ],
     tags: ["PixelArt", "Lighting", "Environment"],
     media: [
       {
         id: "m2-1",
         type: "image",
         url: "footage/day-2.png",
         caption: "Forest level lighting test"
       }
     ]
   }
   ```
3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Day 2 diary update"
   git push origin main
   ```

---

## 🌐 Publishing to GitHub Pages

1. Push your repository to GitHub.
2. In your GitHub repository:
   - Go to **Settings** → **Pages** (left sidebar).
   - Under **Build and deployment > Source**, select **GitHub Actions**.
3. Your public diary is live at:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```
