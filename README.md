# Describe Issue – Bilingual PWA Civic Reporting Portal

<p align="center">
  <img src="./public/DescribeIssueL.png" alt="Describe Issue Logo" width="380" />
</p>

An interactive, high-performance Progressive Web App (PWA) designed to bridge the gap between citizens and municipal authorities. Users can report local civic complaints (roads/potholes, garbage accumulation, streetlights, water leaks, and other issues) in under a minute. 

Built with accessibility in mind, the platform features a fully bilingual (English/Hindi) interface, real-time voice-to-text dictation, client-side image compression, and interactive location selection on a live map.

---

## 🚀 Key Features

*   **Bilingual Translation (English / हिंदी)**: Seamless toggle switching between English and Hindi across headings, form inputs, validation messages, and ticket receipts.

*   **Voice Dictation (Web Speech API)**: Speech-to-text dictation module supporting voice inputs in both English and Hindi, letting users speak their issue description naturally.

*   **Interactive Location Map (Leaflet & OSM)**: An interactive map canvas that allows users to place a draggable pin on their exact issue location. Connected to the **OpenStreetMap Nominatim API** for instant reverse-geocoding (coordinate-to-street address resolution).

*   **Canvas Image Compression**: Automated client-side canvas utility that resizes and compresses photo uploads to under 150KB, ensuring high performance and fitting safely within browser limits.

*   **Progressive Web App (PWA) Offline Support**: Service worker caching configuration enabling offline ticket review and portal loading under poor connectivity states.

*   **Real-time Draft Sync & History Drawer**: Saves unsubmitted form entries dynamically (so refreshes don't lose data) and maintains a submitted tickets history list inside a slide-out drawer receipt panel.

---

## 🛠️ Tech Stack

*   **Frontend Library**: React 19
*   **Build Tool**: Vite 8
*   **Styling**: Tailwind CSS v4
*   **Mapping Engine**: Leaflet (OpenStreetMap tiles)
*   **APIs**: OpenStreetMap Nominatim (Reverse Geocoding), Web Speech API (Recognition)
*   **Storage**: LocalStorage API
*   **PWA Features**: Native Service Workers

---




## 📂 Project Structure

```bash
Potens_Assignment/
├── public/                 # Static assets, logos, and PWA Service Worker (sw.js)
├── src/
│   ├── assets/             # Category-specific cover photos & hero graphics
│   ├── components/         # Modular, reusable UI components:
│   │   ├── Button.jsx          # Reusable button wrapper (loading, icon slots)
│   │   ├── Card.jsx            # Modern glassmorphism card frame
│   │   ├── ImageUploader.jsx   # Drag & drop photo uploader (canvas compression)
│   │   ├── LanguageToggle.jsx  # Premium click-to-expand dropdown language selector
│   │   ├── MapSelector.jsx     # OSM map selector with draggable marker pinning
│   │   ├── ProgressStepper.jsx # Multi-step wizard indicator bar
│   │   ├── ReferenceCard.jsx   # Ticket receipt with barcode, details & print trigger
│   │   ├── SuccessCard.jsx     # Animated checkmark feedback card
│   │   └── VoiceRecorder.jsx   # Voice recorder microphone & audio wave animations
│   ├── contexts/           # Shared global states:
│   │   ├── LanguageContext.jsx # Handles t() nested dot-notation translations
│   │   └── ReportContext.jsx   # Manages reporting wizard steps, drafts & history
│   ├── data/
│   │   └── categories.js       # Standardized category schemes (pothole, garbage, etc.)
│   ├── hooks/              # Custom React hooks:
│   │   ├── useLanguage.js      # Syntactic shortcut to translation state
│   │   └── useSpeechRecognition.js # Low-level recognition constructor wrapper
│   ├── locales/            # Localization dictionary keys:
│   │   ├── en.json             # English translations
│   │   └── hi.json             # Hindi translations
│   ├── pages/              # High-level layouts:
│   │   ├── HomePage.jsx        # Landing page (hero background, cards, footer, drawer)
│   │   ├── DetailsPage.jsx     # Main reporting form page
│   │   └── ConfirmationPage.jsx# Final success receipt wrapper page
│   ├── pwa/
│   │   └── registerSW.js       # Registers background worker on browser window load
│   ├── routes/
│   │   └── AppRoutes.jsx       # Simple router switching pages depending on wizard step
│   ├── services/
│   │   └── speech.service.js   # API capability checking & language tags mappings
│   ├── styles/             # Stylesheet configuration:
│   │   ├── globals.css         # Theme overrides & Tailwind utilities
│   │   └── animations.css      # Keyframes for pulse, bounce & wave animations
│   ├── utils/              # Pure utility functions:
│   │   ├── compressImage.js    # Canvas pixel scaling compression
│   │   ├── fileToBase64.js     # Image file serializer
│   │   ├── formatDate.js       # Localized date string builder
│   │   ├── generateReference.js# Unique receipt reference ID generator
│   │   └── validators.js       # Form validators (description & phone format checks)
│   ├── App.jsx             # High-level React app layout wrapper
│   └── main.jsx            # Dom mounting entrypoint
├── index.html              # Core HTML structure loading favicon & fonts
├── package.json            # Node dependencies
└── vite.config.js          # Build plugin rules configuration
```




---

## 💻 Installation

### Prerequisites
*   Node.js (v18.0.0 or higher)
*   npm (v9.0.0 or higher)

### Setup Steps
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/codexgetit/potens-assignment.git
    cd potens-assignment
    ```

2.  **Install Node Modules**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

4.  **Build for Production**:
    ```bash
    npm run build
    ```
    Static files will compile to the `dist/` directory.

---




## 🎨 Design Aesthetics & Accessibility
*   **Recruiter-Friendly Design**: Modern typography utilizing **Inter** and **Outfit** font families, structured shadow layers, and fluid layouts.
*   **High Contrast Visuals**: Every reporting category includes a high-definition real-life photo. Uneducated or illiterate users can easily select categories simply by identifying the cover image.
*   **Feedback & Animations**: Micro-animations built for interactive actions (speech recording waves, tick popups, hover offsets, smooth sliding drawers).

---

## ⚙️ Environment Variables
This application runs purely client-side with no backend API keys required. OpenStreetMap services run under public request headers.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more details.

---

## ✍️ Author
*   **Dashrath Bogati**
*   Email: dashrathbogati907@gmail.com



/////////////////AI Usage:Used Chatgpt for structure of the code , mostly I used AI as a development assistant throughout the project It helped me brainstorm ideas, understand concepts, debug issues, improve React components, and refine the UI.
I used antigravity for the code optimization .
