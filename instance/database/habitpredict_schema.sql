-- habitpredict_schema.sql
-- SQLite database schema for HabitPredict application

-- Users table
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(128) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    timezone VARCHAR(50) DEFAULT 'UTC',
    notification_preferences TEXT DEFAULT '{"email": true, "push": true, "predictive": true}'
);

-- Habits table
CREATE TABLE IF NOT EXISTS habit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    best_time VARCHAR(20) DEFAULT 'anytime',
    duration INTEGER DEFAULT 5,
    category VARCHAR(50) DEFAULT 'Uncategorized',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

-- Habit logs table
CREATE TABLE IF NOT EXISTS habit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    habit_id INTEGER NOT NULL,
    completed BOOLEAN DEFAULT 0,
    logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    completion_time INTEGER, -- in minutes
    mood INTEGER, -- 1-5 scale
    difficulty INTEGER, -- 1-5 scale
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (habit_id) REFERENCES habit (id) ON DELETE CASCADE
);

-- Predictions table
CREATE TABLE IF NOT EXISTS prediction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    habit_id INTEGER NOT NULL,
    skip_risk REAL NOT NULL, -- 0.0 to 1.0
    confidence REAL NOT NULL, -- 0.0 to 1.0
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    factors TEXT, -- JSON string with factors influencing prediction
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (habit_id) REFERENCES habit (id) ON DELETE CASCADE
);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    theme VARCHAR(20) DEFAULT 'light',
    habit_view VARCHAR(20) DEFAULT 'grid',
    daily_reminder_time TIME DEFAULT '09:00:00',
    weekly_report BOOLEAN DEFAULT 1,
    data_sharing BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) DEFAULT '#4f46e5',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, name),
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_username ON user (username);
CREATE INDEX IF NOT EXISTS idx_user_email ON user (email);
CREATE INDEX IF NOT EXISTS idx_habit_user_id ON habit (user_id);
CREATE INDEX IF NOT EXISTS idx_habit_log_user_id ON habit_log (user_id);
CREATE INDEX IF NOT EXISTS idx_habit_log_habit_id ON habit_log (habit_id);
CREATE INDEX IF NOT EXISTS idx_habit_log_logged_at ON habit_log (logged_at);
CREATE INDEX IF NOT EXISTS idx_prediction_user_id ON prediction (user_id);
CREATE INDEX IF NOT EXISTS idx_prediction_habit_id ON prediction (habit_id);
CREATE INDEX IF NOT EXISTS idx_prediction_generated_at ON prediction (generated_at);
CREATE INDEX IF NOT EXISTS idx_category_user_id ON category (user_id);