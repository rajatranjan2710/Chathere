import { createAction, createReducer } from "@reduxjs/toolkit";

export const updateConversation = createAction("UPDATE_CONVERSATION");
export const updateNotificationCount = createAction("UPDATE_CONVO_ON_NOTI");
export const updatedSelecctedConversation = createAction(
  "UPDATED_SELECTED_CONVERSATION"
);
export const deleteSelecctedConversation = createAction(
  "DELETE_SELECTED_CONVERSATION"
);
export const updatedMessages = createAction("UPDATE_MESSAGES");
export const updatedMessageOnSend = createAction("UPDATE_MESSAGE_ONSEND");

const initialState = {
  conversations: [],
  messages: [],
  notificationsCount: {},
  selectedConversation: null,
};

export const conversationsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateConversation, (state, action) => {
      state.conversations = action.payload.filteredusers;
      // console.log("New state is ", state.conversations);
    })

    //updating conversation array when there is notification
    .addCase(updateNotificationCount, (state, action) => {
      state.notifications = action.payload;
      // console.log("new state of notification : ", state.notificationsCount);
    })

    //updating the selected conversation

    .addCase(updatedSelecctedConversation, (state, action) => {
      const id = action.payload;
      const filteredSelctedConversation = state.conversations.find(
        (item) => item._id === id
      );
      state.selectedConversation = { ...filteredSelctedConversation };
      console.log("Selection conversation : ", state.selectedConversation);
    })

    // updating message array
    .addCase(updatedMessages, (state, action) => {
      state.messages = action.payload;
      // console.log("working");
      // console.log("New state of messages :", state.messages);
    })

    //updating message array whenever we send a message
    .addCase(updatedMessageOnSend, (state, action) => {
      state.messages = [...state.messages, action.payload];
      // console.log(state.messages);
    })

    // deleted selected conversation on logout
    .addCase(deleteSelecctedConversation, (state) => {
      state.selectedConversation = null;
    });
});
