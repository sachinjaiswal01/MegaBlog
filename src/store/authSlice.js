import { createSlice } from "@reduxjs/toolkit";

// user login Or not and by default data of user
const intialState=  {
     status : false,
     userData : null
}

const authSlice = createSlice({
    name:"auth",
    intialState,
    reducers : { 
        login : (state,action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout : (state) =>{
            state.status = false;
            state.userData = null;
        } 
    }
})

export const {login , logout} = authSlice.actions;
export default authSlice.reducer;