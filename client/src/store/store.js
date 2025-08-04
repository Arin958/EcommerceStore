import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./Auth/auth";
import productAdminReducer from "./Admin/productAdmin";
import productUserReducer from "./User/productUser";
import cartReducer from "./Cart/cartSlice";
import checkoutReducer from "./Checkout/Checkout";
import orderReducer from "./Order/orderSlice";
import orderAdminReducer from "./Order/orderAdminSlice";
import userAdminReducer from "./Admin/getAllUser";
import adminDashboardReducer from "./Admin/adminDashboard";
import notificationReducer from "./Notification/notifcationSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  productAdmin: productAdminReducer,
  productUser: productUserReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  order: orderReducer,
  orderAdmin: orderAdminReducer,
  userAdmin: userAdminReducer,
  adminDashboard: adminDashboardReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persist = persistStore(store);
