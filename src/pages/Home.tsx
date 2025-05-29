import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [emotion, setEmotion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 감정 값을 쿼리 파라미터로 전달
    navigate(`/recommend?emotion=${encodeURIComponent(emotion)}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>오늘 기분이 어때요? 😄</h1>
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
    </div>
  );
}

export default Home;
