import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux'
import store from './app/store.js'


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
);
