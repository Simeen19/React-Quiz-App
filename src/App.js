import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import QuestionDisplay from './components/QuestionDisplay';
import AnswerOptions from './components/AnswerOptions';
import Timer from './components/Timer';

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8"
  }
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [participantName, setParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [results, setResults] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [organizerKey, setOrganizerKey] = useState('');
  const [resetTimer, setResetTimer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentQuestion = quizData[currentIndex];

  const handleAnswerSelect = (answer) => {
    if (!currentQuestion || selectedAnswer || isTimeUp) return;
    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => goToNextQuestion(), 1000);
  };

  const handleTimeUp = () => {
    if (!selectedAnswer && !isTimeUp) {
      setIsTimeUp(true);
      setTimeout(() => goToNextQuestion(), 1000);
    }
  };

  const submitToNoCodeAPI = async (data) => {
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/simeen/google_sheets/vgSSWVDdxjcwyhVL?tabId=Sheet1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            [
              new Date().toISOString(),
              data.email,
              data.name,
              data.score.toString(),
              data.total.toString()
            ]
          ]),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting to NoCode API:", error);
      throw error;
    }
  };

  const goToNextQuestion = async () => {
    if (currentIndex + 1 < quizData.length) {
      setSelectedAnswer(null);
      setIsTimeUp(false);
      setResetTimer(prev => !prev);
      setCurrentIndex(prev => prev + 1);
    } else {
      if (!showScore) {
        const alreadySubmitted = results.some(r => r.email === participantEmail);
        if (!alreadySubmitted) {
          const newResult = {
            email: participantEmail,
            name: participantName,
            score: score,
            total: quizData.length
          };

          setResults(prev => [...prev, newResult]);
          
          try {
            await submitToNoCodeAPI(newResult);
            console.log("Data successfully submitted to Google Sheets");
          } catch (error) {
            console.error("Failed to submit to Google Sheets, saving locally only");
          }
        }
        setShowScore(true);
      }
    }
  };

  const handleOrganizerCheck = () => {
    if (organizerKey === 'iplauction2025') {
      setIsOrganizer(true);
      setOrganizerKey('');
      alert("Organizer access granted.");
    } else {
      alert("Invalid key. Try again.");
    }
  };

  const downloadAllResults = () => {
    const header = "Timestamp,Email,Name,Score,Total\n";
    const rows = results.map(r => 
      `${new Date().toISOString()},${r.email},${r.name},${r.score},${r.total}`
    ).join("\n");
    const csv = header + rows;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "all_quiz_results.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleStartQuiz = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!participantName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!participantEmail.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!emailRegex.test(participantEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const previousResult = results.find(r => r.email === participantEmail);
    if (previousResult) {
      alert("You have already taken the quiz.");
    } else {
      setHasStarted(true);
    }
  };

  if (!currentQuestion && hasStarted && !showScore) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        <h2>Quiz Error</h2>
        <p>No questions available or invalid question index.</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#121212",
      color: "#f1f1f1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: isMobile ? "1rem" : "2rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: isMobile ? "90%" : "600px",
        padding: isMobile ? "1rem" : "2rem",
        borderRadius: "12px",
        backgroundColor: "#1e1e1e",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        textAlign: "center"
      }}>
        <h1 style={{ marginBottom: "1.5rem", color: "#fff" }}>E-cell IARE</h1>
        <h2 style={{ marginBottom: "1.5rem", color: "#fff" }}>🏏IPL Auction Quiz</h2>
        
        {!hasStarted ? (
          <>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Enter your name"
              style={{
                padding: "0.8rem",
                width: "100%",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "1px solid #444",
                marginBottom: "1rem",
                backgroundColor: "#2a2a2a",
                color: "#fff"
              }}
            />
            <input
              type="email"
              value={participantEmail}
              onChange={(e) => setParticipantEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                padding: "0.8rem",
                width: "100%",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "1px solid #444",
                marginBottom: "1rem",
                backgroundColor: "#2a2a2a",
                color: "#fff"
              }}
            />
            <button
              onClick={handleStartQuiz}
              disabled={!participantName.trim() || !participantEmail.trim()}
              style={{
                padding: "0.7rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#03dac6",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Start Quiz
            </button>
            
            <div style={{ marginTop: "2rem" }}>
              <input
                type="password"
                value={organizerKey}
                onChange={(e) => setOrganizerKey(e.target.value)}
                placeholder="Organizer passcode"
                style={{
                  padding: "0.6rem",
                  width: "60%",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  backgroundColor: "#2a2a2a",
                  color: "#fff"
                }}
              />
              <button
                onClick={handleOrganizerCheck}
                style={{
                  marginLeft: "1rem",
                  padding: "0.6rem 1rem",
                  backgroundColor: "#bb86fc",
                  color: "#000",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Verify
              </button>
            </div>
          </>
        ) : showScore ? (
          <div>
            <h2>Thank you for participating, {participantName}!</h2>
            <h3 style={{ fontSize: "2rem", color: "#03dac6" }}>
              {score} / {quizData.length}
            </h3>
          </div>
        ) : currentQuestion ? (
          <>
            <Timer seconds={30} onTimeUp={handleTimeUp} key={resetTimer.toString()} />
            <QuestionDisplay question={currentQuestion.question} />
            
            {!isTimeUp && !selectedAnswer && (
              <AnswerOptions 
                options={currentQuestion.options} 
                onSelect={handleAnswerSelect} 
              />
            )}
            
            {selectedAnswer && (
              <p style={{ marginTop: "1rem" }}>
                You selected: <strong>{selectedAnswer}</strong> — {selectedAnswer === currentQuestion.correctAnswer ? "✅ Correct!" : "❌ Wrong"}
              </p>
            )}
            
            {isTimeUp && !selectedAnswer && (
              <p style={{ color: "#ff5252", marginTop: "1rem" }}>
                ⏰ Time's up! You didn't answer.
              </p>
            )}
          </>
        ) : null}
        
        {isOrganizer && results.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={downloadAllResults}
              style={{
                padding: "0.7rem 1.5rem",
                backgroundColor: "#ff9800",
                color: "#000",
                fontWeight: "bold",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              📥 Download All Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;