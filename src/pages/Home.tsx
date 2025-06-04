import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userType, setUserType] = useState<'expert' | 'beginner' | ''>('');
  const [emotion, setEmotion] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const navigate = useNavigate();

  const beginnerEmotions = [
    { label: '행복해요', keyword: 'Happy' },
    { label: '우울해요', keyword: 'Sad' },
    { label: '화가 나요', keyword: 'Angry' },
    { label: '지루해요', keyword: 'Bored' },
    { label: '설레요', keyword: 'Excited' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/recommend?emotion=${encodeURIComponent(emotion)}`);
  };

  const handleCheckboxToggle = (keyword: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleMultiEmotionSubmit = () => {
    const summary = `당신은 지금 ${selectedEmotions.join(', ')} 감정을 느끼고 있군요.`;
    navigate(
      `/recommend?emotion=${encodeURIComponent(
        selectedEmotions.join(',')
      )}&summary=${encodeURIComponent(summary)}`
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      {!userType ? (
        <>
          <h1>당신은 어떤 독서가인가요?</h1>
          <button onClick={() => setUserType('expert')} style={{ marginRight: '1rem' }}>
            📚 애독가
          </button>
          <button onClick={() => setUserType('beginner')}>
            🌱 초보 독서가
          </button>
        </>
      ) : userType === 'expert' ? (
        <>
          <h1>오늘 기분이 어때요? 일기를 적어주세요 😄</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              placeholder="예: 기분이 우울해요"
              style={{ padding: '0.5rem', width: '60%', marginRight: '1rem' }}
            />
            <button type="submit">추천 받기</button>
          </form>
        </>
      ) : (
        <>
          <h1>지금 기분을 선택해 주세요 😊</h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {beginnerEmotions.map((emo) => (
              <button
                key={emo.keyword}
                onClick={() => handleCheckboxToggle(emo.keyword)}
                style={{
                  backgroundColor: selectedEmotions.includes(emo.keyword) ? '#666' : '#eee',
                  color: selectedEmotions.includes(emo.keyword) ? '#fff' : '#000',
                  padding: '0.5rem 1rem',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                {emo.label}
              </button>
            ))}
          </div>

          {selectedEmotions.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <p>👉 선택한 감정: <strong>{selectedEmotions.join(', ')}</strong></p>
              <button
                onClick={handleMultiEmotionSubmit}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#666',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '6px',
                }}
              >
                추천 받기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
