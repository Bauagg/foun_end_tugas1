import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import storeUser from "./redux/store/store-login-logout";


// import router
import IndexRouter from "./routes";

function App() {
  return (
    <Provider store={storeUser}>
      <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
