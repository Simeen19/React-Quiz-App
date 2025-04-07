import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import QuestionDisplay from './components/QuestionDisplay';
import AnswerOptions from './components/AnswerOptions';
import Timer from './components/Timer';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizResult {
  email: string;
  name: string;
  score: number;
  total: number;
}

// const quizData: QuizQuestion[] = [
  const quizData: QuizQuestion[] = [
    {
      question: "1. Who holds the record for most runs in IPL history?",
      options: ["Rohit Sharma", "Virat Kohli", "Shikhar Dhawan", "David Warner"],
      correctAnswer: "Virat Kohli"
    },
    {
      question: "2. Who has taken most wickets in IPL history?",
      options: ["Dwayne Bravo", "Yuzvendra Chahal", "Piyush Chawla", "Bhuvneshwar Kumar"],
      correctAnswer: "Yuzvendra Chahal"
    },
    {
      question: "3. What is the highest individual score in IPL?",
      options: ["AB de Villiers 133*", "Chris Gayle 175*", "Quinton de Kock 140*", "Brendon McCullum 158*"],
      correctAnswer: "Chris Gayle 175*"
    },
    {
      question: "4. What is SRH's highest IPL total?",
      options: ["277/3", "286/6", "287/3", "263/5"],
      correctAnswer: "287/3"
    },
    {
      question: "5. How many teams never won IPL?",
      options: ["4", "1", "3", "2"],
      correctAnswer: "4"
    },
    {
      question: "6. Best bowling figures in IPL match?",
      options: ["Adam Zampa 6/19", "Alzari Joseph 6/12", "Anil Kumble 5/5", "Sohail Tanvir 6/14"],
      correctAnswer: "Sohail Tanvir 6/14"
    },
    {
      question: "7. Fastest IPL century?",
      options: ["Chris Gayle (30 balls)", "Yusuf Pathan (37)", "Travis Head (39)", "David Miller (38)"],
      correctAnswer: "Chris Gayle (30 balls)"
    },
    {
      question: "8. First IPL match was?",
      options: ["KXIP vs RR", "DC vs DD", "RCB vs KKR (2008)", "MI vs CSK"],
      correctAnswer: "RCB vs KKR (2008)"
    },
    {
      question: "9. Most sixes in IPL history?",
      options: ["MS Dhoni (252)", "Virat Kohli (276)", "Rohit Sharma (281)", "Chris Gayle (357)"],
      correctAnswer: "Chris Gayle (357)"
    },
    {
      question: "10. Longest six in IPL?",
      options: ["Robin Uthappa (120m)", "Albie Morkel (125m)", "Adam Gilchrist (122m)", "Praveen Kumar (124m)"],
      correctAnswer: "Albie Morkel (125m)"
    },
    // Questions 11-20
    {
      question: "11. Lowest team total in IPL?",
      options: ["RR - 58", "KKR - 67", "DC - 66", "RCB - 49"],
      correctAnswer: "RCB - 49"
    },
    {
      question: "12. Highest successful run chase?",
      options: ["MI - 219/6", "RR - 226/6", "KKR - 224/8", "PBKS - 262/2"],
      correctAnswer: "PBKS - 262/2"
    },
    {
      question: "13. Fastest IPL delivery?",
      options: ["Shaun Tait 157.7km/h", "Mayank Yadav 156.7", "Anrich Nortje 156.2", "Umran Malik 157"],
      correctAnswer: "Shaun Tait 157.7km/h"
    },
    {
      question: "14. Most IPL titles won?",
      options: ["CSK", "Mumbai Indians", "KKR", "RR"],
      correctAnswer: "Mumbai Indians"
    },
    {
      question: "15. When was Super Over introduced?",
      options: ["2008", "2009", "2010", "2011"],
      correctAnswer: "2009"
    },
    {
      question: "16. First Indian IPL centurion?",
      options: ["Virat Kohli", "Manish Pandey", "Rohit Sharma", "Suresh Raina"],
      correctAnswer: "Manish Pandey"
    },
    {
      question: "17. Deccan Chargers became?",
      options: ["SRH", "DC", "RR", "GT"],
      correctAnswer: "SRH"
    },
    {
      question: "18. Most catches in IPL?",
      options: ["Kieron Pollard", "Suresh Raina", "AB de Villiers", "Rohit Sharma"],
      correctAnswer: "Suresh Raina"
    },
    {
      question: "19. 2023 Emerging Player?",
      options: ["Nitish Reddy", "Rinku Singh", "Tilak Varma", "Sai Sudharsan"],
      correctAnswer: "Nitish Reddy"
    },
    {
      question: "20. Wankhede Stadium is home to?",
      options: ["CSK", "Mumbai Indians", "RCB", "DC"],
      correctAnswer: "Mumbai Indians"
    },
    // Questions 21-30
    {
      question: "21. Most IPL ducks?",
      options: ["Rohit Sharma", "Virat Kohli", "Gautam Gambhir", "Ajinkya Rahane"],
      correctAnswer: "Rohit Sharma"
    },
    {
      question: "22. RR's first winning captain?",
      options: ["Shane Watson", "Graeme Smith", "Shane Warne", "Younis Khan"],
      correctAnswer: "Shane Warne"
    },
    {
      question: "23. 2023 Fair Play winner?",
      options: ["GT", "SRH", "RR", "CSK"],
      correctAnswer: "SRH"
    },
    {
      question: "24. Most playoff matches?",
      options: ["MI", "CSK", "KKR", "RCB"],
      correctAnswer: "CSK"
    },
    {
      question: "25. Most IPL finals hosted?",
      options: ["Chinnaswamy", "Wankhede", "Eden Gardens", "Chepauk"],
      correctAnswer: "Wankhede"
    },
    {
      question: "26. First IPL MVP?",
      options: ["Shane Watson", "Sohail Tanvir", "Yusuf Pathan", "Gautam Gambhir"],
      correctAnswer: "Shane Watson"
    },
    {
      question: "27. First final MoM?",
      options: ["Rohit Sharma", "MS Dhoni", "Yusuf Pathan", "Suresh Raina"],
      correctAnswer: "Yusuf Pathan"
    },
    {
      question: "28. Most teams in a season?",
      options: ["2011", "2008", "2020", "2019"],
      correctAnswer: "2011"
    },
    {
      question: "29. 'Korbo Lorbo Jeetbo' is slogan of?",
      options: ["DC", "RR", "KKR", "SRH"],
      correctAnswer: "KKR"
    },
    {
      question: "30. Most maiden overs in IPL?",
      options: ["Malinga", "Praveen Kumar", "Bhuvi", "Bumrah"],
      correctAnswer: "Praveen Kumar"
    },
    // Questions 31-40
    {
      question: "31. 2009 IPL winners?",
      options: ["GL", "PWI", "Deccan Chargers", "KTK"],
      correctAnswer: "Deccan Chargers"
    },
    {
      question: "32. Most balls faced in IPL?",
      options: ["Warner", "Rohit", "Dhawan", "Kohli"],
      correctAnswer: "Kohli"
    },
    {
      question: "33. 2016 final MoM?",
      options: ["Kohli", "Ben Cutting", "Warner", "Gayle"],
      correctAnswer: "Ben Cutting"
    },
    {
      question: "34. Best season economy rate?",
      options: ["Narine 6.00", "Rashid 6.13", "Nortje 6.16", "Narine 5.47"],
      correctAnswer: "Narine 5.47"
    },
    {
      question: "35. Most IPL games umpired?",
      options: ["S Ravi", "S Ramesh", "Anil C", "Nitin M"],
      correctAnswer: "S Ramesh"
    },
    {
      question: "36. Strategic timeout introduced in?",
      options: ["2008", "2009", "2011", "2016"],
      correctAnswer: "2009"
    },
    {
      question: "37. Highest strike rate (min 50)?",
      options: ["Cummins", "Russell", "Livingstone", "Pollard"],
      correctAnswer: "Cummins"
    },
    {
      question: "38. Most Player of Tournament awards?",
      options: ["Kohli", "Russell", "Watson", "Warner"],
      correctAnswer: "Watson"
    },
    {
      question: "39. 'Play Bold' is slogan of?",
      options: ["RR", "RCB", "DC", "PBKS"],
      correctAnswer: "RCB"
    },
    {
      question: "40. Most 4-wicket hauls?",
      options: ["Bumrah", "Malinga", "Narine", "Chahal"],
      correctAnswer: "Narine"
    },
    // Questions 41-50
    {
      question: "41. Initially owned by Vijay Mallya?",
      options: ["MI", "CSK", "RCB", "PBKS"],
      correctAnswer: "RCB"
    },
    {
      question: "42. Least wins in IPL history?",
      options: ["DC", "PBKS", "SRH", "PWI/RPSG"],
      correctAnswer: "PWI/RPSG"
    },
    {
      question: "43. Super overs in IPL 2020?",
      options: ["3", "5", "2", "4"],
      correctAnswer: "5"
    },
    {
      question: "44. Oldest IPL player?",
      options: ["Brad Hogg", "Pravin Tambe", "Murali", "Imran Tahir"],
      correctAnswer: "Pravin Tambe"
    },
    {
      question: "45. Most season sixes awards?",
      options: ["Russell", "Gayle", "Pollard", "Warner"],
      correctAnswer: "Gayle"
    },
    {
      question: "46. MI's final appearances?",
      options: ["7", "6", "5", "8"],
      correctAnswer: "6"
    },
    {
      question: "47. 10 teams in season?",
      options: ["2010", "2011", "2022", "2023"],
      correctAnswer: "2011"
    },
    {
      question: "48. First IPL auction's most expensive?",
      options: ["Dhoni", "Yuvraj", "Symonds", "Ponting"],
      correctAnswer: "Dhoni"
    },
    {
      question: "49. 2022 MVP?",
      options: ["Warner", "Buttler", "Hardik", "Rashid"],
      correctAnswer: "Buttler"
    },
    {
      question: "50. Most consecutive losses?",
      options: ["DC", "RCB", "Deccan Chargers", "PBKS"],
      correctAnswer: "Deccan Chargers"
    },
    // Questions 51-60
    {
      question: "51. Best bowling average (min 10)?",
      options: ["Tye 11.5", "Malinga 13.56", "Harshal 14.11", "Narine 11.85"],
      correctAnswer: "Narine 11.85"
    },
    {
      question: "52. First IPL opening venue?",
      options: ["Wankhede", "Chinnaswamy", "Eden", "Chepauk"],
      correctAnswer: "Chinnaswamy"
    },
    {
      question: "53. Most Player of Match awards?",
      options: ["Gayle", "ABD", "Rohit", "Dhoni"],
      correctAnswer: "ABD"
    },
    {
      question: "54. Year of first mini-auction?",
      options: ["2010", "2014", "2023", "2019"],
      correctAnswer: "2023"
    },
    {
      question: "55. Highest win percentage?",
      options: ["MI", "CSK", "KKR", "RR"],
      correctAnswer: "CSK"
    },
    {
      question: "56. First overseas IPL winning captain?",
      options: ["Warner", "Warne", "Gilchrist", "Ponting"],
      correctAnswer: "Warne"
    },
    {
      question: "57. Most stumpings?",
      options: ["Karthik", "Dhoni", "Uthappa", "Saha"],
      correctAnswer: "Dhoni"
    },
    {
      question: "58. Most consecutive wins?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "13"
    },
    {
      question: "59. Most last-ball wins?",
      options: ["MI", "CSK", "RR", "KKT"],
      correctAnswer: "CSK"
    },
    {
      question: "60. First Purple Cap winner?",
      options: ["RP Singh", "Tanvir", "Malinga", "Chawla"],
      correctAnswer: "RP Singh"
    },
    // Questions 61-70
    {
      question: "61. Most catches in a season?",
      options: ["Pollard", "Raina", "Miller", "Warner"],
      correctAnswer: "Warner"
    },
    {
      question: "62. Most IPL matches hosted?",
      options: ["Eden", "Chinnaswamy", "Wankhede", "Kotla"],
      correctAnswer: "Kotla"
    },
    {
      question: "63. Most boundaries (4s+6s)?",
      options: ["Kohli", "Warner", "Dhawan", "Gayle"],
      correctAnswer: "Gayle"
    },
    {
      question: "64. New teams in 2011?",
      options: ["PWI & KTK", "GL & RPS", "LSG & GT", "SRH & DC"],
      correctAnswer: "PWI & KTK"
    },
    {
      question: "65. Most consecutive 50+ scores?",
      options: ["Warner", "Kohli", "Rahul", "Sehwag"],
      correctAnswer: "Kohli"
    },
    {
      question: "66. Lowest team economy rate?",
      options: ["MI", "CSK", "SRH", "RR"],
      correctAnswer: "CSK"
    },
    {
      question: "67. Most keeper dismissals?",
      options: ["Karthik", "Dhoni", "Saha", "de Kock"],
      correctAnswer: "Dhoni"
    },
    {
      question: "68. IPL final outside India?",
      options: ["2009", "2014", "2020", "2021"],
      correctAnswer: "2009"
    },
    {
      question: "69. First with 5 straight 50+ scores?",
      options: ["Kohli", "Warner", "Sehwag", "Buttler"],
      correctAnswer: "Buttler"
    },
    {
      question: "70. Highest team strike rate?",
      options: ["RCB", "PBKS", "SRH", "CSK"],
      correctAnswer: "SRH"
    },
    // Questions 71-80
    {
      question: "71. Most no balls bowled?",
      options: ["Malinga", "Sreesanth", "Bumrah", "Yadav"],
      correctAnswer: "Sreesanth"
    },
    {
      question: "72. Strategic timeout rule changed in?",
      options: ["2016", "2018", "2022", "2023"],
      correctAnswer: "2022"
    },
    {
      question: "73. Highest chase strike rate?",
      options: ["Russell", "Pollard", "Pathan", "Cummins"],
      correctAnswer: "Cummins"
    },
    {
      question: "74. First Indian Orange Cap?",
      options: ["Tendulkar", "Kohli", "Gambhir", "Rohit"],
      correctAnswer: "Tendulkar"
    },
    {
      question: "75. Most 4-wkt hauls in season?",
      options: ["Malinga", "Faulkner", "Narine", "Chahal"],
      correctAnswer: "Faulkner"
    },
    {
      question: "76. Most playoff appearances?",
      options: ["MI", "CSK", "RCB", "KKR"],
      correctAnswer: "CSK"
    },
    {
      question: "77. Most dot balls?",
      options: ["Bhuvi", "Bumrah", "Malinga", "Ashwin"],
      correctAnswer: "Bhuvi"
    },
    {
      question: "78. Impact Player rule introduced?",
      options: ["2021", "2022", "2023", "2024"],
      correctAnswer: "2023"
    },
    {
      question: "79. Fastest 50 in IPL final?",
      options: ["Pollard", "Kishan", "Pathan", "Russell"],
      correctAnswer: "Kishan"
    },
    {
      question: "80. Most extras conceded?",
      options: ["DC", "KKR", "RCB", "PBKS"],
      correctAnswer: "RCB"
    },
    // Questions 81-90
    {
      question: "81. Most catches in a final?",
      options: ["Pollard", "Raina", "Cutting", "du Plessis"],
      correctAnswer: "Cutting"
    },
    {
      question: "82. DRS introduced in?",
      options: ["2016", "2018", "2020", "2022"],
      correctAnswer: "2018"
    },
    {
      question: "83. Most playoff runs?",
      options: ["Raina", "Kohli", "Rohit", "Dhawan"],
      correctAnswer: "Raina"
    },
    {
      question: "84. Most tied matches?",
      options: ["RR", "MI", "CSK", "DC"],
      correctAnswer: "RR"
    },
    {
      question: "85. Lowest season economy?",
      options: ["Narine", "Rashid", "Kumble", "Malinga"],
      correctAnswer: "Narine"
    },
    {
      question: "86. Most super over wins?",
      options: ["MI", "KKR", "CSK", "RR"],
      correctAnswer: "KKR"
    },
    {
      question: "87. Most Man of Series awards?",
      options: ["Watson", "Russell", "Warner", "Kohli"],
      correctAnswer: "Watson"
    },
    {
      question: "88. First IPL final venue?",
      options: ["Wankhede", "DY Patil", "Eden", "Chepauk"],
      correctAnswer: "DY Patil"
    },
    {
      question: "89. Most IPL hat-tricks?",
      options: ["Mishra", "Malinga", "Chahal", "Narine"],
      correctAnswer: "Mishra"
    },
    {
      question: "90. First IPL auction year?",
      options: ["2007", "2008", "2009", "2010"],
      correctAnswer: "2008"
    }
  ];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [participantName, setParticipantName] = useState<string>('');
  const [participantEmail, setParticipantEmail] = useState<string>('');
  const [results, setResults] = useState<QuizResult[]>([]);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [organizerKey, setOrganizerKey] = useState<string>('');
  const [resetTimer, setResetTimer] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentQuestion = quizData[currentIndex];

  const handleAnswerSelect = (answer: string) => {
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

  const submitToNoCodeAPI = async (data: QuizResult) => {
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/simeen/google_sheets/vgSSWVDdxjcwyhVL?tabId=Sheet1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            [ // This is the 2D array format NoCode API expects
              new Date().toISOString(), // Timestamp
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
          const newResult: QuizResult = {
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
            // You could add retry logic here or save to localStorage
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
            <Timer seconds={12} onTimeUp={handleTimeUp} key={resetTimer.toString()} />
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
      <footer style={{
        marginTop: "2rem",
        textAlign: "center",
        color: "#fff",
        fontSize: "0.9rem"
      }}>
        © Created by Simeen Ali 2025
      </footer>
    </div>
  );
};

export default App;