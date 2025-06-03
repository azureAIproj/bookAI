// Home.tsx
import { useNavigate } from "react-router-dom";
import { BsBookHalf } from "react-icons/bs";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl bg-white text-center max-w-sm sm:max-w-md w-full mx-auto animate-fade-in-up">
        <div className="flex justify-center mb-6 sm:mb-8">
          <BsBookHalf className="text-7xl sm:text-8xl text-blue-500 drop-shadow-md" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
          감정 기반 독서 추천 앱
        </h1>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl mb-8">
          오늘 기분에 맞는 책을 추천해드릴게요!
        </p>
        <button
          onClick={() => navigate("/reading-level")}
          className="relative px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
