import { MantineProvider } from "@mantine/core";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import NewNote from "./pages/NewNote";
import Home from "./pages/Home";
import ShowNote from "./pages/ShowNote";
import EditNote from "./pages/EditNote";

import "./App.css";

function App() {
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
}

export default App;
