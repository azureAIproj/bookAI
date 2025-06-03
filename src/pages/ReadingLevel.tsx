import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSelection } from "../contexts/UserSelectionContext";
import { PiBookLight, PiBookDuotone, PiBookFill } from "react-icons/pi"; // 아이콘 이름 확인

const levels = [
  {
    id: "low",

    label: "거의 안 읽어요",

    desc: "(한 달에 0~1권)",

    icon: PiBookLight,
  },

  {
    id: "mid",

    label: "가끔 읽어요",

    desc: "(한 달에 1~2권)",

    icon: PiBookDuotone,
  },

  {
    id: "high",

    label: "자주 읽어요",

    desc: "(한 달에 3권 이상)",

    icon: PiBookFill,
  },
];

export default function ReadingLevel() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setSelection } = useUserSelection();

  const handleNext = () => {
    if (!selected) return;
    setSelection("readingLevel", selected);
    navigate("/emotion");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      {/* 이 div에 mx-auto를 추가하여 부모 flex 컨테이너 내에서 중앙에 오도록 합니다. */}
      <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl bg-white max-w-xl w-full mx-auto animate-fade-in-up">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          당신의 독서 빈도는 어느 정도인가요?
        </h2>
        <div className="space-y-4">
          {levels.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`w-full flex flex-col sm:flex-row items-center sm:justify-start p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 shadow-md transform hover:scale-[1.02] hover:shadow-lg
                ${
                  selected === item.id
                    ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-300"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
            >
              <item.icon className="text-4xl sm:text-5xl text-blue-500 flex-shrink-0 mb-2 sm:mb-0 sm:mr-4" />
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-xl font-semibold">
                  {item.label}
                </div>
                <div className="text-sm sm:text-base text-gray-500 mt-0.5">
                  {item.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selected}
          className={`mt-8 w-full py-3 rounded-full font-semibold text-lg sm:text-xl transition-all duration-300 shadow-lg
            ${
              !selected
                ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
            }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
