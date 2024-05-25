import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,


};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
  
    setLogin: (state, action) => {
      // console.log(action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
   
    setLogout:(state)=>{
return initialState
    },
   
  },
});

export const { setLogin, setLogout} =
  AuthSlice.actions;

export default AuthSlice.reducer;
