# HealthTrack 💪

A comprehensive health and fitness tracking app built with Next.js, React, and Tailwind CSS.

## Features

✨ **Todo Management**: Track daily tasks with pending/completed sections
📊 **Weight Tracking**: Log daily weights with BMI, BMR, and TDEE calculations
📅 **Calendar View**: Visual calendar showing weight entry history
⚙️ **Customizable Settings**: Adjust height, goal weight, maintenance calories, activity level, age, and gender
🤖 **AI Assistant**: Get health advice and personalized suggestions
📱 **Mobile-Optimized**: Full PWA support for iPhone and Android

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/lilh00/health-tracking-app.git
   cd health-tracking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to http://localhost:3000

## Building & Deployment

### Vercel Deployment

1. **Connect your GitHub repo to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Click Deploy
   - Your app will be live!

### iPhone PWA Installation

1. Open the deployed app in Safari on your iPhone
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add" to install as PWA
5. App will work offline and appear as a native app

## Usage

### Dashboard
- View all key health metrics at a glance
- See current weight, goal weight, BMI, progress percentage
- Check BMR, TDEE, and maintenance calories

### Weight Tracking
- Log daily weights
- Add optional notes
- View weight history
- Edit or delete entries

### Calendar
- Visual representation of weight entries
- Navigate between months
- See which days have logged weights

### Settings
- Update personal information (age, gender, height)
- Set goal weight
- Adjust activity level (affects TDEE calculation)
- Customize maintenance calories
- All settings persist locally

### AI Assistant
- Ask health and fitness questions
- Get personalized advice based on your metrics
- Topics include: nutrition, workouts, calories, progress tracking

### Todo List
- Add new tasks
- Mark tasks as complete
- Delete completed tasks
- Clear all completed items
- All data persists locally

## Data Storage

All data is stored locally using Zustand and browser's localStorage:
- Todos
- Weight entries
- Health settings
- No server-side storage needed

## Technologies Used

- **Frontend**: React 18, Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: React Icons
- **Dates**: date-fns
- **TypeScript**: Full type safety

## Calculations

### BMI (Body Mass Index)
```
BMI = (weight in lbs / (height in inches)²) × 703
```

### BMR (Basal Metabolic Rate) - Mifflin-St Jeor Equation
```
For Women: (10 × weight) + (6.25 × height) - (5 × age) - 161
For Men: (10 × weight) + (6.25 × height) - (5 × age) + 5
```

### TDEE (Total Daily Energy Expenditure)
```
TDEE = BMR × Activity Factor
- Sedentary: 1.2
- Lightly Active: 1.375
- Moderately Active: 1.55
- Very Active: 1.725
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Feel free to fork, modify, and improve this app. Share your enhancements!

---

Built with ❤️ for health-conscious developers
