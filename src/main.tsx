import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/themeContext.tsx";
import { BooksProvider } from "./context/booksContext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BooksProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </BooksProvider>
      </ThemeProvider>
      <ToastContainer autoClose={1000} pauseOnHover={true} />
    </BrowserRouter>
  </StrictMode>
);
