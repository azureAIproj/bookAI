import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReadingLevel from "./pages/ReadingLevel";
import EmotionSelect from "./pages/EmotionSelect";
import IntentSelect from "./pages/IntentSelect";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reading-level" element={<ReadingLevel />} />
        <Route path="/emotion" element={<EmotionSelect />} />
        <Route path="/intent" element={<IntentSelect />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
