import Sidebar from "./componenets/Sidebar/Sidebar";
import Feed from "./componenets/Feed/Feed";
import Widgets from "./componenets/Widgets/Widgets";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />

      <Feed />

      {/* <Widgets /> */}
    </div>
  );
}

export default App;
