import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">React Weather App</h1>
      <Weather city="Lisbon" />
    </div>
  );
}

export default App;
