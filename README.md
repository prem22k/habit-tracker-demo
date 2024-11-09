# 1% Habit Tracker

A modern habit tracking application that empowers users to improve their lives by just 1% each day. Inspired by *Atomic Habits*, this app focuses on adaptive tracking and smart habit rescheduling. Featuring a sleek dark theme, smooth animations, and secure Auth0 authentication, 1% Habit Tracker is designed for an intuitive and visually appealing experience.

![1% Habit Tracker](screenshot.png)

## 🌟 Features

- 🌙 **Modern Dark Theme**: Teal accents for a sleek, minimal aesthetic
- ✨ **Smooth Animations**: Seamless transitions powered by Framer Motion
- 📱 **Fully Responsive Design**: Optimized for mobile, tablet, and desktop
- 🔒 **Secure Authentication**: Auth0 integration ensures safe and easy login
- 📊 **Progress Tracking**: Visual feedback on habit progress
- 🎯 **Interactive Features**: Highlighting adaptive tracking and habit management
- 👥 **User Testimonials**: Social proof for motivation
- 📈 **Scroll-Linked Progress Bar**: Shows user progress as they scroll

## 🛠 Tech Stack

- **Frontend**: React with CSS3 for styling
- **Authentication**: Auth0 for secure login
- **Animations**: Framer Motion for sleek, smooth animations
- **Icons**: Lucide React for intuitive and consistent iconography
- **Testing**: Jest and React Testing Library

## 📂 Project Structure

```
habittracker/
├── public/
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Landing.jsx          # Main landing page
│   │   ├── Onboarding.jsx       # User onboarding flow
│   │   ├── UserProfile.jsx      # User profile management
│   │   ├── HabitSelection.jsx   # Habit selection interface
│   │   ├── HabitSelection.css   # Styles for habit selection
│   │   └── ui/                  # Reusable UI components
│   │       ├── Input.jsx
│   │       └── [other UI components]
│   ├── styles/
│   │   └── common.css           # Shared styles
│   ├── App.js                   # Root component
│   ├── App.test.js             # App component tests
│   ├── index.js                # Application entry point
│   ├── index.css               # Global styles
│   ├── setupTests.js           # Test configuration
│   └── reportWebVitals.js      # Performance monitoring
├── .env                        # Environment variables
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## 📥 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/1-percent-habit-tracker.git
   ```

2. **Install dependencies**:
   ```bash
   cd 1-percent-habit-tracker
   npm install
   ```

3. **Configure Auth0**:
   - Create a `.env` file in the root directory and add your Auth0 credentials:
     ```env
     REACT_APP_AUTH0_DOMAIN=your-auth0-domain
     REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
     ```

4. **Run the app**:
   ```bash
   npm start
   ```

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
```

## 🧪 Testing

The project includes a comprehensive test suite using Jest and React Testing Library. To run the tests:

```bash
npm test
```

## 📊 Performance Monitoring

The application includes web vitals reporting for monitoring performance metrics. This helps track and improve the user experience over time.

## 🚀 Future Enhancements

- **Wearable Device Integration**: Connect with fitness bands or smartwatches
- **Social Sharing**: Share progress and achievements with friends
- **Gamification**: Add rewards, streaks, and badges
- **Advanced AI Insights**: AI-powered personalized habit recommendations
- **Community Feature**: Social groups for interaction and encouragement

## 🤝 Contributing

We welcome contributions! Here's how you can help:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

[MIT](LICENSE)

## 🙏 Acknowledgments

- **Design**: Inspired by modern UI/UX trends
- **Icons**: Provided by Lucide React
- **Animations**: Powered by Framer Motion

---

Feel free to reach out with any questions or suggestions for improvements!
