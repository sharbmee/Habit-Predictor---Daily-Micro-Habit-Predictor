from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required, current_user
from app import db
from app.models import Habit, HabitLog, Prediction
from datetime import datetime, timedelta

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
@main_bp.route('/dashboard')
@login_required
def dashboard():
    # Get user's habits
    habits = Habit.query.filter_by(user_id=current_user.id).all()
    
    # Get today's predictions
    today = datetime.utcnow().date()
    predictions = Prediction.query.filter(
        Prediction.user_id == current_user.id,
        db.func.date(Prediction.generated_at) == today
    ).all()
    
    # Get recent activity
    recent_activity = HabitLog.query.filter_by(
        user_id=current_user.id
    ).order_by(HabitLog.logged_at.desc()).limit(5).all()
    
    # Calculate stats
    total_habits = len(habits)
    completed_today = HabitLog.query.filter(
        HabitLog.user_id == current_user.id,
        db.func.date(HabitLog.logged_at) == today,
        HabitLog.completed == True
    ).count()
    
    # Find highest risk habit
    high_risk_habit = None
    if predictions:
        high_risk_habit = max(predictions, key=lambda x: x.skip_risk)
    
    return render_template('index.html', 
                         habits=habits,
                         predictions=predictions,
                         recent_activity=recent_activity,
                         total_habits=total_habits,
                         completed_today=completed_today,
                         high_risk_habit=high_risk_habit)