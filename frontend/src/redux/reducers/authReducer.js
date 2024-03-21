import { createAction, createReducer } from "@reduxjs/toolkit";

export const addUser = createAction("ADD_USER");
export const deleteUser = createAction("DELETE_USER");
export const setLoggedIn = createAction("IS_LOGGED_IN");

const initialState = {
  user: null,
  userJSON: {},
  isLoggedIn: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addUser, (state, action) => {
      state.user = action.payload;
      // console.log("New value of user is ", state.user);
    })
    .addCase(deleteUser, (state) => {
      state.user = null;
    })

    .addCase(setLoggedIn, (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    });
});
