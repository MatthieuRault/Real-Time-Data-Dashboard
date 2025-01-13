import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../services/dashboardService";
import { useDarkMode } from "../context/DarkModeContext";

const Home = () => {
  const [dashboardName, setDashboardName] = useState("");
  const [dashboardCode, setDashboardCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // Création d'un nouveau dashboard
  const handleCreateDashboard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dashboardName.trim()) {
      setError("Le nom du dashboard est requis");
      return;
    }

    try {
      const response = await dashboardService.createDashboard(dashboardName);
      // Redirection vers le nouveau dashboard
      // console.log(response);
      navigate(`/dashboards/${response.code}`);
    } catch (error) {
      setError("Erreur lors de la création du dashboard");
    }
  };

  // Importation d'un dashboard existant
  const handleImportDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dashboardCode.trim()) {
      setError("Le code du dashboard est requis");
      return;
    }
    navigate(`/dashboards/${dashboardCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center sm:justify-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl px-4 sm:px-0 mt-4 sm:mt-0 space-y-6">
        <div className="text-right">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-md  dark:bg-gray-700 dark:text-white"
          >
            {darkMode ? "☀️ Mode Clair" : "🌙 Dark Mode"}
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <div className="bg-gray-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Créer un nouveau dashboard</h2>
          <form onSubmit={handleCreateDashboard} className="space-y-4">
            <div>
              <input
                type="text"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                placeholder="Nom du dashboard"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-auto sm:w-auto px-6 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Créer
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Importer un dashboard existant
          </h2>
          <form onSubmit={handleImportDashboard} className="space-y-4">
            <div>
              <input
                type="text"
                value={dashboardCode}
                onChange={(e) => setDashboardCode(e.target.value)}
                placeholder="Code du dashboard"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-auto sm:w-auto px-6 py-2.5 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Importer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
