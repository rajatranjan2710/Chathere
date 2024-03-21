import { createAction, createReducer } from "@reduxjs/toolkit";

export const setProfileOpen = createAction("SET_PROFILE_OPEN");
export const setProfileDefault = createAction("SET_PROFILE_DEFAULT");

const initialState = {
  isProfileOpen: false,
};

export const utilReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProfileOpen, (state) => {
      state.isProfileOpen = !state.isProfileOpen;
      // console.log(state.isProfileOpen);
    })
    .addCase(setProfileDefault, (state) => {
      state.isProfileOpen = false;
    });
});
