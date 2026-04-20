import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../slices'; 
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice'
import categoryReducer from '../features/categories/categoriSlice'
import bannerReducer from '../features/banner/bannerSlice'
import orderReducer from '../features/order/orderSlice'
import reviewReducer  from '../features/review/review'

const store = configureStore({
  reducer: {
    ...rootReducer, 
    auth: authReducer,
    product:productReducer,
    category:categoryReducer,
    banner:bannerReducer,
    order:orderReducer,
    reviews:reviewReducer
  },

});

export default store;
