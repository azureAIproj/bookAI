import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Book = {
  title: string;
  summary: string;
};

function Recommend() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emotion = queryParams.get('emotion') || '';

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // 여기에 Azure Function 호출 예정 (현재는 더미 데이터)
    const fetchBooks = async () => {
      // 📌 실제로는 emotion을 Azure API에 POST 요청해야 함
      const dummyBooks: Book[] = [
        { title: '어린 왕자', summary: '순수한 마음으로 세상을 바라보는 이야기' },
        { title: '죽음에 관하여', summary: '인생과 죽음에 대해 성찰하는 깊은 이야기' },
        { title: '멋진 신세계', summary: '감정을 통제받는 사회에 대한 경고' }
      ];
      setBooks(dummyBooks);
    };

    fetchBooks();
  }, [emotion]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📚 {emotion} 감정에 맞춘 추천 도서</h2>
      <ul>
        {books.map((book, idx) => (
          <li key={idx} style={{ marginBottom: '1rem' }}>
            <strong>{book.title}</strong>
            <p>{book.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommend;
