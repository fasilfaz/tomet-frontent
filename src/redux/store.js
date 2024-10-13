import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import categoryReducer from "./features/categories/CategoriesSlice";
import productReducer from "./features/products/productSlice";
import whislistReducer from "./features/whislists/whislistSlice";
import { getWhislistFromLocalStorage } from "@/lib/localStorage";
import cartReducer from "./features/carts/cartSlice";
import orderReducer from "./features/orders/orderSlice";

const initialWhislists = getWhislistFromLocalStorage();

export const store = configureStore({
    reducer: {
        users: userReducer,
        category: categoryReducer,
        product: productReducer,
        whislists: whislistReducer,
        cart: cartReducer,
        orders: orderReducer,
    },
    preloadedState: {
        whislists: initialWhislists,
    },
});
