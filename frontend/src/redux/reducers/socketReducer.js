import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSocketData = createAction("socket/setSocket");
export const setOnlineUsers = createAction("socket/setOnlineUsers");
export const clearSocket = createAction("socket/clearSocket");

const initialState = {
  onlineUsers: [],
  socketData: null,
};

export const socketReducer = createReducer(initialState, (builder) => {
  // adding socket to state
  builder
    .addCase(setSocketData, (state, action) => {
      state.socketData = action.payload;
      console.log("new state : ", state.socketData);
    })

    .addCase(clearSocket, (state) => {
      state.socket = null;
      state.onlineUsers = [];
    })

    //setting online users
    .addCase(setOnlineUsers, (state, action) => {
      state.onlineUsers = action.payload;
      console.log("new state is :", state.onlineUsers);
    });
});
