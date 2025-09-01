from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app import db
from app.models import Prediction, Habit
from app.ml.predict import generate_predictions
from datetime import datetime

predictions_bp = Blueprint('predictions', __name__)

@predictions_bp.route('/api/predictions')
@login_required
def get_predictions():
    # Generate predictions for today
    habits = Habit.query.filter_by(user_id=current_user.id).all()
    predictions = generate_predictions(current_user.id, habits)
    
    return jsonify(predictions)

@predictions_bp.route('/api/predictions/history')
@login_required
def prediction_history():
    # Get prediction history for analytics
    predictions = Prediction.query.filter_by(
        user_id=current_user.id
    ).order_by(Prediction.generated_at.desc()).limit(30).all()
    
    history_data = [{
        'date': p.generated_at.strftime('%Y-%m-%d'),
        'habit': p.habit.name,
        'skip_risk': p.skip_risk,
        'confidence': p.confidence
    } for p in predictions]
    
    return jsonify(history_data)