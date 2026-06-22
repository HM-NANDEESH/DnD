# DnD Life Tracker & Habit Manager

DnD Life Tracker is a premium, modern, and feature-rich habit tracking and personal journal application. Built as a Progressive Web App (PWA) and packaged for mobileview environments using Capacitor, the app integrates high-fidelity glassmorphism aesthetics, advanced progress tracking, notion-style note-taking, and native Android home screen widgets.

---

## 🚀 Features

### 1. Advanced Habit Tracking
- **Consistency Scoring & Streaks**: View current completion streaks and calculate historical consistency percentages.
- **Progressive Subtasks**: Add multiple checklist items per habit, tracking incremental progress.
- **Categorization & Sorting**: Clean organization with tags, active cards, archived vaults, and trash management.

### 2. Notion-Style Rich Notes
- **Dynamic Attachment Viewer**: Support for attaching images, documents, and plain-text files with in-app previews and native OS integration.
- **Interactive Badges**: Embed, edit, and delete rich link badges and resource shortcuts.
- **Custom Wallpapers**: Style note pages using customizable preset themes or custom background uploads.

### 3. Native Android Integration
- **Home Screen Widgets**: Instantly sync habit statuses, streaks, consistency metrics, and alerts to native system widgets.
- **Dynamic Background Services**: Triggers real-time widget updates the instant you navigate away from the app.
- **Heads-up Alerts**: Highly visible push notifications for daily reminders and achievement celebrations.

### 4. Smart Notifications System
- **Unified Popover Center**: Live dropdown alerts feed with search filters and history logging.
- **Sarcastic Reminder Stagger**: Automated reminders that escalate if active habits are neglected.
- **Flexible Settings**: Granular configuration for daily reminders, achievement chimes, success toasts, and onboarding guides.

### 5. gamified Onboarding Quest
- **Interactive Quest Tracker**: Live dashboard checklist tracking core actions.
- **Claimable Rewards**: Level-up system with sound chimes and confetti animations upon quest completion.

---

## 🛠️ Technology Stack

- **Core Frontend**: Vanilla HTML5, CSS3 (Custom Glassmorphism Design Tokens), modern JavaScript (ES6+).
- **Core Backend**: Node.js & Express.
- **Database**: Local storage via IndexedDB on client-side, dynamic file-based JSON storage on backend.
- **Mobile Packaging**: Capacitor CLI (`@capacitor/core`, `@capacitor/android`, `@capacitor/ios`).
- **External Libraries**: Lucide Icons, Chart.js (Analytics), Canvas Confetti (Celebrations).

---

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Android Studio](https://developer.android.com/studio) (for compiling the Android wrapper)

### Local Development Setup

1. **Clone & install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   PORT=3000
   APP_URL=http://localhost:3000
   JWT_ACCESS_SECRET=your_access_token_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your web browser.

### Android Mobile Compilation

1. **Prepare production web assets**:
   ```bash
   npm run build
   ```

2. **Sync files with Android project**:
   ```bash
   npx cap sync android
   ```

3. **Compile debug package**:
   Open the `android/` directory in Android Studio, connect your developer device with USB debugging enabled, and compile/install:
   ```bash
   cd android
   .\gradlew.bat installDebug
   ```

---

## 📄 License
This project is licensed under the ISC License.
