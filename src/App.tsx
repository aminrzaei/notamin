import { MantineProvider } from "@mantine/core";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

// Redux Store
import store from "./store";

// Pages
import Home from "./pages/Home";
import NewNote from "./pages/NewNote";
import ShowNote from "./pages/ShowNote";
import EditNote from "./pages/EditNote";

// Styles
import "./App.css";

const App: React.FC = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/:noteId">
            <Route index element={<ShowNote />} />
            <Route path="edit" element={<EditNote />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Provider>
    </MantineProvider>
  );
};

export default App;
