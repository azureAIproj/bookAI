// Recommend.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Book = {
  title: string;
  summary: string;
};

const keywordToCategory: Record<string, string> = {
  위로: '위로받고 싶어요', 안정: '위로받고 싶어요', 평온: '위로받고 싶어요', 공감: '위로받고 싶어요',
  사랑: '설레고 싶어요', 설렘: '설레고 싶어요', 기대: '설레고 싶어요', 낭만: '설레고 싶어요',
  호기심: '몰입하고 싶어요', 긴장: '몰입하고 싶어요', 탐험: '몰입하고 싶어요', 궁금증: '몰입하고 싶어요',
  철학: '생각하고 싶어요', 자아: '생각하고 싶어요', 성찰: '생각하고 싶어요', '지적 자극': '생각하고 싶어요',
  유머: '웃고 싶어요', 발랄함: '웃고 싶어요', 밝음: '웃고 싶어요', '따뜻한 일상': '웃고 싶어요',
};

const emotionDescriptions: Record<string, string> = {
  '위로받고 싶어요': '지치고 힘든 날, 따뜻한 문장과 이야기가 필요한 순간이에요.',
  '설레고 싶어요': '사랑과 설렘, 두근거림이 필요한 순간이네요.',
  '몰입하고 싶어요': '현실을 잊고 이야기 속으로 깊이 빠지고 싶은 감정이에요.',
  '생각하고 싶어요': '인생과 인간관계에 대해 깊이 생각하고 싶은 마음이 느껴져요.',
  '웃고 싶어요': '기분 전환이 필요하고 유쾌함을 원하는 순간이네요.',
  '행복해요': '기쁨과 긍정 에너지를 가득 느끼고 싶을 때 좋은 책을 추천해요.',
  '우울해요': '슬픔을 다독여줄 따뜻한 이야기가 필요한 순간이에요.',
  '화가 나요': '감정을 정리하고 평온을 되찾을 수 있는 글이 도움이 될 거예요.',
  '지루해요': '지루함을 날려줄 흥미진진한 이야기를 준비했어요.',
  '설레요': '기대감과 설렘을 이어갈 책들을 골라봤어요.',
};

function Recommend() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const emotionParam = queryParams.get('emotion') || '';
  const summary = queryParams.get('summary');
  const keywords = queryParams.get('keywords')?.split(',') || [];

  const [books, setBooks] = useState<Book[]>([]);

  const emotionList = emotionParam.split(',').filter((e) => e.trim());

  // 초보 독서가 → keywords → 카테고리 추출
  const uniqueCategories = Array.from(
    new Set(keywords.map((k) => keywordToCategory[k]).filter(Boolean))
  );

  useEffect(() => {
    const fetchBooks = async () => {
      const dummyBooks: Book[] = [
        { title: '어린 왕자', summary: '순수한 마음으로 세상을 바라보는 이야기' },
        { title: '죽음에 관하여', summary: '인생과 죽음에 대해 성찰하는 깊은 이야기' },
        { title: '멋진 신세계', summary: '감정을 통제받는 사회에 대한 경고' },
      ];
      setBooks(dummyBooks);
    };

    fetchBooks();
  }, [emotionParam, keywords]);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fefae0', minHeight: '100vh' }}>
      <h2>📚 감정 기반 추천 도서</h2>

      {/* 초보 독서가의 요약 문장 */}
      {summary && (
        <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
          {summary}
        </p>
      )}

      {/* 초보 독서가: 키워드 기반 감정 카테고리 설명 */}
      {keywords.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {uniqueCategories.map((cat) => (
            <div key={cat} style={{ marginBottom: '1.5rem' }}>
              <h3>{cat}</h3>
              <p>{emotionDescriptions[cat] || '설명이 준비되지 않았어요.'}</p>
            </div>
          ))}
        </div>
      )}

      {/* 애독가: 감정 텍스트 기반 설명 */}
      {!summary && emotionList.length > 0 && (
        <ul style={{ marginTop: '1rem' }}>
          {emotionList.map((emotion) => (
            <li key={emotion} style={{ marginBottom: '0.5rem' }}>
              <strong>{emotion}</strong>: {emotionDescriptions[emotion] || '설명이 준비되지 않았어요.'}
            </li>
          ))}
        </ul>
      )}

      {/* 추천 도서 출력 */}
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
