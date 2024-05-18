import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import RestaurantUpdatePage from "./routes/RestaurantUpdatePage";
import { RestaurantContextProvider } from "./context/RestaurantContext";
import { StrictMode } from "react";

function App() {
  return (
    <StrictMode>
      <RestaurantContextProvider>
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} exact />

              <Route
                path="/restaurants/:id/update"
                element={<RestaurantUpdatePage />}
                exact
              />
              <Route
                path="/restaurants/:id"
                element={<RestaurantDetailPage />}
                exact
              />
            </Routes>
          </BrowserRouter>
        </div>
      </RestaurantContextProvider>
    </StrictMode>
  );
}

export default App;
