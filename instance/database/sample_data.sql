-- sample_data.sql
-- Sample data for HabitPredict application

-- Insert a test user
INSERT INTO user (username, email, password_hash) 
VALUES ('testuser', 'test@example.com', 'pbkdf2:sha256:260000$O87nanbS$...');

-- Get the user ID
-- Note: In practice, you'd use the actual ID returned from the insert
-- For this example, we'll assume the user ID is 1

-- Insert some categories
INSERT INTO category (user_id, name, color) VALUES
(1, 'Health & Wellness', '#10b981'),
(1, 'Personal Growth', '#8b5cf6'),
(1, 'Productivity', '#3b82f6');

-- Insert some habits
INSERT INTO habit (user_id, name, description, best_time, duration, category) VALUES
(1, 'Drink water', 'Drink 8 glasses of water daily', 'morning', 2, 'Health & Wellness'),
(1, 'Morning meditation', '10 minutes of mindfulness meditation', 'morning', 10, 'Health & Wellness'),
(1, 'Evening reading', 'Read before bed', 'evening', 15, 'Personal Growth'),
(1, 'Exercise', '30 minutes of physical activity', 'afternoon', 30, 'Health & Wellness'),
(1, 'Journaling', 'Daily reflection and journaling', 'evening', 10, 'Personal Growth');

-- Insert habit logs for the past week
INSERT INTO habit_log (user_id, habit_id, completed, logged_at, notes, completion_time, mood, difficulty) VALUES
-- Drink water logs
(1, 1, 1, datetime('now', '-6 days', '08:30:00'), 'Drank 2 glasses', 2, 4, 1),
(1, 1, 1, datetime('now', '-5 days', '09:15:00'), 'Finished all 8 glasses', 2, 5, 1),
(1, 1, 1, datetime('now', '-4 days', '08:45:00'), NULL, 2, 4, 1),
(1, 1, 0, datetime('now', '-3 days'), 'Forgot to track', NULL, 3, 2),
(1, 1, 1, datetime('now', '-2 days', '10:00:00'), 'Drank 6 glasses', 2, 4, 1),
(1, 1, 1, datetime('now', '-1 days', '09:30:00'), NULL, 2, 5, 1),
(1, 1, 1, datetime('now', '08:00:00'), 'Started early today', 2, 5, 1),

-- Meditation logs
(1, 2, 1, datetime('now', '-6 days', '07:00:00'), 'Focused session', 10, 4, 2),
(1, 2, 1, datetime('now', '-5 days', '07:15:00'), NULL, 10, 3, 2),
(1, 2, 0, datetime('now', '-4 days'), 'Overslept', NULL, 2, 3),
(1, 2, 1, datetime('now', '-3 days', '07:05:00'), 'Good focus today', 10, 4, 2),
(1, 2, 1, datetime('now', '-2 days', '07:10:00'), NULL, 10, 4, 2),
(1, 2, 1, datetime('now', '-1 days', '07:20:00'), 'Extended to 15 min', 15, 5, 2),
(1, 2, 1, datetime('now', '07:05:00'), NULL, 10, 4, 2),

-- Reading logs
(1, 3, 1, datetime('now', '-6 days', '21:30:00'), 'Read 20 pages', 20, 4, 1),
(1, 3, 1, datetime('now', '-5 days', '22:00:00'), NULL, 15, 3, 1),
(1, 3, 0, datetime('now', '-4 days'), 'Too tired', NULL, 2, 2),
(1, 3, 1, datetime('now', '-3 days', '21:45:00'), 'Interesting chapter', 15, 5, 1),
(1, 3, 1, datetime('now', '-2 days', '22:15:00'), NULL, 15, 4, 1),
(1, 3, 0, datetime('now', '-1 days'), 'Watched movie instead', NULL, 3, 2),
(1, 3, 1, datetime('now', '21:00:00'), 'Started early', 20, 5, 1);

-- Insert some predictions
INSERT INTO prediction (user_id, habit_id, skip_risk, confidence, generated_at, factors) VALUES
(1, 1, 0.15, 0.85, datetime('now'), '{"completion_rate": 0.86, "recent_miss": 1, "time_consistency": 0.9}'),
(1, 2, 0.25, 0.78, datetime('now'), '{"completion_rate": 0.71, "recent_miss": 2, "time_consistency": 0.8}'),
(1, 3, 0.45, 0.65, datetime('now'), '{"completion_rate": 0.57, "recent_miss": 3, "time_consistency": 0.6}'),
(1, 4, 0.65, 0.72, datetime('now'), '{"completion_rate": 0.4, "recent_miss": 4, "time_consistency": 0.5}'),
(1, 5, 0.35, 0.68, datetime('now'), '{"completion_rate": 0.63, "recent_miss": 2, "time_consistency": 0.7}');

-- Insert user settings
INSERT INTO user_settings (user_id, theme, habit_view, daily_reminder_time, weekly_report, data_sharing) 
VALUES (1, 'light', 'grid', '09:00:00', 1, 0);