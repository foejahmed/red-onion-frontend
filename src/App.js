import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Menu from './Components/Menu/Menu';
import Food_Detail from './Components/Food_Detail/Food_Detail';
import Cart from './Components/Cart/Cart';
import Review from './Components/Review/Review';

import Breakfast from './Components/Menu/Breakfast';
import Lunch from './Components/Menu/Lunch';
import Dinner from './Components/Menu/Dinner';
import Login from './Components/Login/Login';
import Ship from './Components/Ship/Ship'
import { AuthContextProvider, PrivateRoute } from './Components/Login/useAuth';
import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Login/SignUp';
import Inventory from './Components/Inventory/Inventory';

function App() {
  return (
    <div>
      <AuthContextProvider>
      <Header></Header>

      <Router>
        <Switch>

          {/* <Route path='/breakfast'>
            <CategoryHeader></CategoryHeader>
            <Breakfast></Breakfast>
          </Route>
          <Route path='/lunch'>
            <CategoryHeader></CategoryHeader>
            <Lunch></Lunch>
          </Route>
          <Route path='/dinner'>
            <CategoryHeader></CategoryHeader>
            <Dinner></Dinner>
          </Route> */}

          <PrivateRoute path='/cart'>
            <Cart></Cart>
          </PrivateRoute>

          <Route path='/review'>
            <Review></Review>
          </Route>

          <Route path='/inventory'>
            <Inventory></Inventory>
          </Route>

          <Route path='/food/:foodId'>
            <Food_Detail></Food_Detail>
          </Route>

          <Route path="/signin">
            
            <SignIn></SignIn>
          </Route>

          <Route path="/signup">
            
            <SignUp></SignUp>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/ship">
            <Ship></Ship>
          </Route>

          <Route exact path='/'>
            {/* <CategoryHeader></CategoryHeader> */}
            <Menu></Menu>
          </Route>

          

          <Route path="*">
            <h1>Page Not Found</h1>
          </Route>

        </Switch>
      </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;