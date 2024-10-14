import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatState {
  chatMessage: {
    message: string;
    isAi: boolean;
  }[];
  isOpen: boolean;
}

const initialState: ChatState = {
  chatMessage: [
    {
      message: "Hi there! Please let us know how we can help you today.",
      isAi: true,
    },
  ],
  isOpen: false
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<{
      message: string;
      isAi: boolean;
    }>) {
      state.chatMessage.push(action.payload);
    },
    clearMessage(state) {
      state.chatMessage = [];
    },
    openChat(state) {
      state.isOpen = true;
    },
    closeChat(state) {
      state.isOpen = false;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
