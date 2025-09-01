import numpy as np
import pandas as pd
from datetime import datetime
from app import db
from app.models import HabitLog, Prediction, Habit

def generate_predictions(user_id, habits):
    predictions = []
    
    for habit in habits:
        # Get habit completion history
        logs = HabitLog.query.filter_by(
            user_id=user_id, 
            habit_id=habit.id
        ).order_by(HabitLog.logged_at.desc()).limit(30).all()
        
        # Simple heuristic-based prediction (replace with actual ML model)
        skip_risk = calculate_skip_risk(logs, habit)
        confidence = calculate_confidence(logs)
        
        # Save prediction to database
        prediction = Prediction(
            user_id=user_id,
            habit_id=habit.id,
            skip_risk=skip_risk,
            confidence=confidence
        )
        
        db.session.add(prediction)
        predictions.append({
            'habit_id': habit.id,
            'habit_name': habit.name,
            'skip_risk': skip_risk,
            'confidence': confidence,
            'best_time': habit.best_time
        })
    
    db.session.commit()
    return predictions

def calculate_skip_risk(logs, habit):
    if not logs:
        return 0.5  # Default medium risk if no history
    
    # Calculate completion rate
    completed = sum(1 for log in logs if log.completed)
    completion_rate = completed / len(logs)
    
    # Adjust based on time of day and habit properties
    skip_risk = 1.0 - completion_rate
    
    # Increase risk for evening habits (people tend to skip them more)
    if habit.best_time == 'evening':
        skip_risk *= 1.2
    
    return min(max(skip_risk, 0.1), 0.9)  # Keep between 0.1 and 0.9

def calculate_confidence(logs):
    if not logs:
        return 0.3  # Low confidence with no data
    
    # More logs = higher confidence
    confidence = min(len(logs) / 30, 0.9)  # Cap at 0.9
    
    return max(confidence, 0.3)  # Minimum confidence of 0.3