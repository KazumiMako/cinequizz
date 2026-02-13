import React, { useState, useEffect, useRef } from 'react';

const MOVIES = [
  { title: "Le Parrain", answer: "le parrain", image: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
  { title: "Pulp Fiction", answer: "pulp fiction", image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
  { title: "Inception", answer: "inception", image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
  { title: "Matrix", answer: "matrix", image: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
  { title: "Star Wars", answer: "star wars", image: "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg" },
  { title: "Gladiateur", answer: "gladiateur", image: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
  { title: "Titanic", answer: "titanic", image: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg" },
  { title: "Avengers", answer: "avengers", image: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" },
  { title: "Jurassic Park", answer: "jurassic park", image: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg" },
  { title: "Fight Club", answer: "fight club", image: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg" }
];

export default function MovieQuiz() {
  const [screen, setScreen] = useState('welcome'); // welcome, game, leaderboard
  const [pseudo, setPseudo] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [blurLevel, setBlurLevel] = useState(20);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  const timerRef = useRef(null);
  const blurTimerRef = useRef(null);

  // Load leaderboard on mount
  useEffect(() => {
    loadLeaderboard();
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (blurTimerRef.current) clearInterval(blurTimerRef.current);
    };
  }, []);

  const loadLeaderboard = async () => {
    try {
      const result = await window.storage.get('movie-quiz-leaderboard', true);
      if (result && result.value) {
        setLeaderboard(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No leaderboard found, starting fresh');
      setLeaderboard([]);
    }
  };

  const saveLeaderboard = async (newLeaderboard) => {
    try {
      await window.storage.set('movie-quiz-leaderboard', JSON.stringify(newLeaderboard), true);
    } catch (error) {
      console.error('Error saving leaderboard:', error);
    }
  };

  const startGame = () => {
    if (pseudo.trim()) {
      setScreen('game');
      startQuestion();
    }
  };

  const startQuestion = () => {
    // Clear any existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (blurTimerRef.current) clearInterval(blurTimerRef.current);
    
    setAnswer('');
    setBlurLevel(20);
    setTimeElapsed(0);
    setFeedback('');
    setHasAnswered(false);

    // Timer for blur effect (decreases over 10 seconds)
    blurTimerRef.current = setInterval(() => {
      setBlurLevel(prev => Math.max(0, prev - 0.2));
    }, 100);

    // Timer for elapsed time
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 0.1;
        if (newTime >= 10) {
          clearInterval(timerRef.current);
          clearInterval(blurTimerRef.current);
          // Auto-skip after 10 seconds
          handleTimeout();
          return 10;
        }
        return newTime;
      });
    }, 100);
  };

  const handleTimeout = () => {
    if (hasAnswered) return;
    
    const currentMovie = MOVIES[currentQuestion];
    setFeedback(`⏱️ Temps écoulé ! C'était "${currentMovie.title}"`);
    setHasAnswered(true);

    // Move to next question or show leaderboard
    setTimeout(() => {
      if (currentQuestion < MOVIES.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        startQuestion();
      } else {
        finishGame();
      }
    }, 2000);
  };

  const checkAnswer = () => {
    if (hasAnswered) return;

    clearInterval(timerRef.current);
    clearInterval(blurTimerRef.current);

    const currentMovie = MOVIES[currentQuestion];
    const normalizedAnswer = answer.toLowerCase().trim();
    const normalizedCorrect = currentMovie.answer.toLowerCase();

    if (normalizedAnswer === normalizedCorrect || normalizedAnswer.includes(normalizedCorrect) || normalizedCorrect.includes(normalizedAnswer)) {
      // Calculate points: max 1000 points at 0 seconds, min 100 points at 10 seconds
      const points = Math.round(Math.max(100, 1000 - (timeElapsed * 90)));
      setScore(prev => prev + points);
      setFeedback(`✅ Correct ! +${points} points (${timeElapsed.toFixed(1)}s)`);
    } else {
      setFeedback(`❌ Raté ! C'était "${currentMovie.title}"`);
    }

    setHasAnswered(true);

    // Move to next question or show leaderboard
    setTimeout(() => {
      if (currentQuestion < MOVIES.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        startQuestion();
      } else {
        finishGame();
      }
    }, 2000);
  };

  const finishGame = async () => {
    const newEntry = { pseudo, score, date: new Date().toISOString() };
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep top 10
    
    setLeaderboard(updatedLeaderboard);
    await saveLeaderboard(updatedLeaderboard);
    setScreen('leaderboard');
  };

  const resetGame = () => {
    setScreen('welcome');
    setPseudo('');
    setCurrentQuestion(0);
    setScore(0);
    setAnswer('');
    setBlurLevel(20);
    setTimeElapsed(0);
    setFeedback('');
    setHasAnswered(false);
  };

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
          <h1 className="text-5xl font-bold text-white mb-2 text-center">🎬 CinéQuiz</h1>
          <p className="text-purple-200 text-center mb-8">Devine le film avant qu'il ne soit dévoilé !</p>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Entre ton pseudo..."
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && startGame()}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border-2 border-white/30 focus:border-purple-400 focus:outline-none text-lg"
              maxLength={20}
            />
            
            <button
              onClick={startGame}
              disabled={!pseudo.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              Commencer le Quiz
            </button>
          </div>

          {leaderboard.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/20">
              <h3 className="text-white font-semibold mb-3 text-center">🏆 Top 3</h3>
              {leaderboard.slice(0, 3).map((entry, index) => (
                <div key={index} className="flex justify-between text-white/80 text-sm mb-2">
                  <span>{index + 1}. {entry.pseudo}</span>
                  <span className="font-bold">{entry.score} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Game Screen
  if (screen === 'game') {
    const currentMovie = MOVIES[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 text-white">
            <div>
              <span className="text-purple-300 text-sm">Question {currentQuestion + 1}/10</span>
              <div className="font-bold text-2xl">{pseudo}</div>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 text-3xl font-bold">{score}</div>
              <div className="text-purple-300 text-sm">points</div>
            </div>
          </div>

          {/* Image */}
          <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <img
              src={currentMovie.image}
              alt="Film mystère"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: `blur(${blurLevel}px)` }}
              crossOrigin="anonymous"
            />
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-mono">
              {timeElapsed.toFixed(1)}s / 10s
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-100"
              style={{ width: `${(timeElapsed / 10) * 100}%` }}
            />
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Quel est ce film ?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              disabled={hasAnswered}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border-2 border-white/30 focus:border-purple-400 focus:outline-none text-lg disabled:opacity-50"
            />
            
            <button
              onClick={checkAnswer}
              disabled={!answer.trim() || hasAnswered}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Valider ma réponse
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`mt-4 p-4 rounded-xl text-center font-bold text-lg ${
              feedback.includes('✅') ? 'bg-green-500/30 text-green-100' : 'bg-red-500/30 text-red-100'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Leaderboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">🏆 Classement Final</h1>
        <p className="text-purple-200 text-center mb-8">Ton score : {score} points</p>

        <div className="space-y-3 mb-8">
          {leaderboard.map((entry, index) => {
            const isCurrentPlayer = entry.pseudo === pseudo && entry.score === score;
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  isCurrentPlayer 
                    ? 'bg-yellow-500/30 border-2 border-yellow-400' 
                    : 'bg-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-gray-300 text-gray-800' :
                    index === 2 ? 'bg-orange-400 text-orange-900' :
                    'bg-white/20 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className={`font-bold ${isCurrentPlayer ? 'text-yellow-200' : 'text-white'}`}>
                      {entry.pseudo} {isCurrentPlayer && '← Toi !'}
                    </div>
                    <div className="text-purple-300 text-sm">
                      {new Date(entry.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${isCurrentPlayer ? 'text-yellow-200' : 'text-white'}`}>
                  {entry.score}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={resetGame}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
}
