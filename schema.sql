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
('Which Article of the Indian Constitution defines the "Union of India"?', 'Article 1', 'Article 2', 'Article 3', 'Article 4', 'a'),
('Who among the following is NOT eligible to become the President of India?', 'A citizen of India', 'A member of the Union Public Service Commission', 'A member of the Rajya Sabha', 'A person who is above 35 years of age', 'c'),
('The Directive Principles of State Policy are borrowed from the Constitution of:', 'UK', 'USA', 'Ireland', 'Canada', 'c'),
('The President of India can be removed from office by the process of:', 'Impeachment', 'Dissolution', 'Resignation', 'Recalling', 'a'),
('Which of the following is NOT a part of the Union Executive?', 'Prime Minister', 'Council of Ministers', 'Parliament', 'President', 'c'),
('The Constitution of India came into force on:', '26th January 1950', '15th August 1947', '26th November 1949', '15th August 1950', 'a'),
('The concept of Judicial Review in India was borrowed from the Constitution of:', 'USA', 'UK', 'Canada', 'Australia', 'a'),
('The Constitution of India was adopted on:', '26th November 1949', '15th August 1947', '26th January 1950', '15th August 1950', 'a'),
('Who among the following is responsible for the approval of a Bill in the Parliament?', 'Speaker', 'Prime Minister', 'President', 'Rajya Sabha', 'a'),
('The Supreme Court of India has the power of judicial review under:', 'Article 32', 'Article 13', 'Article 368', 'Article 356', 'b'),
('The Union List, the State List, and the Concurrent List are contained in which schedule of the Indian Constitution?', '7th', '8th', '9th', '10th', 'a'),
('Which of the following is the "fundamental duty" of every Indian citizen under the Constitution?', 'Right to vote', 'Right to property', 'Right to education', 'To safeguard public property and to abjure violence', 'd'),
('The National Emergency in India can be proclaimed under which Article of the Constitution?', 'Article 352', 'Article 356', 'Article 360', 'Article 368', 'a'),
('Which schedule of the Indian Constitution contains provisions related to anti-defection law?', '10th Schedule', '9th Schedule', '7th Schedule', '12th Schedule', 'a'),
('The Vice-President of India is elected by:', 'The Lok Sabha', 'The Rajya Sabha', 'An electoral college consisting of members of both houses of Parliament', 'The people of India', 'c'),
('Who is the first woman Prime Minister of India?', 'Indira Gandhi', 'Sarojini Naidu', 'Pratibha Patil', 'Sonia Gandhi', 'a'),
('Which of the following is a "unique feature" of the Indian Parliament?', 'Bicameral legislature', 'The President as a Member', 'Unicameral legislature', 'None of the above', 'b'),
('The power to dissolve the Lok Sabha lies with:', 'The Speaker', 'The Prime Minister', 'The President', 'The Council of Ministers', 'c'),
('The Parliament of India is composed of:', 'Lok Sabha, Rajya Sabha, and the President', 'Lok Sabha and the President', 'Rajya Sabha and the President', 'Lok Sabha and Rajya Sabha', 'a'),
('Under which of the following Articles, the President of India can promulgate ordinances?', 'Article 123', 'Article 32', 'Article 74', 'Article 356', 'a');
