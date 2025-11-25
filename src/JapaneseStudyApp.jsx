
import React, { useState } from 'react';
import { BookOpen, MessageSquare, Award } from 'lucide-react';

const JapaneseStudyApp = () => {
  const [mode, setMode] = useState('menu');
  const [category, setCategory] = useState('');
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const studyData = {
    adjectives: [
      { japanese: 'TAKAI', english: 'Expensive' },
      { japanese: 'YASUI', english: 'Cheap' },
      { japanese: 'ATSUI', english: 'Hot' },
      { japanese: 'SAMUI', english: 'Cold' },
      { japanese: 'OOKII', english: 'Big' },
      { japanese: 'CHISAI', english: 'Small' },
      { japanese: 'OMOSHIROI', english: 'Interesting' },
      { japanese: 'TSUMARANAI', english: 'Boring' },
      { japanese: 'TANOSHII', english: 'Enjoyable' },
      { japanese: 'ABUNAI', english: 'Dangerous' },
      { japanese: 'ATARASHII', english: 'New' },
      { japanese: 'FURUI', english: 'Old' },
      { japanese: 'ANZEN NA', english: 'Safe' },
      { japanese: 'BENRI NA', english: 'Convenient' },
      { japanese: 'GENKI NA', english: 'Healthy' },
      { japanese: 'KIREI NA', english: 'Beautiful/Clean' }
    ],
    verbs: [
      { japanese: 'KAIMASU', english: 'To buy' },
      { japanese: 'NOMIMASU', english: 'To drink' },
      { japanese: 'YOMIMASU', english: 'To read' },
      { japanese: 'KIKIMASU', english: 'To listen' },
      { japanese: 'IKIMASU', english: 'To go' },
      { japanese: 'KAKIMASU', english: 'To write' },
      { japanese: 'WAKARIMASU', english: 'To understand' },
      { japanese: 'TSUKAIMASU', english: 'To use' },
      { japanese: 'KAERIMASU', english: 'To go home' },
      { japanese: 'OKIMASU', english: 'To wake up' },
      { japanese: 'MIMASU', english: 'To watch/see' },
      { japanese: 'TABEMASU', english: 'To eat' },
      { japanese: 'NEMASU', english: 'To sleep' },
      { japanese: 'BENKYOU-SHIMASU', english: 'To study' }
    ],
    nouns: [
      { japanese: 'ASAGOHAN', english: 'Breakfast' },
      { japanese: 'HIRUGOHAN', english: 'Lunch' },
      { japanese: 'BANGOHAN', english: 'Dinner' },
      { japanese: 'UCHI', english: 'House' },
      { japanese: 'GAKKOU', english: 'School' },
      { japanese: 'TOSHOKAN', english: 'Library' },
      { japanese: 'HON', english: 'Book' },
      { japanese: 'SHINBUN', english: 'Newspaper' },
      { japanese: 'KUTSU', english: 'Shoes' },
      { japanese: 'KABAN', english: 'Bag' },
      { japanese: 'SHIKEN', english: 'Test/Quiz/Exam' },
      { japanese: 'KEITAI DENWA', english: 'Cellular phone' },
      { japanese: 'JUGYOU', english: 'Class' }
    ],
    days: [
      { japanese: 'NICHIYOUBI', english: 'Sunday' },
      { japanese: 'GETSUYOUBI', english: 'Monday' },
      { japanese: 'KAYOUBI', english: 'Tuesday' },
      { japanese: 'SUIYOUBI', english: 'Wednesday' },
      { japanese: 'MOKUYOUBI', english: 'Thursday' },
      { japanese: 'KINYOUBI', english: 'Friday' },
      { japanese: 'DOYOUBI', english: 'Saturday' },
      { japanese: 'KYOU', english: 'Today' },
      { japanese: 'ASHITA', english: 'Tomorrow' },
      { japanese: 'KONGETSU', english: 'This Month' },
      { japanese: 'RAIGETSU', english: 'Next Month' },
      { japanese: 'ATO DE', english: 'Later' },
      { japanese: 'RAISHUU', english: 'Next Week' },
      { japanese: 'KONSHUU', english: 'This Week' },
      { japanese: 'RAINEN', english: 'Next Year' },
      { japanese: 'KOTOSHI', english: 'This Year' }
    ],
    numbers: [
      { japanese: 'ICHI', english: '1' },
      { japanese: 'NI', english: '2' },
      { japanese: 'SAN', english: '3' },
      { japanese: 'SHI/YO', english: '4' },
      { japanese: 'GO', english: '5' },
      { japanese: 'ROKU', english: '6' },
      { japanese: 'NANA/SHICHI', english: '7' },
      { japanese: 'HACHI', english: '8' },
      { japanese: 'KYUU', english: '9' },
      { japanese: 'JUU', english: '10' }
    ],
    particles: [
      { japanese: 'WA', english: 'Topic/Subject marker' },
      { japanese: 'GA', english: 'Subject/Existence marker' },
      { japanese: 'WO', english: 'Object marker' },
      { japanese: 'DE', english: 'Place or means' },
      { japanese: 'TO', english: 'Connecting nouns' },
      { japanese: 'NI', english: 'Destination, time' },
      { japanese: 'KARA', english: 'Starting point or cause' },
      { japanese: 'MADE', english: 'Endpoint' },
      { japanese: 'MO', english: 'Also, too' },
      { japanese: 'YORI', english: 'Comparison marker' },
      { japanese: 'DEWA/JA', english: 'Negative forms' }
    ]
  };

  const grammarExamples = [
    { pattern: 'WA...DESU', example: 'Watashi WA John DESU.', translation: 'I am John.' },
    { pattern: 'WA...DEWA ARIMASEN', example: 'Watashi WA John DEWA ARIMASEN.', translation: 'I am not John.' },
    { pattern: 'GA + arimasu/imasu', example: 'Okane GA arimasu.', translation: 'There is money.' },
    { pattern: 'WO + verb', example: 'Tenisu WO shimasu.', translation: 'Play tennis.' },
    { pattern: 'DE + verb', example: 'Amerika DE benkyou-shimasu.', translation: 'Study in America.' },
    { pattern: 'TO + noun', example: 'Mapua TO Letran desu.', translation: 'Mapua and Letran.' }
  ];

  const getCurrentData = () => studyData[category] || [];

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % getCurrentData().length);
  };

  const handlePrevCard = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev - 1 + getCurrentData().length) % getCurrentData().length);
  };

  const generateSimpleResponse = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('konnichiwa') || lower.includes('hello')) return 'Konnichiwa! I am your teacher!';
    if (lower.includes('watashi wa') || lower.includes('name')) return 'Nice to meet you! What is your name?';
    if (lower.includes('benkyou') || lower.includes('study')) return 'Great! Do you study every day?';
    if (lower.includes('doko') || lower.includes('where')) return 'I live in Makati. Where are you?';
    if (lower.includes('youbi') || lower.includes('day')) return 'Today is Saturday. Tomorrow is Sunday.';
    return 'I understand! Keep going!';
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const userMsg = { type: 'user', text: chatInput };
    const botResponse = { type: 'bot', text: generateSimpleResponse(chatInput) };
    setConversation([...conversation, userMsg, botResponse]);
    setChatInput('');
  };

  const wrapperClass = 'min-h-screen bg-white flex items-center justify-center text-orange-600';

  const contentClass = 'w-full max-w-4xl text-center flex flex-col items-center justify-center';

  // ---------------- MENU ----------------
  if (mode === 'menu') {
    return (
      <div className={wrapperClass}>
        <div className={contentClass}>
          <h1 className="text-5xl font-bold mb-3">日本語</h1>
          <h2 className="text-3xl font-bold mb-6">Japanese Exam Helper</h2>
          <p className="mb-12">Choose a study mode to ace your exam!</p>

          <div className="grid md:grid-cols-3 gap-6">
            <button onClick={() => setMode('flashcards')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-orange-600">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Flashcards</h3>
              <p className="text-sm">Study vocabulary & grammar</p>
            </button>

            <button onClick={() => setMode('chat')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-orange-600">
              <MessageSquare className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Practice Chat</h3>
              <p className="text-sm">Simple Japanese conversation</p>
            </button>

            <button onClick={() => setMode('grammar')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-orange-600">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Grammar Guide</h3>
              <p className="text-sm">Key patterns & examples</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- FLASHCARDS ----------------
  if (mode === 'flashcards') {
    if (!category) {
      return (
        <div className={wrapperClass}>
          <div className={contentClass}>
            <button onClick={() => setMode('menu')} className="mb-6 font-semibold">
              ← Back to Menu
            </button>
            <h2 className="text-3xl font-bold mb-8">Choose Category</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(studyData).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setCurrentCard(0);
                    setShowAnswer(false);
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-orange-600"
                >
                  <h3 className="text-xl font-bold capitalize mb-2">{cat}</h3>
                  <p className="text-sm">{studyData[cat].length} items</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const data = getCurrentData();
    const current = data[currentCard];

    return (
      <div className={wrapperClass}>
        <div className="w-full max-w-2xl text-center flex flex-col items-center justify-center">
          <button onClick={() => { setCategory(''); setCurrentCard(0); }} className="mb-6 font-semibold">
            ← Back to Categories
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8 min-h-[24rem] flex flex-col items-center justify-center text-orange-600 w-full">
            <div className="mb-4">
              <span className="text-sm">{currentCard + 1} / {data.length}</span>
            </div>

            <div onClick={() => setShowAnswer(!showAnswer)} className="cursor-pointer flex-1 flex items-center justify-center w-full">
              <div>
                <h3 className="text-5xl font-bold mb-8">{showAnswer ? current.english : current.japanese}</h3>
                {!showAnswer && <p className="text-sm">Click to reveal</p>}
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <button onClick={handlePrevCard} className="px-6 py-3 rounded-lg font-semibold border border-orange-600">
                Previous
              </button>
              <button onClick={() => setShowAnswer(!showAnswer)} className="px-8 py-3 rounded-lg font-semibold bg-orange-600 text-white">
                {showAnswer ? 'Hide' : 'Show'} Answer
              </button>
              <button onClick={handleNextCard} className="px-6 py-3 rounded-lg font-semibold border border-orange-600">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- GRAMMAR ----------------
  if (mode === 'grammar') {
    return (
      <div className={wrapperClass}>
        <div className={contentClass}>
          <button onClick={() => setMode('menu')} className="mb-6 font-semibold">
            ← Back to Menu
          </button>
          <h2 className="text-3xl font-bold mb-8">Grammar Patterns</h2>

          <div className="space-y-4 mb-8 w-full">
            {grammarExamples.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center text-orange-600">
                <div className="font-bold text-lg mb-2">{item.pattern}</div>
                <div className="text-xl mb-2">{item.example}</div>
                <div className="italic">{item.translation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- CHAT ----------------
  if (mode === 'chat') {
    return (
      <div className={wrapperClass}>
        <div className={contentClass}>
          <button onClick={() => setMode('menu')} className="mb-6 font-semibold">
            ← Back to Menu
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-6 text-orange-600 w-full">
            <h2 className="text-2xl font-bold mb-4">Practice Japanese</h2>
            <p className="mb-6 text-sm">Try basic phrases! Start with: "Konnichiwa" or "Watashi wa [your name] desu"</p>

            <div className="bg-gray-50 p-4 h-96 overflow-y-auto rounded-lg mb-4 space-y-2 text-left text-orange-600">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`p-2 rounded-lg ${msg.type === 'user' ? 'bg-orange-100 text-orange-900 text-right' : 'bg-white text-orange-600 text-left'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2 justify-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                className="flex-1 p-3 border border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-600"
                placeholder="Type your message..."
              />
              <button onClick={handleChatSubmit} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default JapaneseStudyApp;






