import React, { useState, useEffect, useRef } from 'react';

const MOVIES = [
  { 
    title: "Le Parrain", 
    answers: ["le parrain", "the godfather", "parrain", "godfather"],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop"
  },
  { 
    title: "Pulp Fiction", 
    answers: ["pulp fiction", "pulp", "fiction"],
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop"
  },
  { 
    title: "Inception", 
    answers: ["inception"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop"
  },
  { 
    title: "Matrix", 
    answers: ["matrix", "the matrix", "la matrice"],
    image: "https://images.unsplash.com/photo-1574267432644-f610a91a6fde?w=800&h=600&fit=crop"
  },
  { 
    title: "Star Wars", 
    answers: ["star wars", "la guerre des etoiles", "guerre des etoiles"],
    image: "https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&h=600&fit=crop"
  },
  { 
    title: "Gladiateur", 
    answers: ["gladiateur", "gladiator"],
    image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=600&fit=crop"
  },
  { 
    title: "Titanic", 
    answers: ["titanic"],
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
  },
  { 
    title: "Avengers", 
    answers: ["avengers", "the avengers", "vengeurs"],
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=600&fit=crop"
  },
  { 
    title: "Jurassic Park", 
    answers: ["jurassic park", "jurasic park", "parc jurassique"],
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop"
  },
  { 
    title: "Fight Club", 
    answers: ["fight club", "fightclub"],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop"
  },
  { 
    title: "Forrest Gump", 
    answers: ["forrest gump", "forest gump"],
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop"
  },
  { 
    title: "Le Seigneur des Anneaux", 
    answers: ["le seigneur des anneaux", "seigneur des anneaux", "lord of the rings", "lotr"],
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=600&fit=crop"
  },
  { 
    title: "Interstellar", 
    answers: ["interstellar", "interstelar"],
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop"
  },
  { 
    title: "Le Roi Lion", 
    answers: ["le roi lion", "roi lion", "the lion king", "lion king"],
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&fit=crop"
  },
  { 
    title: "Shrek", 
    answers: ["shrek"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop"
  },
  { 
    title: "Harry Potter", 
    answers: ["harry potter", "potter"],
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop"
  },
  { 
    title: "Spider-Man", 
    answers: ["spider-man", "spiderman", "spider man", "l'homme araignee"],
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=600&fit=crop"
  },
  { 
    title: "Batman", 
    answers: ["batman", "the dark knight", "dark knight"],
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop"
  },
  { 
    title: "Joker", 
    answers: ["joker"],
    image: "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800&h=600&fit=crop"
  },
  { 
    title: "La La Land", 
    answers: ["la la land", "lalaland"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop"
  },
  { 
    title: "Toy Story", 
    answers: ["toy story", "toystory"],
    image: "https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=800&h=600&fit=crop"
  },
  { 
    title: "Le Grand Bleu", 
    answers: ["le grand bleu", "grand bleu", "the big blue"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
  },
  { 
    title: "Amélie Poulain", 
    answers: ["amelie poulain", "amelie", "le fabuleux destin"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop"
  },
  { 
    title: "Intouchables", 
    answers: ["intouchables", "intouchable"],
    image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=800&h=600&fit=crop"
  },
  { 
    title: "Avatar", 
    answers: ["avatar"],
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop"
  },
  { 
    title: "Le Silence des Agneaux", 
    answers: ["le silence des agneaux", "silence des agneaux", "silence of the lambs"],
    image: "https://images.unsplash.com/photo-1509923786451-e7b413c47d1f?w=800&h=600&fit=crop"
  },
  { 
    title: "Retour vers le Futur", 
    answers: ["retour vers le futur", "back to the future", "retour futur"],
    image: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800&h=600&fit=crop"
  },
  { 
    title: "E.T.", 
    answers: ["et", "e.t.", "e.t", "et l'extra-terrestre"],
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop"
  },
  { 
    title: "Les Dents de la Mer", 
    answers: ["les dents de la mer", "dents de la mer", "jaws"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
  },
  { 
    title: "Le Cinquième Élément", 
    answers: ["le cinquieme element", "cinquieme element", "5eme element", "fifth element"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop"
  },
  { 
    title: "Taxi", 
    answers: ["taxi"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
  },
  { 
    title: "La Haine", 
    answers: ["la haine", "haine"],
    image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&h=600&fit=crop"
  },
  { 
    title: "Les Bronzés", 
    answers: ["les bronzes", "bronzes"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop"
  },
  { 
    title: "La Cité de la Peur", 
    answers: ["la cite de la peur", "cite de la peur"],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop"
  },
  { 
    title: "Bienvenue chez les Ch'tis", 
    answers: ["bienvenue chez les chtis", "chtis", "ch'tis"],
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop"
  }
];
,
  { title: "Scarface", answers: ["scarface", "scar face"], image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=600&fit=crop" },
  { title: "Goodfellas", answers: ["goodfellas", "good fellas", "les affranchis"], image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=800&h=600&fit=crop" },
  { title: "Casino", answers: ["casino"], image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop" },
  { title: "Interstellar", answers: ["interstellar", "interstella"], image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop" },
  { title: "Le Seigneur des Anneaux", answers: ["le seigneur des anneaux", "seigneur des anneaux", "lord of the rings", "lotr"], image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=600&fit=crop" },
  { title: "Shawshank Redemption", answers: ["shawshank redemption", "shawshank", "les evades"], image: "https://images.unsplash.com/photo-1516981442399-5e2c8e2f9d33?w=800&h=600&fit=crop" },
  { title: "Django Unchained", answers: ["django unchained", "django", "jango"], image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop" },
  { title: "Le Roi Lion", answers: ["le roi lion", "roi lion", "the lion king", "lion king"], image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&fit=crop" },
  { title: "Joker", answers: ["joker"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Parasite", answers: ["parasite"], image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop" },
  { title: "Taxi Driver", answers: ["taxi driver", "chauffeur de taxi"], image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop" },
  { title: "Seven", answers: ["seven", "se7en", "7"], image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&h=600&fit=crop" },
  { title: "American Beauty", answers: ["american beauty", "beaute americaine"], image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop" },
  { title: "Requiem for a Dream", answers: ["requiem for a dream", "requiem"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Gran Torino", answers: ["gran torino", "grand torino"], image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop" },
  { title: "Kill Bill", answers: ["kill bill", "killbill"], image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop" },
  { title: "Reservoir Dogs", answers: ["reservoir dogs", "chiens de reservoir"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Pirates des Caraïbes", answers: ["pirates des caraibes", "pirates of the caribbean", "pirates"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop" },
  { title: "Harry Potter", answers: ["harry potter", "potter"], image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop" },
  { title: "Spider-Man", answers: ["spider-man", "spiderman", "spider man", "lhomme araignee"], image: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800&h=600&fit=crop" },
  { title: "Batman", answers: ["batman", "bat man"], image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&h=600&fit=crop" },
  { title: "Iron Man", answers: ["iron man", "ironman"], image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=600&fit=crop" },
  { title: "Le Monde de Nemo", answers: ["le monde de nemo", "monde de nemo", "finding nemo", "nemo"], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop" },
  { title: "Shrek", answers: ["shrek"], image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&fit=crop" },
  { title: "La Reine des Neiges", answers: ["la reine des neiges", "reine des neiges", "frozen"], image: "https://images.unsplash.com/photo-1483086431886-3590a88317fe?w=800&h=600&fit=crop" },
  { title: "Alien", answers: ["alien"], image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop" },
  { title: "Blade Runner", answers: ["blade runner", "bladerunner"], image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop" },
  { title: "Terminator", answers: ["terminator"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Predator", answers: ["predator"], image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop" },
  { title: "Rocky", answers: ["rocky"], image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=600&fit=crop" },
  { title: "Rambo", answers: ["rambo"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Die Hard", answers: ["die hard", "diehard", "piege de cristal"], image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop" },
  { title: "Mad Max", answers: ["mad max", "madmax"], image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop" },
  { title: "300", answers: ["300", "trois cents"], image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=600&fit=crop" },
  { title: "Léon", answers: ["leon", "the professional"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "La Grande Vadrouille", answers: ["la grande vadrouille", "grande vadrouille"], image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800&h=600&fit=crop" },
  { title: "OSS 117", answers: ["oss 117", "oss117"], image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=600&fit=crop" },
  { title: "Psycho", answers: ["psycho", "psychose"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Shining", answers: ["shining", "the shining"], image: "https://images.unsplash.com/photo-1483086431886-3590a88317fe?w=800&h=600&fit=crop" },
  { title: "L'Exorciste", answers: ["lexorciste", "exorciste", "the exorcist"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Halloween", answers: ["halloween"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Scream", answers: ["scream"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Conjuring", answers: ["conjuring", "the conjuring"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Insidious", answers: ["insidious"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Saw", answers: ["saw"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Get Out", answers: ["get out", "getout"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "A Quiet Place", answers: ["a quiet place", "quiet place", "sans un bruit"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=600&fit=crop" },
  { title: "Casablanca", answers: ["casablanca"], image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop" },
  { title: "Citizen Kane", answers: ["citizen kane", "kane"], image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop" },
  { title: "La Vie est Belle", answers: ["la vie est belle", "life is beautiful"], image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop" },
  { title: "Apocalypse Now", answers: ["apocalypse now", "apocalypse"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Full Metal Jacket", answers: ["full metal jacket", "fullmetaljacket"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Platoon", answers: ["platoon"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Il Faut Sauver le Soldat Ryan", answers: ["il faut sauver le soldat ryan", "saving private ryan", "soldat ryan"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Dunkerque", answers: ["dunkerque", "dunkirk"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "La La Land", answers: ["la la land", "lalaland"], image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop" },
  { title: "Whiplash", answers: ["whiplash"], image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop" },
  { title: "The Prestige", answers: ["the prestige", "prestige", "le prestige"], image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop" },
  { title: "Memento", answers: ["memento"], image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop" },
  { title: "The Truman Show", answers: ["the truman show", "truman show", "truman"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Big Fish", answers: ["big fish", "bigfish"], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop" },
  { title: "Her", answers: ["her", "elle"], image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop" },
  { title: "Moonlight", answers: ["moonlight"], image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop" },
  { title: "Le Voyage de Chihiro", answers: ["le voyage de chihiro", "voyage de chihiro", "chihiro", "spirited away"], image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop" },
  { title: "Mon Voisin Totoro", answers: ["mon voisin totoro", "totoro"], image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop" },
  { title: "1917", answers: ["1917"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop" },
  { title: "Oppenheimer", answers: ["oppenheimer"], image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop" },
  { title: "Dune", answers: ["dune"], image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop" }

// Function to calculate Levenshtein distance for fuzzy matching
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

// Check if answer is close enough (allows 1-2 typos depending on length)
const isAnswerCorrect = (userAnswer, correctAnswers) => {
  const normalized = userAnswer.toLowerCase().trim();
  
  // Exact match check
  if (correctAnswers.some(ans => normalized === ans)) {
    return true;
  }
  
  // Fuzzy match check (allow typos)
  for (const correctAnswer of correctAnswers) {
    const distance = levenshteinDistance(normalized, correctAnswer);
    const threshold = correctAnswer.length <= 5 ? 1 : 2; // Allow 1 typo for short words, 2 for longer
    
    if (distance <= threshold) {
      return true;
    }
  }
  
  return false;
};

export default function MovieQuiz() {
  const [screen, setScreen] = useState('welcome'); // welcome, game, leaderboard
  const [pseudo, setPseudo] = useState('');
  const [shuffledMovies, setShuffledMovies] = useState([]);
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

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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
      // Select 10 random movies from the full list
      const randomSelection = shuffleArray(MOVIES).slice(0, 10);
      setShuffledMovies(randomSelection);
      setScreen('game');
      setCurrentQuestion(0);
      setScore(0);
      setTimeout(() => startQuestion(), 100); // Small delay to ensure shuffledMovies is set
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
    
    const currentMovie = shuffledMovies[currentQuestion];
    setFeedback(`⏱️ Temps écoulé ! C'était "${currentMovie.title}"`);
    setHasAnswered(true);

    // Move to next question or show leaderboard
    setTimeout(() => {
      if (currentQuestion < shuffledMovies.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        startQuestion();
      } else {
        finishGame();
      }
    }, 2000);
  };

  const checkAnswer = () => {
    const currentMovie = shuffledMovies[currentQuestion];
    const normalizedAnswer = answer.toLowerCase().trim();

    if (isAnswerCorrect(normalizedAnswer, currentMovie.answers)) {
      // Correct answer - stop timers and award points
      clearInterval(timerRef.current);
      clearInterval(blurTimerRef.current);
      
      const points = Math.round(Math.max(100, 1000 - (timeElapsed * 90)));
      setScore(prev => prev + points);
      setFeedback(`✅ Correct ! +${points} points (${timeElapsed.toFixed(1)}s)`);
      setHasAnswered(true);

      // Move to next question after delay
      setTimeout(() => {
        if (currentQuestion < shuffledMovies.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          startQuestion();
        } else {
          finishGame();
        }
      }, 2000);
    } else {
      // Wrong answer - show feedback but keep playing
      setFeedback(`❌ Mauvaise réponse ! Réessaye...`);
      setAnswer(''); // Clear input for next attempt
      
      // Clear feedback after 1.5 seconds
      setTimeout(() => {
        if (!hasAnswered) {
          setFeedback('');
        }
      }, 1500);
    }
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
    const currentMovie = shuffledMovies[currentQuestion];
    
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
