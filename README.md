# AI Engineer Track 2026 Roadmap

A personal dashboard and roadmap tracker for your 2026 AI Engineering journey.

This application is designed to help you consistently learn, track your progress, and ship code on your path to becoming an AI Engineer. It provides a structured curriculum divided into phases, from environment setup to building production-ready LLM applications.

## Features

- **Phase-Based Learning:** Structured 8-phase curriculum covering Python, Math, Classical ML, Deep Learning, and LLMs.
- **Progress Tracking:** Log your daily study hours, notes, and the specific phase you worked on.
- **Dashboard Overview:** View your current streak, total logged hours, and overall progress at a glance.
- **Calendar View:** A visual planner to see your study sessions across the month.
- **Stats & Heatmap:** Detailed statistics, including a 52-week activity heatmap and a breakdown of hours spent per phase.
- **Local Persistence:** Your data is saved locally in your browser using `localStorage`.

## Tech Stack

This project was built using:
- **Vanilla JavaScript:** No heavy frameworks, just pure JS.
- **HTML/CSS:** Custom styling for a dark, modern aesthetic.
- **Vite:** A fast build tool for modern web projects.

## Getting Started

### Prerequisites

You need Node.js and npm installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/nikesh47/AI_Eng_Roadmap.git
    cd AI_Eng_Roadmap
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173/`).

## Building for Production

To create an optimized build for deployment:

```bash
npm run build
```

This will generate a `dist` folder containing the minified and optimized assets.

## Deployment

This project is configured to be easily deployable to Vercel.

1.  Connect your GitHub repository to Vercel.
2.  Vercel will automatically detect the Vite framework and configure the build settings.
3.  Deploy!

## License

This project is open-source and available under the MIT License.
