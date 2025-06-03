import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSelection } from "../contexts/UserSelectionContext";
import {
  MdOutlineSpa,
  MdOutlineSelfImprovement,
  MdOutlineLightbulb,
  MdOutlineThunderstorm,
  MdOutlineRocketLaunch,
} from "react-icons/md";

const intents = [
  { id: "comfort", icon: MdOutlineSpa, label: "위로받고 싶어요" },
  {
    id: "calm",
    icon: MdOutlineSelfImprovement,
    label: "마음을 가라앉히고 싶어요",
  },
  { id: "light", icon: MdOutlineLightbulb, label: "가볍게 읽고 싶어요" },
  {
    id: "thrill",
    icon: MdOutlineThunderstorm,
    label: "긴장감 넘치는 걸 읽고 싶어요",
  },
  {
    id: "genre",
    icon: MdOutlineRocketLaunch,
    label: "장르소설이 좋아요 (SF/호러/판타지 등)",
  },
];

export default function IntentSelect() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setSelection } = useUserSelection();

  const handleNext = () => {
    if (!selected) return;
    setSelection("intent", selected);
    navigate("/result");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      {/* 이 div에 mx-auto를 추가하여 부모 flex 컨테이너 내에서 중앙에 오도록 합니다. */}
      <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl bg-white max-w-xl w-full mx-auto animate-fade-in-up">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          어떤 종류의 책을 추천받고 싶으신가요?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {intents.map((intent) => (
            <button
              key={intent.id}
              onClick={() => setSelected(intent.id)}
              className={`flex flex-col items-center justify-center border-2 rounded-2xl p-4 sm:p-6 text-center transition-all duration-200 shadow-md transform hover:scale-[1.02] hover:shadow-lg
                ${
                  selected === intent.id
                    ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-300"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
            >
              <intent.icon className="text-4xl sm:text-5xl text-blue-500 drop-shadow-sm mb-2" />
              <div className="mt-2 text-sm sm:text-base font-semibold">
                {intent.label}
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
          추천받기
        </button>
      </div>
    </div>
  );
}
