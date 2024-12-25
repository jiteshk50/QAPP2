from flask import Flask, render_template, request, redirect, g, url_for
import sqlite3

app = Flask(__name__)
DATABASE = 'quiz.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        
        # Check if 'questions' table exists by querying the sqlite_master table
        cur = db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='questions';")
        table_exists = cur.fetchone()

        if not table_exists:  # If the 'questions' table doesn't exist, create it
            with app.open_resource('schema.sql', mode='r') as f:
                db.cursor().executescript(f.read())
            db.commit()

@app.route('/')  # Instruction/Consent page
def instructions():
    return render_template('instructions.html')

@app.route('/quiz') # Quiz page
def quiz():  # Corrected function name
    db = get_db()
    cur = db.execute("SELECT * FROM questions")
    questions = cur.fetchall()
    return render_template('index.html', questions=questions)

@app.route('/result', methods=['POST'])
def result():
    if request.method == 'POST':
        user_answers = request.form
        processed_answers = {}
        for question, answer in user_answers.items():
            if question.startswith('q'):
                try:
                    processed_answers[int(question[1:])] = answer
                except ValueError:
                    pass

        db = get_db()
        cur = db.execute("SELECT id, correct_answer FROM questions")
        correct_answers_db = cur.fetchall()
        correct_answers = {row['id']: row['correct_answer'] for row in correct_answers_db}

        score = 0
        for question, answer in processed_answers.items():
            if answer == correct_answers.get(question):
                score += 1

        total_questions = len(correct_answers)
        db.execute("INSERT INTO results (score, total_questions) VALUES (?, ?)", (score, total_questions))
        db.commit()

        return redirect(f'/show_result?score={score}&totalQuestions={total_questions}')
    return redirect('/')

@app.route('/show_result')
def show_result():
    score = request.args.get('score')
    total_questions = request.args.get('totalQuestions')
    return render_template('result.html', score=score, total_questions=total_questions)

if __name__ == '__main__':
   # init_db()
    app.run(debug=True)
