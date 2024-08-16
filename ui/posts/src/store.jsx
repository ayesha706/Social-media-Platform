import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './redux/userSlice'
import { apiSlice } from './redux/postSlice'
export const store = configureStore({
  reducer: {
      [userSlice.reducerPath]: userSlice.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat( userSlice.middleware, apiSlice.middleware),
})
