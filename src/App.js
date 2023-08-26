import { BrowserRouter } from "react-router-dom";

// import router
import IndexRouter from "./routes";

function App() {
  return (
    <BrowserRouter>
      <IndexRouter />
    </BrowserRouter>
  );
}

export default App;
