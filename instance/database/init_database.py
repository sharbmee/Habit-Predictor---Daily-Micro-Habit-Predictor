# init_database.py
import sqlite3
import os
from datetime import datetime, timedelta

def init_database():
    # Create instance directory if it doesn't exist
    os.makedirs('instance', exist_ok=True)
    
    # Connect to SQLite database (creates if doesn't exist)
    conn = sqlite3.connect('instance/habitpredict.db')
    cursor = conn.cursor()
    
    # Read and execute schema SQL
    with open('habitpredict_schema.sql', 'r') as f:
        schema_sql = f.read()
    
    cursor.executescript(schema_sql)
    
    # Read and execute sample data SQL
    with open('sample_data.sql', 'r') as f:
        sample_data_sql = f.read()
    
    cursor.executescript(sample_data_sql)
    
    # Commit changes and close connection
    conn.commit()
    conn.close()
    
    print("Database initialized successfully!")
    print("Location: instance/habitpredict.db")

if __name__ == '__main__':
    init_database()