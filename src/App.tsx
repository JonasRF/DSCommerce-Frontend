
import { Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import Catalog from "./routes/ClientHome/Catalog";
import Cart from "./routes/ClientHome/Cart";
import { useEffect, useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import Login from "./routes/ClientHome/Login";
import SignUp from "./routes/ClientHome/SignUp";
import Admin from "./routes/ClientHome/Admin";
import AdminHome from "./routes/ClientHome/Admin/AdminHome";
import RecoveryLogin from "./routes/ClientHome/RecoveryLogin";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from './utils/history';
import { PrivateRoute } from "./components/PrivateRoute";
import { AccessTokenPayloadDTO } from "./models/auth";
import { ContextToken } from "./utils/context-token";
import * as authService from "./services/auth-service";
import * as cartService from "./services/cart-service";
import RecoveryPassword from "./routes/ClientHome/RecoveryPassword";
import Confirmation from "./routes/ClientHome/Confirmation";

export default function App() {

  const [contextCartCount, setContextCartCount] = useState<number>(0);

  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  useEffect(() => {
    setContextCartCount(cartService.getCart().items.length);

    if(authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, [])

  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
    <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<ClientHome />}>
            <Route index element={<Catalog />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="product-details/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="confirmation/:orderId" element={<Confirmation />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="recovery" element={<RecoveryLogin />} />
            <Route path="/recover-password/:token" element={< RecoveryPassword />} />
          </Route>
          <Route path="/admin/" element={<PrivateRoute roles={["ROLE_ADMIN"]}><Admin /></PrivateRoute>}>
            <Route index element={<AdminHome />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HistoryRouter>
    </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}
