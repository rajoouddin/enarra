# Enarra

**AI Automation for Small Accounting Firms**

Enarra is a modern, responsive business website designed for an AI automation agency targeting small accounting firms. It showcases services to automate data entry, onboarding, and workflows.

## 🚀 Features

-   **Modern & Responsive Design**: Built with a mobile-first approach using CSS Grid and Flexbox.
-   **Interactive Visuals**: Custom HTML5 Canvas particle animation for a dynamic background.
-   **Lead Generation**: Integrated with [Tally](https://tally.so) for seamless discovery call scheduling.
-   **Chatbot UI**: A custom-styled chatbot interface for potential client engagement.
-   **Smooth Animations**: Intersection Observer-based fade-in effects and smooth scrolling navigation.

## 🛠️ Tech Stack

-   **HTML5**: Semantic structure.
-   **CSS3**: Vanilla CSS with custom properties (variables) for consistent theming.
    -   fonts: Inter, Outfit.
    -   icons: Material Symbols Rounded.
-   **JavaScript**: Vanilla JS for logic, animations, and UI interactions.

## 📂 Project Structure

```
/
├── index.html          # Main landing page
├── css/
│   ├── style.css       # Main stylesheet
│   └── chatbot.css     # Chatbot specific styles
├── js/
│   ├── main.js         # UI logic (navbar, chatbot toggles)
│   ├── animation.js    # Canvas particle background animation
│   └── chatbot.js      # Chatbot functionality
├── assets/             # Images and vectors
└── README.md           # Project documentation
```

## 💻 Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/StartInTech/enarra.git
    cd enarra
    ```

2.  **Run locally:**
    Since this is a static site, you can open `index.html` directly in your browser.

    For a better experience (to handle paths and CORS correctly), use a local development server.
    
    *Using Python:*
    ```bash
    python3 -m http.server
    ```
    Then open `http://localhost:8000` in your browser.

    *Using VS Code:*
    Install the "Live Server" extension and click "Go Live".

## ☁️ Deployment: Cloudflare Pages

Deploying to Cloudflare Pages is simple and free.

1.  **Log in** to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Navigate to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3.  **Select Repository**: Choose `enarra` (or your repo name).
4.  **Configure Builds**:
    -   **Project Name**: `enarra` (or your preference).
    -   **Framework Preset**: `None` (since it's a static site).
    -   **Build Command**: (Leave blank).
    -   **Build Output Directory**: (Leave blank or `.`).
5.  Click **Save and Deploy**.

Cloudflare will verify the configuration and deploy your site within seconds.
