// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CssBaseline, Container, AppBar } from '@mui/material';
import {store} from './redux/store';
import Login from './components/Login';
import './App.css';
import Navbar from "./components/Navbar";
import ShoppingList from "./pages/ShoppingList";
import Register from "./components/Register";
import CartSummary from "./pages/CartSummary";
import UserOrders from "./pages/UserOrders";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <Provider store={store}>
        <CssBaseline />
        <Router>
          <AppBar position="static">
              <Navbar/>
          </AppBar>
          <Container>
            <Routes>
                <Route path="/" element={<ShoppingList />} />
              <Route path="/cart" element={<CartSummary />} />

              <Route path="/login" element={<Login  />} />
                <Route path="/register" element={<Register  />} />
                <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <UserOrders />
                    </ProtectedRoute>
                }
            />
            </Routes>
          </Container>
        </Router>
      </Provider>
  );
}

export default App;
