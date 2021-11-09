import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import store from "./store";
import BaseRouter from "./components/BaseRouter";

function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <BaseRouter />
      </Router>
    </ReduxProvider>
  );
}

export default App;
