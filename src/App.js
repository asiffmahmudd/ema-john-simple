import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import React, { createContext, useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/Productdetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { initializeLoginFramework } from './components/Login/firebaseManager';
import { AuthProvider } from './Context/AuthContext';

const app = initializeLoginFramework();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
      setSearch(event.target.value);
  }

  return (
    <AuthProvider>
      <Router>
        <Header handleSearch={handleSearch}></Header>
        <Switch>
          <Route path="/shop">
            <Shop search={search}></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route exact path="/">
            <Shop search={search}></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
