import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Book = {
  title: string;
  summary: string;
};

function Recommend() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emotionParam = queryParams.get('emotion') || '';
  const summary = queryParams.get('summary'); // 초보 독서가 전용 요약 문장

  const [books, setBooks] = useState<Book[]>([]);
  const emotionList = emotionParam.split(',').filter((e) => e.trim());

  useEffect(() => {
    const fetchBooks = async () => {
      // 여기에 Azure 호출 가능 (emotionParam 사용)
      const dummyBooks: Book[] = [
        { title: '어린 왕자', summary: '순수한 마음으로 세상을 바라보는 이야기' },
        { title: '죽음에 관하여', summary: '인생과 죽음에 대해 성찰하는 깊은 이야기' },
        { title: '멋진 신세계', summary: '감정을 통제받는 사회에 대한 경고' }
      ];
      setBooks(dummyBooks);
    };

    fetchBooks();
  }, [emotionParam]);

  // 감정 설명 텍스트 맵
  const emotionDescriptions: Record<string, string> = {
    Comforted: '지치고 힘든 날, 따뜻한 문장과 이야기가 필요한 순간이에요.',
    Romantic: '사랑과 설렘, 두근거림이 필요한 순간이네요.',
    Immersed: '현실을 잊고 이야기 속으로 깊이 빠지고 싶은 감정이에요.',
    Reflective: '인생과 인간관계에 대해 깊이 생각하고 싶은 마음이 느껴져요.',
    Funny: '기분 전환이 필요하고 유쾌함을 원하는 순간이네요.',
    Happy: '기쁨과 긍정 에너지를 가득 느끼고 싶을 때 좋은 책을 추천해요.',
    Sad: '슬픔을 다독여줄 따뜻한 이야기가 필요한 순간이에요.',
    Angry: '감정을 정리하고 평온을 되찾을 수 있는 글이 도움이 될 거예요.',
    Bored: '지루함을 날려줄 흥미진진한 이야기를 준비했어요.',
    Excited: '기대감과 설렘을 이어갈 책들을 골라봤어요.',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📚 감정 기반 추천 도서</h2>

      {/* 초보 독서가용 요약 문장 출력 */}
      {summary && (
        <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
          {summary}
        </p>
      )}

      {/* 초보 독서가의 경우, 각 감정 설명 표시 */}
      {summary && (
        <ul style={{ marginTop: '1rem' }}>
          {emotionList.map((emotion) => (
            <li key={emotion} style={{ marginBottom: '0.5rem' }}>
              <strong>{emotion}</strong>: {emotionDescriptions[emotion] || '설명이 준비되지 않았어요.'}
            </li>
          ))}
        </ul>
      )}

      {/* 공통 추천 도서 리스트 */}
      <div style={{ marginTop: '2rem' }}>
        <h3>📖 추천 도서 목록</h3>
        <ul>
          {books.map((book, idx) => (
            <li key={idx} style={{ marginBottom: '1rem' }}>
              <strong>{book.title}</strong>
              <p>{book.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Recommend;
