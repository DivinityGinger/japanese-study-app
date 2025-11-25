import React, { useState } from 'react';
import { BookOpen, MessageSquare, Award } from 'lucide-react';
import './App.css';

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
    return 'I understand! Keep going!';
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const userMsg = { type: 'user', text: chatInput };
    const botResponse = { type: 'bot', text: generateSimpleResponse(chatInput) };
    setConversation([...conversation, userMsg, botResponse]);
    setChatInput('');
  };

  // ---------------- MENU ----------------
  if (mode === 'menu') {
    return (
      <div className="wrapper">
        <div className="content">
          <h1>日本語</h1>
          <h2>Japanese Exam Helper</h2>
          <p>Choose a study mode to ace your exam!</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <div className="card" onClick={() => setMode('flashcards')}>
              <BookOpen size={48} />
              <h3>Flashcards</h3>
              <p>Study vocabulary & grammar</p>
            </div>
            <div className="card" onClick={() => setMode('chat')}>
              <MessageSquare size={48} />
              <h3>Practice Chat</h3>
              <p>Simple Japanese conversation</p>
            </div>
            <div className="card" onClick={() => setMode('grammar')}>
              <Award size={48} />
              <h3>Grammar Guide</h3>
              <p>Key patterns & examples</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- FLASHCARDS ----------------
  if (mode === 'flashcards') {
    if (!category) {
      return (
        <div className="wrapper">
          <div className="content">
            <button onClick={() => setMode('menu')}>← Back to Menu</button>
            <h2>Choose Category</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {Object.keys(studyData).map((cat) => (
                <div key={cat} className="card" onClick={() => { setCategory(cat); setCurrentCard(0); setShowAnswer(false); }}>
                  <h3>{cat}</h3>
                  <p>{studyData[cat].length} items</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const data = getCurrentData();
    const current = data[currentCard];

    return (
      <div className="wrapper">
        <div className="content">
          <button onClick={() => { setCategory(''); setCurrentCard(0); }}>← Back to Categories</button>
          <div className="card" style={{ minHeight: '24rem' }}>
            <div>{currentCard + 1} / {data.length}</div>
            <div onClick={() => setShowAnswer(!showAnswer)} style={{ cursor: 'pointer', flex: 1 }}>
              <h3>{showAnswer ? current.english : current.japanese}</h3>
              {!showAnswer && <p>Click to reveal</p>}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button onClick={handlePrevCard}>Previous</button>
              <button onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? 'Hide' : 'Show'} Answer</button>
              <button onClick={handleNextCard}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

// ---------------- GRAMMAR ----------------
if (mode === 'grammar') {
  return (
    <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      {/* SIDE BACK BUTTON */}
      <button 
        onClick={() => setMode('menu')}
        style={{
          position: 'absolute',
          left: '1rem',
          top: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid #f97316',
          backgroundColor: '#fff',
          color: '#f97316',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        ← Back to Menu
      </button>

      <div className="content" style={{ maxWidth: '900px', margin: '2rem auto', width: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Grammar Patterns</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {grammarExamples.map((item, idx) => (
            <div 
              key={idx} 
              className="card" 
              style={{
                flex: '1 1 calc(30% - 1rem)', // 3 cards per row
                minWidth: '200px',
                maxWidth: '250px',
                padding: '1rem',
                borderRadius: '1rem',
                backgroundColor: '#fff',
                textAlign: 'center',
                border: '1px solid #f97316'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.pattern}</div>
              <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{item.example}</div>
              <div style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>{item.translation}</div>
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
      <div className="wrapper">
        <div className="content">
          <button onClick={() => setMode('menu')}>← Back to Menu</button>
          <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
            <h2>Practice Japanese</h2>
            <p>Try basic phrases! Start with: "Konnichiwa" or "Watashi wa [your name] desu"</p>

            <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', height: '300px', overflowY: 'auto', borderRadius: '0.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {conversation.map((msg, idx) => (
                <div key={idx} style={{
                  textAlign: 'center',
                  padding: '0.5rem 1rem',
                  backgroundColor: msg.type === 'user' ? '#f97316' : '#ffffff',
                  color: msg.type === 'user' ? '#ffffff' : '#f97316',
                  borderRadius: '1rem',
                  alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  margin: '0 auto',
                  wordBreak: 'break-word'
                }}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                className="input-chat"
                placeholder="Type your message..."
                style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #f97316', textAlign: 'center' }}
              />
              <button onClick={handleChatSubmit} style={{ backgroundColor: '#f97316', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default JapaneseStudyApp;
