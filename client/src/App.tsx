import "./App.css";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="container">
      <h1>יצירת פוסט!!!!</h1>
      <PostCreate />
      <hr />
      <h1>פוסטים</h1>
      <PostList />
    </div>
  );
}

export default App;
