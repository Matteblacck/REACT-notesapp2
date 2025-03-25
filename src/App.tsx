import { Outlet } from "react-router-dom";
import "./styles/App.css";
import { ThemeContextProvider } from "./components/widgets/Theme/ThemeContext";

function App() {
  return (
    <>
    <ThemeContextProvider>
      <div>
        <Outlet />
      </div>
    </ThemeContextProvider>
      
    </>
  );
}

export default App;