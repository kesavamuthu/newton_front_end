import React from "react";
import Manipulator from "./components-excel/manipulator";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Product from "./components-product-form/productParent";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Product />
          </Route>
          <Route path="/products">
            <Manipulator />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
