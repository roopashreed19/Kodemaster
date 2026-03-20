# CodeQuest

CodeQuest is a comprehensive, gamified platform designed to make learning Computer Science fundamentals and practicing coding challenges engaging, interactive, and fun. Traverse through different worlds, conquer coding arenas, and take a breather in the classic arcade space.

## Features

- **Interactive Learning Worlds & Arenas:** Master individual subjects through targeted challenges and quests. Supported domains include:
  - Data Structures & Algorithms (DSA)
  - Operating Systems (OS)
  - Database Management Systems (DBMS)
  - Object-Oriented Programming (OOPS)
  - Computer Networks (CN)
  - General Aptitude
- **Arcade Games:** Take a break and sharpen your mind with integrated classic games like Memory Match, TicTacToe, Wordle, Sliding Puzzle, Pacman, and CipherSearch.
- **Real-time Code Execution:** Features an integrated Monaco Editor for a seamless coding and execution experience directly within the browser.
- **Progress Tracking:** A comprehensive dashboard allows users to track their journey, scores, and completion status across different tech domains.
- **Secure Authentication:** Robust user authentication system powered by JWT and bcrypt.

## Tech Stack

**Frontend (`client`)**
- React 18
- React Router DOM for routing
- Framer Motion for smooth animations
- Monaco Editor (`@monaco-editor/react`) for code input
- Axios for API requests
- Socket.io-client for real-time multiplayer features
- React Query for efficient data fetching and caching
- Lucide React for iconography
- KaTeX for rendering mathematical expressions

**Backend (`server`)**
- Node.js & Express.js
- MongoDB & Mongoose for database management
- Socket.io for WebSockets and real-time communication
- JSON Web Tokens (JWT) & Bcrypt.js for secure user authentication
- Google Generative AI integration for AI-powered features

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- MongoDB instance (local or MongoDB Atlas)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Kodemaster
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory based on the provided `.example.env`.
   - Ensure you provide valid credentials including your `MONGO_URI`, `PORT`, and any required API keys (like Google Generative AI keys).
   - *Optional:* Run any of the provided seed scripts (e.g., `node seedAptitude.js`) to populate the database with initial questions.

3. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application Locally

You will need to run the client and the server concurrently.

1. **Start the Backend Server:**
   ```bash
   cd server
   npm run dev
   ```
   *The server will typically run on `http://localhost:5000`.*

2. **Start the Frontend Client:**
   ```bash
   cd client
   npm start
   ```
   *The React app will launch and open in your default browser at `http://localhost:3000`.*

## Project Structure

```text
Kodemaster/
│
├── client/                 # React Frontend application
│   ├── public/             # Static assets
│   ├── src/                # React source code (Components, Games, Routes)
│   └── package.json        # Frontend dependencies and scripts
│
└── server/                 # Node.js/Express Backend application
    ├── controllers/        # Request handling logic
    ├── middleware/         # Custom Express middlewares (Auth, etc.)
    ├── models/             # Mongoose database schemas
    ├── routes/             # API endpoint definitions
    ├── utils/              # Helper functions and utilities
    ├── server.js           # Main backend entry point
    └── package.json        # Backend dependencies and scripts
```
