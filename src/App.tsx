
import {Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import Catalog from "./routes/ClientHome/Catalog";
import Cart from "./routes/ClientHome/Cart";
import { useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import Login from "./routes/ClientHome/Login";
import SignUp from "./routes/ClientHome/SignUp";
import Admin from "./routes/ClientHome/Admin";
import AdminHome from "./routes/ClientHome/Admin/AdminHome";
import RecoveryLogin from "./routes/ClientHome/RecoveryLogin";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from './utils/history';

export default function App() {

  const [contextCartCount, setContextCartCount] = useState<number>(0);

  return (
    <ContextCartCount.Provider value={{contextCartCount, setContextCartCount}}>
    <HistoryRouter history={history}>
    <Routes>
      <Route path="/" element={<ClientHome />}>
      <Route index element={<Catalog />}/>
        <Route path="catalog" element={<Catalog />}/>
        <Route path="product-details/:productId" element={<ProductDetails />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<SignUp />}/>
        <Route path="recovery" element={<RecoveryLogin />}/>
      </Route>
      <Route path="/admin/" element={<Admin/>}>
      <Route index element={<AdminHome />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </HistoryRouter>
    </ContextCartCount.Provider>
  );
}
