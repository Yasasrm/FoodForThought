import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import TabIdProvider from "./components/context/NavTabSelectContext";
import BodyLayout from "./components/BodyLayout";

function App() {
  const items = [
    {
      name: "Category",
      link: "https://jsonplaceholder.typicode.com/posts",
    },
    {
      name: "Products",
      link: "https://jsonplaceholder.typicode.com/comments",
    },
    {
      name: "Donation",
      link: "https://jsonplaceholder.typicode.com/albums",
    },
    {
      name: "User",
      link: "https://jsonplaceholder.typicode.com/users",
    },
  ];

  return (
    <div className="App container">
      <div className="row">
        <TabIdProvider>
          <NavBar list={items} name="Admin - Food for Thought" />
          <BodyLayout />
        </TabIdProvider>
      </div>
    </div>
  );
}

export default App;
