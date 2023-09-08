import { BrowserRouter } from "react-router-dom";
import { MazeGenerator } from "./MazeGenerator";

function App() {
  return (
    <BrowserRouter>
      <>
        <h2>React Projects</h2>
        <MazeGenerator/>
      </>
    </BrowserRouter>
  )
}

export default App
