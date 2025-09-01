from app import db
from datetime import datetime

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    best_time = db.Column(db.String(20))  # morning, afternoon, evening, anytime
    duration = db.Column(db.Integer)  # in minutes
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    habit_logs = db.relationship('HabitLog', backref='habit', lazy='dynamic')
    predictions = db.relationship('Prediction', backref='habit', lazy='dynamic')
    
    def __repr__(self):
        return f'<Habit {self.name}>'