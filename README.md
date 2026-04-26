<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 5" />
  <img src="https://img.shields.io/badge/LinkedIn-OAuth-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn OAuth" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
</p>

<h1 align="center">🏙️ LinkedInCity</h1>

<p align="center">
  <strong>Your LinkedIn activity as a stunning interactive 3D city skyline</strong>
</p>

<p align="center">
  <em>Connect with your real LinkedIn account to generate a personalized city — filter by activity type, drive through streets, and explore your professional journey as a living cityscape.</em>
</p>


<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-activity-type-filters">Filters</a> •
  <a href="#-visualization-modes">Views</a> •
  <a href="#%EF%B8%8F-3d-simulation">Simulation</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-linkedin-oauth-setup">OAuth Setup</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

---

## 🌆 What is LinkedInCity?

**LinkedInCity** is a one-of-a-kind open-source web application that transforms your **LinkedIn professional activity** into a breathtaking, interactive **3D city skyline**. Every day you were active on LinkedIn becomes a building in your city — the more you posted, commented, or engaged, the taller and more impressive your skyline grows.

Unlike a boring bar chart or a plain contribution graph, LinkedInCity lets you:

- 🔗 **Sign in with your real LinkedIn account** via OAuth and generate a city unique to *you*
- 🏗️ **Explore an isometric city view** — each building = one day of activity
- 🗺️ **See a bird's-eye heatmap** — instantly spot your busiest weeks at a glance
- 🚗 **Drive through your city in 3D** — a fully explorable WebGL world powered by Three.js
- 🎯 **Filter by activity type** — Posts, Videos, Comments, Jobs, Internships and more
- 🌦️ **Experience weather effects** — rain, lightning, snow, autumn leaves in real time

Your professional journey is no longer a list of dates. **It's a city you can drive through.**

---

## 🌍 Why Does LinkedInCity Stand Out?

There are thousands of tools that help you *track* your LinkedIn performance. LinkedInCity is different — it helps you **feel** it.

| What others do | What LinkedInCity does |
|---|---|
| Show numbers and charts | Builds an explorable 3D cityscape |
| Require paid subscriptions | Completely free and open source |
| Generic dashboards | Fully personalized to *your* LinkedIn identity |
| Static analytics | Real-time interactive WebGL simulation |
| Plain data export | Visual storytelling of your career journey |

LinkedInCity sits at the intersection of **data visualization**, **game design**, and **professional branding** — a space nobody else occupies. It's not just a tool. It's a **statement** about who you are as a professional.

> *"Your career is a city you built. LinkedInCity just makes it visible."*

---

## 👥 Why Do People Use LinkedInCity?

LinkedInCity appeals to a wide range of professionals:

**🎓 Students & Fresh Graduates**
> Visualize their early LinkedIn journey, see their consistency, and share their growing city as a unique portfolio piece.

**💼 Job Seekers**
> Stand out in interviews by showcasing professional consistency through an interactive city — far more memorable than a line on a résumé.

**📣 Content Creators & Thought Leaders**
> See the peaks and valleys of their content strategy in 3D. Identify which months drove the most engagement at a glance.

**🧑‍💻 Developers & Tech Enthusiasts**
> Explore an impressive full-stack project combining React, Three.js, OAuth, and real-time 3D simulation. Fork it, learn from it, build on it.

**🏢 Recruiters & HR Professionals**
> Get a quick, visual read on a candidate's LinkedIn engagement history and consistency without reading through endless posts.

**🎨 Designers & Creatives**
> Appreciate the craft: glassmorphism UI, isometric SVG rendering, WebGL city simulation, weather systems, and 6 premium themes.

---

## ✅ Advantages of LinkedInCity

### 🎨 Unmatched Visual Experience
No other LinkedIn tool renders your data as a **drivable, explorable 3D city**. The combination of isometric SVG, WebGL Three.js simulation, weather effects, traffic, and pedestrians creates an experience that is genuinely stunning.

### 🔒 Privacy-First
LinkedInCity only reads your **name, email, and profile picture** from LinkedIn. It stores nothing in a database. Your session is a signed cookie — no tracking, no data collection.

### 🆓 100% Free & Open Source
No paywalls. No subscription. No ads. Fork it, self-host it, customize it — it's yours under the MIT license.

### ⚡ Fast & Lightweight
Built with Vite 5 — sub-second hot reload in development, optimized production builds, and a tiny bundle footprint.

### 🌐 One-Click Deploy
Designed for easy deployment: **Vercel** for the frontend (zero config), **Hugging Face Spaces** for the backend (Docker). Up and running in under 10 minutes.

### 🎯 Activity Type Intelligence
Buildings aren't just tall or short — they're **categorized**. Filter your entire city by Posts, Videos, Photos, Comments, Experience updates, Jobs, or Internships. Each type has its own color, icon, and glow effect.

### 🎮 Genuinely Fun
Most analytics tools are dull. LinkedInCity is the kind of thing you show friends and colleagues just because it's cool. The city simulation — with traffic, weather, day/night toggle, and a minimap — makes it feel like a game.

### 🔧 Developer-Friendly
Clean, well-structured codebase with separated hooks, constants, utilities, and components. Easy to extend, customize, and learn from.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔗 **LinkedIn OAuth** | Sign in with your real LinkedIn account (OpenID Connect) |
| 🏗️ **Isometric City View** | SVG-based isometric 3D skyline with animated building entry |
| 🗺️ **Bird's Eye Heatmap** | GitHub-style activity grid with hover tooltips |
| 🚗 **3D City Simulation** | Full WebGL city you can **drive through** with WASD controls |
| 🎯 **Activity Type Filters** | Filter buildings by: Posts, Videos, Photos, Comments, Experience, Jobs, Internships |
| 🎨 **Type-Coloured Buildings** | Each activity type has its own colour — buildings glow when filtered |
| 🚦 **Traffic System** | Autonomous cars, trucks, buses, taxis, ambulances, and police cars |
| 🚶 **Pedestrians** | Animated citizens walking along footpaths |
| 🌦️ **Weather Effects** | Storm (rain + lightning), Snow, Autumn Leaves — with ground accumulation |
| 🌙 **Day/Night Cycle** | Toggle between daytime and nighttime lighting |
| 🗺️ **Minimap** | Real-time overhead minimap with player position |
| 🎨 **6 Premium Themes** | Professional, Corporate, Recruiter, Sales, Premium, Executive |
| ⏱️ **Time Filters** | All Time, 1 Year, 6 Months, 3 Months, 1 Month, 1 Week |
| 📊 **Stats Dashboard** | Total activities, peak day, longest streak, current streak |
| 📱 **Responsive** | Works beautifully on desktop and tablet |

---

## 🎯 Activity Type Filters

One of the key features of LinkedInCity is the ability to filter your city buildings by **activity type**. Each type has a unique colour and icon:

| Icon | Type | Colour | Weight |
|------|------|--------|--------|
| 🏙️ | **All Activity** | Theme default | — |
| 📝 | **Posts** | Sky Blue | 28% |
| 🎥 | **Videos** | Deep Orange | 14% |
| 📷 | **Photos** | Purple | 14% |
| 💬 | **Comments** | Green | 22% |
| 💼 | **Experience** | Amber | 11% |
| 🎯 | **Jobs** | Red | 7% |
| 🎓 | **Internships** | Teal | 4% |

**How it works:**
- Click any chip in the **filter bar at the bottom** to activate a type filter
- Buildings of the selected type **glow in their category colour**
- Non-matching buildings **flatten to transparent tiles** — the grid stays intact
- A **banner** shows how many days match the active filter
- Hover any building to see its **type badge** in the tooltip
- Click **✕ Clear** or **All Activity** to reset the filter
- Works in both **Isometric** and **Bird's Eye** views

> **Note:** Activity types are *estimated* using a weighted distribution seeded by your LinkedIn profile identity. LinkedIn's public API does not expose post/activity history to third-party apps — only your name, email, and profile picture are real data from LinkedIn.

---

## 🎮 Visualization Modes

### ◇ Isometric View
A gorgeous SVG-rendered isometric city skyline. Each building represents one day of LinkedIn activity — the taller the building, the more active you were. When a type filter is active, matching buildings glow in their category colour while others flatten.

### ▦ Bird's Eye View
A top-down heatmap grid inspired by GitHub's contribution graph. Color intensity maps to activity level. When a filter is active, matching cells glow in their type colour and non-matching cells dim. Hover any cell to see the exact count, date, and activity type badge.

### 🏙️ 3D Simulation
A **full WebGL city** powered by Three.js where you can:
- **Drive a car** using `W/A/S/D` or arrow keys
- Watch **autonomous traffic** (sedans, SUVs, sports cars, taxis, police, ambulances, buses)
- See **pedestrians** walking along footpaths
- Toggle **weather** (storm with rain & lightning, snow with ground accumulation, autumn leaves)
- Switch between **day and night** lighting
- Navigate using the live **minimap**

---

## 🎨 Themes

| Theme | Color | Description |
|-------|-------|-------------|
| **Professional** | 🔵 LinkedIn Blue | The signature LinkedIn look |
| **Corporate** | 🟢 Matrix Green | Cyberpunk terminal aesthetic |
| **Recruiter** | 🟣 Purple | Bold and eye-catching |
| **Sales** | 🔷 Cyan | Clean and professional |
| **Premium** | 🟡 Gold | Luxurious and premium |
| **Executive** | ⚪ Ice Blue | Refined and elegant |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **npm** 9+
- A **LinkedIn Developer App** (for OAuth — see setup below)

### Installation

```bash
# Clone the repository
git clone https://github.com/MohammadSakibAhmad0874/LinkedIn-City-main.git

# Navigate to project
cd LinkedIn-City-main

# Install dependencies
npm install
```

### Environment Setup

Copy the example env file and fill in your LinkedIn credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:4000/api/linkedin/callback
SESSION_SECRET=any-long-random-string
FRONTEND_URL=http://localhost:3000
PORT=4000
```

### Running Locally

You need **two terminals**:

```bash
# Terminal 1 — Backend API (port 4000)
node server/dev.js

# Terminal 2 — Frontend (port 3000)
npm run dev
```

Open **http://localhost:3000** in your browser.

> **Port conflict?** Kill existing processes with:
> ```bash
> npx kill-port 3000 4000
> ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 LinkedIn OAuth Setup

To enable real LinkedIn sign-in:

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
2. Create a new app (or use an existing one)
3. Under **Auth** tab → **OAuth 2.0 settings**, add the redirect URI:
   ```
   http://localhost:4000/api/linkedin/callback
   ```
4. Make sure the following OAuth scopes are enabled:
   - `openid`
   - `profile`
   - `email`
5. Copy your **Client ID** and **Client Secret** into `.env`
6. Restart the backend server

### What LinkedIn data is used

| Data | Source | Used for |
|------|--------|----------|
| Display name | LinkedIn API ✅ | City title, profile badge |
| Profile picture | LinkedIn API ✅ | UI avatar |
| Email address | LinkedIn API ✅ | Session identity |
| Activity history | Generated 🔄 | Building heights & types |
| Activity types | Generated 🔄 | Filter categories |

> LinkedIn's public OAuth API (`openid profile email` scopes) does not expose post history, comment history, or activity feeds to third-party apps. Activity data is *estimated* using a deterministic seeded generator based on your profile identity.

---

## 🏗️ Project Structure

```
LinkedInCity/
├── index.html                          # SEO shell, meta tags, structured data
├── package.json                        # Dependencies & scripts
├── vite.config.js                      # Vite + SPA fallback middleware
├── vercel.json                         # Vercel deployment rewrites
├── .env.example                        # Environment variable template
├── .env                                # Your local credentials (git-ignored)
│
├── api/
│   ├── server.js                       # Express API (OAuth routes, session, CORS)
│   └── linkedinAuth.js                 # LinkedIn OAuth helpers + city data generator
│
├── server/
│   └── dev.js                          # Local dev entry point (loads .env, starts Express)
│
└── src/
    ├── main.jsx                        # React entry + HelmetProvider
    ├── App.jsx                         # Routing, auth flow, SEO, theme state
    │
    ├── constants/
    │   ├── themes.js                   # 6 color themes with 5-level palettes
    │   ├── graph.js                    # Isometric grid layout constants
    │   └── activityTypes.js            # 7 activity types (icon, color, weight)
    │
    ├── utils/
    │   ├── colorUtils.js               # Hex/RGB conversion, brightness adjustment
    │   └── dataUtils.js                # Data normalization, filterByType(), stats
    │
    ├── hooks/
    │   ├── useLinkedInData.js          # Activity generator + real data fetcher
    │   ├── useLinkedInAuth.js          # OAuth session state hook
    │   ├── useContributionData.js      # Time-range filtering + stats processing
    │   ├── useMountAnimation.js        # Mount animation trigger
    │   └── useMousePosition.js         # Mouse tracking for tooltips
    │
    └── components/ActivityGraph3D/
        ├── index.js                    # Barrel exports
        ├── LinkedInConnect.jsx         # Landing page (sign-in, demo profiles)
        ├── LinkedInAuthButton.jsx      # OAuth sign-in button
        ├── ActivityGraph3D.jsx         # Main controller (views, filters, themes)
        ├── ActivityTypeFilter.jsx      # Activity type filter chip bar
        ├── Building.jsx                # Isometric 3D building with type colours
        ├── IsometricGrid.jsx           # SVG isometric city grid
        ├── BirdsEyeGrid.jsx            # Top-down heatmap view with type colours
        ├── CitySimulation.jsx          # Full WebGL 3D simulation
        ├── CityAssets.js               # Decorative assets (benches, gardens, kiosks)
        ├── CitySignage.js              # Traffic signals, street signs, billboards
        ├── CityTraffic.js              # Traffic system (car/truck/bus movement)
        ├── CityVehicles.js             # 9 vehicle types with detailed 3D models
        ├── WeatherSystem.js            # Storm, snow, leaves, lightning effects
        ├── PedestrianSystem.js         # Pedestrians + tree builders
        ├── Tooltip.jsx                 # Hover tooltip with type badge + flip positioning
        ├── StatsBar.jsx                # Activity stats display
        ├── ThemePicker.jsx             # Theme selector with color swatches
        ├── ViewToggle.jsx              # View mode switcher
        ├── GraphLegend.jsx             # Activity level legend
        └── useDragRotation.js          # Drag rotation hook
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks and functional components |
| **Three.js** | 3D WebGL rendering engine for the city simulation |
| **Vite 5** | Lightning-fast build tool and dev server |
| **Express.js** | Backend API server for OAuth token handling |
| **dotenv** | Environment variable management |
| **react-helmet-async** | Dynamic SEO meta tag management |
| **Vanilla CSS** | Inline styles for zero-dependency styling |

---

## 🔧 How It Works

### Authentication Flow
1. User clicks **"Connect with LinkedIn"** on the landing page
2. Frontend redirects to the Express backend (`/api/linkedin/auth`)
3. Backend redirects to LinkedIn's OAuth authorization page
4. After approval, LinkedIn sends a code to `/api/linkedin/callback`
5. Backend exchanges the code for an access token, fetches profile info, and sets a signed session cookie
6. Frontend detects the session cookie and loads the city with the user's real profile name

### Activity Data Generation
Since LinkedIn's API does not expose post/activity history, LinkedInCity uses a **deterministic seeded RNG** based on the user's LinkedIn profile ID. This means:

- ✅ Every profile produces a **unique, consistent city** every time
- ✅ Activity patterns are **realistic** — weekday bias, seasonal peaks, burst days
- ✅ Activity **types** are weighted by realistic LinkedIn usage patterns (more posts & comments, fewer internships)
- ✅ **No activity data** is collected or stored — only profile identity from LinkedIn

### City Architecture
1. **Activity → Building Height**: Each day maps to one building. Higher count = taller skyscraper
2. **Activity → Type**: Each active day is assigned a type (post_text, post_video, comment, etc.) via weighted RNG
3. **Filter → Visual**: Filtering dims non-matching buildings to flat tiles without collapsing the grid
4. **Type → Colour**: Each type has a dedicated colour applied to building faces and tooltips

### Collision Detection
The drivable car uses AABB (Axis-Aligned Bounding Box) collision detection against all buildings, preventing the player from driving through structures.

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set the following **environment variables** in Vercel dashboard:

| Variable | Value |
|----------|-------|
| `LINKEDIN_CLIENT_ID` | Your LinkedIn app client ID |
| `LINKEDIN_CLIENT_SECRET` | Your LinkedIn app client secret |
| `LINKEDIN_REDIRECT_URI` | `https://your-app.vercel.app/api/linkedin/callback` |
| `SESSION_SECRET` | A long random string |
| `FRONTEND_URL` | `https://your-app.vercel.app` |

The `vercel.json` is pre-configured with API rewrites and SPA fallback for clean URL routing.

### Other Platforms
```bash
npm run build
# Deploy ./dist (static frontend) + api/ (serverless functions)
```

---

## 🎮 Controls (Simulation Mode)

| Key | Action |
|-----|--------|
| `W` / `↑` | Accelerate forward |
| `S` / `↓` | Brake / Reverse |
| `A` / `←` | Turn left |
| `D` / `→` | Turn right |

### HUD Elements
- **Speed gauge** (bottom-left) — Current speed in km/h
- **Profile badge** (top-left) — Username and title
- **Weather controls** (top-right) — Clear, Storm, Snow, Leaves
- **Day/Night toggle** (top-right) — Switch lighting
- **Minimap** (bottom-right) — Overhead view with player dot

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Developer

<table>
  <tr>
    <td align="center">
      <strong>Mohammad Sakib Ahmad</strong><br/>
      B.Tech CSE · Front-End Developer · Full Stack Web Developer<br/>
      <a href="https://github.com/MohammadSakibAhmad0874">GitHub</a> •
      <a href="https://www.linkedin.com/in/mohammad-sakib-ahmad-743651351">LinkedIn</a>
    </td>
  </tr>
</table>

---

<p align="center">
  <strong>⭐ Star this repo if you find it cool!</strong>
</p>
"# Real-LinkedIn-City" 
