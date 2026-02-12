import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { MENU_ITEMS } from "./components/Sidebar/Sidebar.constants";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <Sidebar menuItems={MENU_ITEMS} />
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
