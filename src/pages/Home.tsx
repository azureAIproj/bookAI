import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emotionKeywords: Record<string, string[]> = {
  '위로받고 싶어요': ['위로', '안정', '평온', '공감'],
  '설레고 싶어요': ['사랑', '설렘', '기대', '낭만'],
  '몰입하고 싶어요': ['호기심', '긴장', '탐험', '궁금증'],
  '생각하고 싶어요': ['철학', '자아', '성찰', '지적 자극'],
  '웃고 싶어요': ['유머', '발랄함', '밝음', '따뜻한 일상'],
};

function Home() {
  const [userType, setUserType] = useState<'expert' | 'beginner' | ''>('');
  const [emotionText, setEmotionText] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleCheckboxToggle = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  const handleBeginnerSubmit = () => {
    navigate(`/recommend?keywords=${encodeURIComponent(selectedKeywords.join(','))}`);
  };

  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/recommend?emotion=${encodeURIComponent(emotionText)}`);
  };

  return (
    <div style={{ backgroundColor: '#fff6f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 배너 */}
      <div style={{
        width: '100%',
        backgroundColor: '#f5ebe0',
        padding: '2rem 1rem',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>📖 오늘, 책으로 감정을 치유해보세요</h1>
        <p style={{ marginTop: '0.5rem', fontSize: '1rem' }}>당신의 감정에 맞춘 책을 추천해드릴게요.</p>
      </div>

      {/* 내용 */}
      <div style={{
        flex: 1,
        width: '100%',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {!userType ? (
          <>
            <h2 style={{ textAlign: 'center' }}>당신은 어떤 독서가인가요?</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <button onClick={() => setUserType('expert')} style={buttonStyle}>📚 애독가</button>
              <button onClick={() => setUserType('beginner')} style={buttonStyle}>🌱 초보 독서가</button>
            </div>
          </>
        ) : userType === 'expert' ? (
          <>
            <h2>오늘 기분이 어때요? 일기를 적어주세요 😊</h2>
            <form onSubmit={handleExpertSubmit} style={{ marginTop: '1rem', width: '100%', maxWidth: '500px' }}>
              <input
                type="text"
                value={emotionText}
                onChange={(e) => setEmotionText(e.target.value)}
                placeholder="예: 기분이 우울해요"
                style={{
                  padding: '0.5rem',
                  width: '100%',
                  marginBottom: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
              <button type="submit" style={submitButtonStyle}>추천 받기</button>
            </form>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: '2rem' }}>😊 지금 당신의 감정을 골라주세요</h2>
            {Object.entries(emotionKeywords).map(([category, keywords]) => (
              <div key={category} style={{ marginBottom: '1.5rem', width: '100%', maxWidth: '720px' }}>
                <h3>{category}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {keywords.map((keyword) => (
                    <label key={keyword} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        checked={selectedKeywords.includes(keyword)}
                        onChange={() => handleCheckboxToggle(keyword)}
                      />
                      {keyword}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {selectedKeywords.length > 0 && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button onClick={handleBeginnerSubmit} style={submitButtonStyle}>📚 추천 받기</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#eee',
  border: 'none',
  padding: '0.8rem 1.2rem',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.2s ease-in-out',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: '#666666',
  color: '#ffffff',
  padding: '0.8rem 1.2rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: '1rem',
};

export default Home;
