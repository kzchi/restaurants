// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./routes/Home";
// import RestaurantDetailPage from "./routes/RestaurantDetailPage";
// import RestaurantUpdatePage from "./routes/RestaurantUpdatePage";

// const app = () => {
//   return (
//     <div>
//       <Router>
//         <Route exact path="/" component={Home} />
//         <Route
//           exact
//           path="/restaurants/:id/update"
//           component={RestaurantUpdatePage}
//         />
//         <Route exact path="/restaurants/:id" component={RestaurantDetailPage} />
//       </Router>
//     </div>
//   );
// };

// export default app;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import RestaurantUpdatePage from "./routes/RestaurantUpdatePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/" element={<Home />} exact />
          {/* <Route
            exact
            path="/restaurants/:id/update"
            component={RestaurantUpdatePage}
          />
          <Route
            exact
            path="/restaurants/:id"
            component={RestaurantDetailPage} */}
          {/*             
          /> */}
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
  );
}

export default App;
