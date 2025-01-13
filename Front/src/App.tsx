import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DashboardPage from "./components/dashboard/DashboardPage";
import { DarkModeProvider } from "./context/DarkModeContext";

const App = () => {
  return (
    <DarkModeProvider>
      <Router>
        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboards/:code" element={<DashboardPage />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
};

export default App;
