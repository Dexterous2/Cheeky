import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import auth from "./auth/auth";
import payment from "./payment/payment";
import user from "./user/user";
import marketplace from "./marketPlaceSlice/MarketPlace";
import productSlice from "./products/product";
import connections from "./connections/connections";
import Chat from "./chat/Chat";
import Wallet from "./wallet/Wallet";
import Card from "./card/Card";
import order from "./order/order";
import instaAuth from "./instaAuth/instaAuth";

export const store = configureStore({
    reducer: {
        [auth.reducerPath]: auth.reducer,
        [payment.reducerPath]: payment.reducer,
        [user.reducerPath]: user.reducer,
        [marketplace.reducerPath]: marketplace.reducer,
        [productSlice.reducerPath]: productSlice.reducer,
        [connections.reducerPath]: connections.reducer,
        [Chat.reducerPath]: Chat.reducer,
        [Wallet.reducerPath]: Wallet.reducer,
        [Card.reducerPath]: Card.reducer,
        [order.reducerPath]: order.reducer,
        [instaAuth.reducerPath]: instaAuth.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(auth.middleware).concat(payment.middleware).concat(user.middleware).concat(marketplace.middleware).concat(productSlice.middleware).concat(connections.middleware).concat(Chat.middleware).concat(Wallet.middleware).concat(Card.middleware).concat(order.middleware).concat(instaAuth.middleware)
});

setupListeners(store.dispatch);
export default store;
