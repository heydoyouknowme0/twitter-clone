import Sidebar from "./componenets/Sidebar/Sidebar";
import Feed from "./componenets/Feed/Feed";
import Widgets from "./componenets/Widgets/Widgets";
import "./App.css";
import Signup from "./componenets/auth/SingUp";
import Login from "./componenets/auth/Login";

function App() {
  return (
    <div className="App">
      <Sidebar />

      <Feed />

      <Widgets />

      <Login />
    </div>
  );
}

export default App;
