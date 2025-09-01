# Habit Predictor - Daily Micro-Habit Predictor

A Flask-based web application that uses machine learning to predict which micro-habits users are most likely to skip each day and provides personalized reminders.

![Python](https://img.shields.io/badge/python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/flask-2.3-green)
![TensorFlow](https://img.shields.io/badge/tensorflow-2.15-orange)
![SQLite](https://img.shields.io/badge/sqlite-database-lightgrey)
![Machine Learning](https://img.shields.io/badge/machine-learning-yellow)
![Status](https://img.shields.io/badge/status-active-success)

---

## 🔗 Live Demo
👉 [Try HabitPredict here](https://habit-predictor-daily-micro-habit-p-eight.vercel.app/)

---

## 📸 Screenshots

### Dashboard View
![Dashboard Screenshot](Assets(recording+screenshot)/Screenshot of project/Screenshot (27).png)

### Add Habit Form
![Add Habit Screenshot](Assets(recording+screenshot)/Screenshot of project/Screenshot (29).png)

### Analytics & Insight
![Add Habit Screenshot](Assets(recording+screenshot)/Screenshot of project/Screenshot (30).png)

### Settings
![Add Habit Screenshot](Assets(recording+screenshot)/Screenshot of project/Screenshot (31).png)

*(Replace these with your own screenshots/GIFs inside the `assets/` folder)*

---

## 🎥 Demo
![Demo GIF](Assets(recording+screenshot)/Project Screen Recording/HabitPredict - Analytics - Google Chrome 2025-09-01 12-13-20.mp4)

*(Record a short screen capture of adding/completing a habit and place it here)*

---

## 🚀 Features

- **AI-Powered Predictions**: TensorFlow LSTM model predicts habit skip probability
- **Habit Tracking**: Log daily habits with completion status and notes
- **Personalized Dashboard**: View habits ranked by skip risk with confidence scores
- **Advanced Analytics**: Visualize habit completion trends with interactive Chart.js graphs
- **Smart Reminders**: Get notified about high-risk habits at optimal times
- **User Authentication**: Secure login and registration system with session management
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🏗️ Tech Stack

- **Backend Framework**: Flask (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **Machine Learning**: TensorFlow, Keras, Scikit-learn
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling Framework**: Tailwind CSS
- **Data Visualization**: Chart.js
- **Authentication**: Flask-Login with password hashing
- **Database Migrations**: Flask-Migrate

## 📦 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sharbmee/Habit-Predictor---Daily-Micro-Habit-Predictor.git
   cd Habit-Predictor---Daily-Micro-Habit-Predictor
   ```

2. **Create and activate a virtual environment**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate on Windows
   venv\Scripts\activate
   
   # Activate on macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**
   ```bash
   python init_database.py
   ```

5. **Run the application**
   ```bash
   python run.py
   ```

6. **Access the application**
   Open your web browser and navigate to `http://localhost:5000`

## 🔐 Default Login Credentials

A test user is created automatically with sample data:
- **Username**: `testuser`
- **Password**: `password123`

## 🗄️ Database Schema

The application uses SQLite with the following main tables:

- `user` - User accounts and authentication information
- `habit` - Habit definitions and metadata (name, optimal time, duration)
- `habit_log` - Daily habit completion records with timestamps
- `prediction` - AI-generated skip risk predictions with confidence scores
- `user_settings` - User preferences and application settings
- `category` - Habit categorization system

## 🤖 Machine Learning Implementation

### Prediction System
The application uses a dual approach for predictions:

1. **LSTM Neural Network** (TensorFlow/Keras):
   - Analyzes time-series patterns in habit completion data
   - Considers sequences of 7 days to predict the 8th day
   - Incorporates features like time of day, day of week, and historical patterns

2. **Heuristic Fallback System**:
   - Provides predictions when insufficient data exists for ML
   - Uses completion rates and pattern analysis
   - Adjusts for factors like evening habits and weekends

### Model Training
Retrain the model with new data:

```bash
# Using the API endpoint
curl -X POST http://localhost:5000/api/predictions/train

# Or via Python
from app.ml.predict import train_model
from app import create_app

app = create_app()
with app.app_context():
    result = train_model(1)  # User ID
    print(f"Training result: {result}")
```

## 🌐 API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/` | Dashboard homepage | Required |
| `GET` | `/dashboard` | User dashboard with predictions | Required |
| `GET` | `/habits` | Habit management interface | Required |
| `GET` | `/analytics` | Analytics and insights dashboard | Required |
| `GET` | `/settings` | User settings page | Required |
| `POST` | `/api/register` | User registration | Public |
| `POST` | `/api/login` | User authentication | Public |
| `POST` | `/api/habits` | Create a new habit | Required |
| `PUT` | `/api/habits/<id>` | Update a habit | Required |
| `DELETE` | `/api/habits/<id>` | Delete a habit | Required |
| `POST` | `/api/habits/<id>/log` | Log habit completion | Required |
| `GET` | `/api/predictions` | Get today's predictions | Required |
| `POST` | `/api/predictions/train` | Retrain ML model | Required |
| `GET` | `/api/analytics/history` | Get historical analytics data | Required |

## 🎯 Usage Guide

### For End Users
1. **Register/Login** - Create an account or use the test credentials
2. **Add Habits** - Define your daily micro-habits with optimal times and categories
3. **Log Completion** - Mark habits as completed each day with optional notes
4. **View Predictions** - See which habits you're likely to skip with risk percentages
5. **Set Reminders** - Configure notifications for high-risk habits
6. **Analyze Trends** - Review your habit performance with interactive charts

### For Developers
1. **Explore the codebase** - The project follows Flask application factory pattern
2. **Extend models** - Add new fields to database models in `/app/models/`
3. **Add new routes** - Create new API endpoints in `/app/routes/`
4. **Modify ML model** - Adjust the prediction algorithm in `/app/ml/`
5. **Customize UI** - Modify templates in `/app/templates/` and styles in `/app/static/`

## 📁 Project Structure

```
Habit-Predictor---Daily-Micro-Habit-Predictor/
├── app/                         # Flask application
│   ├── models/                  # Database models
│   │   ├── user.py             # User model
│   │   ├── habit.py            # Habit model
│   │   ├── habit_log.py        # Habit log model
│   │   └── prediction.py       # Prediction model
│   ├── routes/                 # Flask routes
│   │   ├── main.py            # Dashboard routes
│   │   ├── auth.py            # Authentication routes
│   │   ├── habits.py          # Habit management routes
│   │   ├── predictions.py     # Prediction routes
│   │   └── analytics.py       # Analytics routes
│   ├── ml/                     # Machine learning
│   │   ├── model.py           # TensorFlow model
│   │   ├── predict.py         # Prediction functions
│   │   └── train.py           # Training functions
│   ├── templates/              # HTML templates
│   │   ├── base.html          # Base template
│   │   ├── index.html         # Dashboard
│   │   ├── habits.html        # Habits page
│   │   ├── analytics.html     # Analytics page
│   │   ├── settings.html      # Settings page
│   │   ├── login.html         # Login page
│   │   └── register.html      # Registration page
│   ├── static/                 # Static assets
│   │   ├── css/
│   │   │   └── styles.css     # Main stylesheet
│   │   ├── js/
│   │   │   └── script.js      # Main JavaScript
│   │   └── images/            # Image assets
│   ├── utils/                  # Utility functions
│   │   ├── config.py          # Configuration utilities
│   │   ├── database.py        # Database utilities
│   │   └── helpers.py         # Helper functions
│   └── __init__.py            # Flask application factory
├── instance/                   # Database instance (not in version control)
├── migrations/                 # Database migration scripts
├── tests/                      # Test cases
├── requirements.txt            # Python dependencies
├── config.py                   # Flask configuration
├── init_database.py            # Database initialization script
├── run.py                      # Application entry point
├── .env                        # Environment variables (not in version control)
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🧪 Testing

Run the test suite to ensure everything is working correctly:

```bash
# Run all tests
python -m pytest tests/

# Run specific test module
python -m pytest tests/test_models.py

# Run with verbose output
python -m pytest -v tests/
```

## 🚀 Deployment

### Local Deployment
```bash
python run.py
```

### Production Deployment (Example for Heroku)
1. Create a `Procfile` with:
   ```
   web: gunicorn run:app
   ```
2. Create `runtime.txt` with your Python version:
   ```
   python-3.9.13
   ```
3. Deploy to Heroku:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TensorFlow team for the machine learning framework
- Flask community for the excellent web framework
- Tailwind CSS for the utility-first CSS framework
- Chart.js for the interactive charting library

## 📞 Support

If you have any questions or issues, please:

1. Check the [existing issues](https://github.com/yourusername/Habit-Predictor---Daily-Micro-Habit-Predictor/issues)
2. Create a [new issue](https://github.com/yourusername/Habit-Predictor---Daily-Micro-Habit-Predictor/issues/new) with detailed information

## 🏆 Project Status

This project is actively maintained. Current version: 1.0.0

---

<div align="center">
Made with ❤️ and Python
</div>


