import React from "react";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Quiz App</h1>
      </header>
      <main>
        <Quiz />
      </main>
    </div>
  );
}

export default App;
