from app import db
from datetime import datetime

class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    habit_id = db.Column(db.Integer, db.ForeignKey('habit.id'), nullable=False)
    skip_risk = db.Column(db.Float, nullable=False)  # 0.0 to 1.0
    confidence = db.Column(db.Float, nullable=False)  # 0.0 to 1.0
    generated_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Prediction {self.habit.name} - {self.skip_risk}>'