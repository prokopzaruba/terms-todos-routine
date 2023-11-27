import "./App.css";
import Tasks from "./Tasks";
import Routine from "./Routine";
import Nav from "./Nav";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function App() {
  const [activeLink, setActiveLink] = useState(0);
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Nav setActiveLink={setActiveLink} activeLink={activeLink} />
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/routine" element={<Routine />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
