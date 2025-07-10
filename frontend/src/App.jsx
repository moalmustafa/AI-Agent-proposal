import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProposalGenerator from "./components/ProposalGenerator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
		    <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            		  <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <div className="flex items-center space-x-4">
              <img src="https://placehold.co/40x40/0000FF/FFFFFF?text=EIoT" alt="Logo" className="h-10 rounded-full" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Eagle IoT - Proposal Generator</h1>
              </div>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </header>
          <main className="flex-grow p-6">
            <ProposalGenerator />
          </main>
          <footer className="bg-white p-4 text-center text-sm text-gray-500">
            © 2025 Eagle IoT – Digital Myth Solutions. All rights reserved.
          </footer>
        </>
      )}
    </div>
  );
}