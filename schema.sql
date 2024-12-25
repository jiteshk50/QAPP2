CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('Who is known as the "Iron Man of India"?', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Subhas Chandra Bose', 'c'),
('When did India gain independence from British rule?', '1947', '1950', '1948', '1946', 'a'),
('Who is the first Prime Minister of India?', 'Indira Gandhi', 'Rajendra Prasad', 'Sardar Vallabhbhai Patel', 'Jawaharlal Nehru', 'd'),
('What is the name of the Indian Parliament?', 'Lok Sabha', 'Rajya Sabha', 'Sansad', 'Vidhan Sabha', 'c'),
('How many states and union territories are there in India?', '28 states and 8 UTs', '29 states and 7 UTs', '27 states and 9 UTs','25 states and 10 UTs', 'a'),
('Who is the current President of India (as of late 2023)?', 'Droupadi Murmu', 'Ram Nath Kovind', 'Pratibha Patil', 'A. P. J. Abdul Kalam', 'a'),
('What is the national currency of India?', 'Rupee', 'Dollar', 'Pound', 'Yen', 'a'),
('Which of the following is not a fundamental right in the Indian Constitution?', 'Right to Equality', 'Right to Property', 'Right to Freedom of Speech', 'Right to Constitutional Remedies', 'b'),
('Who wrote the Indian national anthem "Jana Gana Mana"?', 'Rabindranath Tagore', 'Bankim Chandra Chatterjee', 'Sarojini Naidu', 'Subramania Bharati', 'a'),
('What is the minimum age to be a member of the Lok Sabha?', '18 years', '21 years', '25 years', '30 years', 'c');