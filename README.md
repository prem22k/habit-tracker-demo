# 1% Habit Tracker

A modern habit tracking application that helps users build better habits 1% at a time. Features a sleek dark theme, smooth animations, and Auth0 authentication.

![1% Habit Tracker](screenshot.png)

## Features

- 🌙 Modern dark theme with teal accents
- ✨ Smooth animations and transitions using Framer Motion
- 📱 Fully responsive design
- 🔒 Secure authentication with Auth0
- 📊 Progress tracking with visual feedback
- 🎯 Interactive features section
- 👥 User testimonials
- 📈 Progress bar showing scroll position

## Tech Stack

- React
- Auth0 for authentication
- Framer Motion for animations
- Lucide React for icons
- CSS3 for styling

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/1-percent-habit-tracker.git
```

2. Install dependencies:
```bash
cd 1-percent-habit-tracker
npm install
```

3. Create a `.env` file in the root directory and add your Auth0 credentials:
```env
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
```

4. Start the development server:
```bash
npm start
```

## Environment Setup

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
src/
├── components/
│   ├── Landing.jsx        # Main landing page component
│   ├── Landing.css        # Styles for landing page
│   └── ui/               # Reusable UI components
│       ├── Button.jsx
│       ├── Button.css
│       ├── Input.jsx
│       └── Input.css
├── App.js                # Root component
└── index.js             # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

## Acknowledgments

- Design inspired by modern web trends
- Icons from Lucide React
- Animation library: Framer Motion
