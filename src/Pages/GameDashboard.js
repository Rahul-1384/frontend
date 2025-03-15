import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Gift, Award, ChevronsUp, ChevronDown, ChevronRight, ChevronUp, Zap, Target, BookOpen } from "lucide-react";

// Badge System
const getBadge = (coins) => {
  if (coins >= 2000) return { icon: "💎", name: "Diamond", color: "bg-blue-400" };
  if (coins >= 1000) return { icon: "🥇", name: "Gold", color: "bg-yellow-400" };
  if (coins >= 500) return { icon: "🥈", name: "Silver", color: "bg-gray-300" };
  return { icon: "🥉", name: "Bronze", color: "bg-amber-600" };
};

// Avatar URLs (replace with real images if needed)
const avatarUrls = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Player",
];

const GameDashboard = () => {
  const [coins, setCoins] = useState(350);
  const [streak, setStreak] = useState(4);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [announcement, setAnnouncement] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [activeTab, setActiveTab] = useState("challenges");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");

  // Expanded challenge set
  const challenges = [
    { 
      id: 1, 
      title: "Book Trivia Master", 
      type: "quiz", 
      difficulty: "medium",
      question: "Who wrote 'To Kill a Mockingbird'?", 
      options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"], 
      correctAnswer: "Harper Lee", 
      rewardCoins: 50,
      icon: <BookOpen className="w-6 h-6 text-purple-500" />
    },
    { 
      id: 2, 
      title: "Word Puzzle Challenge", 
      type: "puzzle", 
      difficulty: "easy",
      description: "Unscramble OLNVE to find a common word.", 
      answer: "NOVEL",
      rewardCoins: 30,
      icon: <Target className="w-6 h-6 text-green-500" />
    },
    { 
      id: 3, 
      title: "Reading Marathon", 
      type: "reading", 
      difficulty: "hard",
      description: "Read a short story and answer three comprehension questions correctly.", 
      rewardCoins: 100,
      icon: <BookOpen className="w-6 h-6 text-blue-500" />
    },
    { 
      id: 4, 
      title: "Vocabulary Builder", 
      type: "matching",
      difficulty: "medium", 
      description: "Match literary terms with their correct definitions.", 
      rewardCoins: 70,
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
  ];

  // Extended leaderboard
  const leaderboard = [
    { name: "Alice", coins: 1200, avatar: avatarUrls[0], streak: 12 },
    { name: "Bob", coins: 950, avatar: avatarUrls[1], streak: 7 },
    { name: "Charlie", coins: 780, avatar: avatarUrls[2], streak: 5 },
    { name: "You", coins: coins, avatar: avatarUrls[3], streak: streak },
  ];

  // Daily rewards system
  const dailyReward = {
    coins: 25,
    collected: false
  };

  // Handle daily streak and rewards
  useEffect(() => {
    const lastLogin = localStorage.getItem("lastLoginDate");
    const today = new Date().toDateString();

    if (lastLogin !== today) {
      // Increase streak if logged in on consecutive days
      if (lastLogin === new Date(Date.now() - 86400000).toDateString()) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        
        // Bonus coins for streak milestones
        if (newStreak % 5 === 0) {
          const bonus = newStreak * 10;
          setCoins(prev => prev + bonus);
          setAnnouncement(`🔥 ${newStreak} Day Streak Bonus! You earned ${bonus} extra coins!`);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else if (lastLogin) {
        // Reset streak if not consecutive
        setStreak(1);
      }
      
      localStorage.setItem("lastLoginDate", today);
    }
  }, []);

  // Handle quiz answer submission
  const handleSubmitQuiz = (challenge) => {
    if (completedChallenges.includes(challenge.id)) {
      setAnnouncement("You've already completed this challenge!");
      return;
    }

    if (quizAnswer === challenge.correctAnswer) {
      const earnedCoins = challenge.rewardCoins;
      setCoins(prev => prev + earnedCoins);
      setCompletedChallenges([...completedChallenges, challenge.id]);
      setAnnouncement(`🎉 Correct! You earned ${earnedCoins} coins.`);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setSelectedChallenge(null);
      }, 2000);
    } else {
      setAnnouncement("That's not right. Try again!");
    }
  };

  // Handle word puzzle submission
  const handleSubmitPuzzle = (challenge, answer) => {
    if (completedChallenges.includes(challenge.id)) {
      setAnnouncement("You've already completed this challenge!");
      return;
    }

    if (answer.toUpperCase() === challenge.answer) {
      const earnedCoins = challenge.rewardCoins;
      setCoins(prev => prev + earnedCoins);
      setCompletedChallenges([...completedChallenges, challenge.id]);
      setAnnouncement(`🎉 Well done! You earned ${earnedCoins} coins.`);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setSelectedChallenge(null);
      }, 2000);
    } else {
      setAnnouncement("That's not correct. Try again!");
    }
  };

  // Handle non-quiz challenge completion
  const handleCompleteChallenge = (challenge) => {
    if (completedChallenges.includes(challenge.id)) {
      setAnnouncement("You've already completed this challenge!");
      return;
    }

    setCoins(prev => prev + challenge.rewardCoins);
    setCompletedChallenges([...completedChallenges, challenge.id]);
    setAnnouncement(`🎉 Challenge completed! You earned ${challenge.rewardCoins} coins.`);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setSelectedChallenge(null);
    }, 2000);
  };

  // Collect daily reward
  const collectDailyReward = () => {
    setIsCollecting(true);
    setTimeout(() => {
      setCoins(prev => prev + dailyReward.coins);
      setAnnouncement(`✨ Daily reward collected: ${dailyReward.coins} coins!`);
      setIsCollecting(false);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const badgeInfo = getBadge(coins);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Confetti effect for celebrations */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: ['#FFC700', '#FF0066', '#00C2FF', '#8A2BE2', '#FF4500'][Math.floor(Math.random() * 5)],
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Announcements */}
        <AnimatePresence>
          {announcement && (
            <motion.div 
              className="p-4 mb-6 text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-center shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-lg font-medium">{announcement}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Header */}
        <div className="mb-8">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Learning Quest
            </h1>
            
            {/* Daily reward button */}
            <motion.button
              onClick={collectDailyReward}
              disabled={isCollecting}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 ${isCollecting ? 'bg-gray-400' : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600'} text-white shadow-md transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gift className="w-5 h-5" />
              <span>Daily Reward</span>
              {isCollecting && (
                <motion.div 
                  className="w-5 h-5 border-4 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* User Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Coins Card */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex items-center"
            variants={itemVariants}
          >
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
              <span className="text-2xl">🪙</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Coins Balance</p>
              <motion.p 
                className="text-2xl font-bold"
                key={coins}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {coins}
              </motion.p>
            </div>
          </motion.div>
          
          {/* Badge Card */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex items-center"
            variants={itemVariants}
          >
            <div className={`${badgeInfo.color} p-3 rounded-full mr-4`}>
              <span className="text-2xl">{badgeInfo.icon}</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Current Rank</p>
              <p className="text-2xl font-bold">{badgeInfo.name}</p>
            </div>
          </motion.div>
          
          {/* Streak Card */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex items-center"
            variants={itemVariants}
          >
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full mr-4">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Daily Streak</p>
              <div className="flex items-center">
                <motion.p 
                  className="text-2xl font-bold mr-2"
                  key={streak}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {streak}
                </motion.p>
                <span className="text-sm text-gray-500">days</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("challenges")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "challenges" 
                ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400" 
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Challenges
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "rewards" 
                ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400" 
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "leaderboard" 
                ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400" 
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Leaderboard
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "challenges" && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Daily Challenges
              </h2>
              
              {selectedChallenge ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {selectedChallenge.icon}
                      <h3 className="text-xl font-bold ml-2">{selectedChallenge.title}</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-3 rounded-full capitalize">
                        {selectedChallenge.difficulty}
                      </span>
                      <span className="ml-2 flex items-center text-yellow-500">
                        <span>{selectedChallenge.rewardCoins}</span>
                        <span className="ml-1">🪙</span>
                      </span>
                    </div>
                  </div>
                  
                  {selectedChallenge.type === "quiz" && (
                    <div className="space-y-4">
                      <p className="text-lg mb-4">{selectedChallenge.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedChallenge.options.map((option) => (
                          <motion.button
                            key={option}
                            className={`px-4 py-3 rounded-lg text-left border-2 transition-all ${
                              quizAnswer === option 
                                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900" 
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
                            onClick={() => setQuizAnswer(option)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                      <div className="flex justify-end mt-6">
                        <motion.button
                          onClick={() => handleSubmitQuiz(selectedChallenge)}
                          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Submit Answer
                        </motion.button>
                      </div>
                    </div>
                  )}
                  
                  {selectedChallenge.type === "puzzle" && (
                    <div className="space-y-4">
                      <p className="text-lg mb-4">{selectedChallenge.description}</p>
                      <div>
                        <input 
                          type="text" 
                          className="w-full md:w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                          placeholder="Enter your answer"
                          onChange={(e) => setQuizAnswer(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end mt-6">
                        <motion.button
                          onClick={() => handleSubmitPuzzle(selectedChallenge, quizAnswer)}
                          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Submit Answer
                        </motion.button>
                      </div>
                    </div>
                  )}
                  
                  {(selectedChallenge.type === "reading" || selectedChallenge.type === "matching") && (
                    <div className="space-y-4">
                      <p className="text-lg mb-4">{selectedChallenge.description}</p>
                      <div className="flex justify-end mt-6">
                        <motion.button
                          onClick={() => handleCompleteChallenge(selectedChallenge)}
                          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Mark as Completed
                        </motion.button>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-start">
                    <motion.button
                      onClick={() => setSelectedChallenge(null)}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center text-sm"
                      whileHover={{ x: -3 }}
                    >
                      ← Back to all challenges
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {challenges.map((challenge) => (
                    <motion.div
                      key={challenge.id}
                      variants={itemVariants}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all cursor-pointer ${
                        completedChallenges.includes(challenge.id) ? "opacity-60" : ""
                      }`}
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      onClick={() => !completedChallenges.includes(challenge.id) && setSelectedChallenge(challenge)}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            {challenge.icon}
                            <h3 className="text-lg font-bold ml-2">{challenge.title}</h3>
                          </div>
                          <span className="flex items-center text-yellow-500">
                            <span>{challenge.rewardCoins}</span>
                            <span className="ml-1">🪙</span>
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded-full capitalize">
                            {challenge.difficulty}
                          </span>
                          
                          {completedChallenges.includes(challenge.id) ? (
                            <span className="text-green-500 flex items-center text-sm">
                              <span>Completed</span>
                              <span className="ml-1">✓</span>
                            </span>
                          ) : (
                            <span className="text-indigo-500 dark:text-indigo-400 flex items-center text-sm">
                              <span>Start Challenge</span>
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
          
          {activeTab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Gift className="w-6 h-6 mr-2 text-pink-500" />
                Rewards Shop
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="p-5">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">Book Discount</h3>
                      <span className="text-yellow-500 font-medium">500 🪙</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Get 20% off on your next book purchase</p>
                    <motion.button
                      onClick={() => {
                        if (coins >= 500) {
                          setCoins(coins - 500);
                          setAnnouncement("🎉 You redeemed a 20% book discount!");
                          setShowConfetti(true);
                          setTimeout(() => setShowConfetti(false), 3000);
                        } else {
                          setAnnouncement("You need 500 coins to redeem this reward.");
                        }
                      }}
                      className={`mt-4 w-full py-2 rounded text-center text-white font-medium ${
                        coins >= 500 ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
                      }`}
                      whileTap={coins >= 500 ? { scale: 0.95 } : {}}
                    >
                      Redeem
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="p-5">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">Special Avatar</h3>
                      <span className="text-yellow-500 font-medium">750 🪙</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Unlock an exclusive profile avatar</p>
                    <motion.button
                      onClick={() => {
                        if (coins >= 750) {
                          setCoins(coins - 750);
                          setAnnouncement("🎉 You unlocked a special avatar!");
                          setShowConfetti(true);
                          setTimeout(() => setShowConfetti(false), 3000);
                        } else {
                          setAnnouncement("You need 750 coins to redeem this reward.");
                        }
                      }}
                      className={`mt-4 w-full py-2 rounded text-center text-white font-medium ${
                        coins >= 750 ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
                      }`}
                      whileTap={coins >= 750 ? { scale: 0.95 } : {}}
                    >
                      Redeem
                    </motion.button>
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="p-5">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">Premium Story</h3>
                      <span className="text-yellow-500 font-medium">1000 🪙</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Unlock access to premium reading content</p>
                    <motion.button
                      onClick={() => {
                        if (coins >= 1000) {
                          setCoins(coins - 1000);
                          setAnnouncement("🎉 You unlocked premium reading content!");
                          setShowConfetti(true);
                          setTimeout(() => setShowConfetti(false), 3000);
                        } else {
                          setAnnouncement("You need 1000 coins to redeem this reward.");
                        }
                      }}
                      className={`mt-4 w-full py-2 rounded text-center text-white font-medium ${
                        coins >= 1000 ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
                      }`}
                      whileTap={coins >= 1000 ? { scale: 0.95 } : {}}
                    >
                      Redeem
                    </motion.button>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ChevronsUp className="w-5 h-5 mr-2 text-indigo-500" />
                  Badge Progression
                </h3>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">🥉</span>
                          <span className="font-medium">Bronze</span>
                        </div>
                        <span className="text-sm text-gray-500">0 - 499 coins</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-amber-600 h-3 rounded-full"
                          style={{ width: `${Math.min(100, (coins / 500) * 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">🥈</span>
                          <span className="font-medium">Silver</span>
                        </div>
                        <span className="text-sm text-gray-500">500 - 999 coins</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gray-300 h-3 rounded-full"
                          style={{ width: `${Math.max(0, Math.min(100, ((coins - 500) / 500) * 100))}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">🥇</span>
                          <span className="font-medium">Gold</span>
                        </div>
                        <span className="text-sm text-gray-500">1000 - 1999 coins</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-yellow-400 h-3 rounded-full"
                          style={{ width: `${Math.max(0, Math.min(100, ((coins - 1000) / 1000) * 100))}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">💎</span>
                          <span className="font-medium">Diamond</span>
                        </div>
                        <span className="text-sm text-gray-500">2000+ coins</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-blue-400 h-3 rounded-full"
                          style={{ width: `${Math.max(0, Math.min(100, ((coins - 2000) / 1000) * 100))}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                Leaderboard
              </h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 dark:text-gray-400">Top Readers This Week</span>
                    <div className="flex space-x-2">
                      <button 
                        className={`text-sm px-3 py-1 rounded-full ${
                          !showLeaderboard ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" : "text-gray-500"
                        }`}
                        onClick={() => setShowLeaderboard(false)}
                      >
                        Coins
                      </button>
                      <button 
                        className={`text-sm px-3 py-1 rounded-full ${
                          showLeaderboard ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" : "text-gray-500"
                        }`}
                        onClick={() => setShowLeaderboard(true)}
                      >
                        Streaks
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {leaderboard
                      .sort((a, b) => showLeaderboard 
                        ? b.streak - a.streak 
                        : b.coins - a.coins
                      )
                      .map((user, index) => (
                        <motion.div 
                          key={user.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            user.name === "You" 
                              ? "bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700" 
                              : "bg-gray-50 dark:bg-gray-700"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="w-6 text-center font-semibold text-gray-500">{index + 1}</span>
                            <div className="w-10 h-10 rounded-full overflow-hidden ml-3">
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="ml-3 font-medium">{user.name}</span>
                            {user.name === "You" && (
                              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <div className="flex items-center">
                            {showLeaderboard ? (
                              <div className="flex items-center">
                                <span className="text-red-500">🔥</span>
                                <span className="ml-2 font-bold">{user.streak}</span>
                                <span className="ml-1 text-sm text-gray-500">days</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <span className="text-yellow-500">🪙</span>
                                <span className="ml-2 font-bold">{user.coins}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameDashboard;