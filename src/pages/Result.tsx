import { useUserSelection } from "../contexts/UserSelectionContext";
import { BsBook } from "react-icons/bs";

const mockRecommendations = [
  {
    id: 1,
    title: "작은 것들의 신",
    description: "작지만 깊은 위로를 주는 인도 소설",
    tags: ["위로", "감정", "중급"],
  },
  {
    id: 2,
    title: "SF 단편선: 시간의 주름",
    description: "흥미로운 과학적 상상력을 자극하는 SF 소설",
    tags: ["SF", "장르소설", "가볍게"],
  },
  {
    id: 3,
    title: "고요한 밤의 심연",
    description: "불안을 가라앉히는 심리 스릴러",
    tags: ["긴장감", "감정", "고급"],
  },
];

const getLabel = (
  id: string | null,
  type: "readingLevel" | "emotion" | "intent"
) => {
  if (!id) return "선택 안됨";
  switch (type) {
    case "readingLevel":
      if (id === "low") return "거의 안 읽어요";
      if (id === "mid") return "가끔 읽어요";
      if (id === "high") return "자주 읽어요";
      break;
    case "emotion":
      if (id === "joy") return "기쁨";
      if (id === "sadness") return "슬픔";
      if (id === "anxiety") return "불안";
      if (id === "fatigue") return "무기력";
      if (id === "loneliness") return "외로움";
      break;
    case "intent":
      if (id === "comfort") return "위로받고 싶어요";
      if (id === "calm") return "마음을 가라앉히고 싶어요";
      if (id === "light") return "가볍게 읽고 싶어요";
      if (id === "thrill") return "긴장감 넘치는 걸 읽고 싶어요";
      if (id === "genre") return "장르소설이 좋아요";
      break;
    default:
      return id;
  }
  return id; // fallback
};

export default function Result() {
  const { readingLevel, emotion, intent } = useUserSelection();

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      {/* 이 div에 mx-auto를 추가하여 부모 flex 컨테이너 내에서 중앙에 오도록 합니다. */}
      <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl bg-white max-w-2xl w-full mx-auto mt-8 mb-8 animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          추천 결과
        </h1>
        <div className="bg-blue-50 p-4 sm:p-5 rounded-xl mb-6 border border-blue-100 shadow-inner text-center text-blue-700 text-sm sm:text-base font-medium">
          <p className="mb-2">
            <strong>독서 수준:</strong> {getLabel(readingLevel, "readingLevel")}
          </p>
          <p className="mb-2">
            <strong>감정 상태:</strong> {getLabel(emotion, "emotion")}
          </p>
          <p>
            <strong>추천 의도:</strong> {getLabel(intent, "intent")}
          </p>
        </div>

        <div className="grid gap-6">
          {mockRecommendations.map((book) => (
            <div
              key={book.id}
              className="border border-gray-200 rounded-xl p-4 sm:p-5 shadow-md bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-300 transform hover:scale-[1.01]"
            >
              <div className="flex items-center mb-2">
                <BsBook className="text-3xl sm:text-4xl text-blue-500 mr-3 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {book.title}
                </h2>
              </div>
              <p className="text-sm sm:text-base mt-1 text-gray-700">
                {book.description}
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {book.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
