import React, { useState } from "react";
import Login from "./pages/LoginPage";
import QuoteList from "./pages/QuoteListPage";

const App: React.FC = () => {
  const [token, setToken] = useState("");

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="app">
      <QuoteList token={token} />
    </div>
  );
};

export default App;
