import { useDataStore } from "./DataStore";
import Login from "./LoginRegister";
import Main from "./Main";

function App() {
  const { state } = useDataStore();
  return !state.user ? <Login /> : <Main />;
}

export default App;
