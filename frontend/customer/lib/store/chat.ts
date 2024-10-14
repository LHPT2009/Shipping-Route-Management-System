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
      message: "Hệ thống có 6 loại phương tiện vận chuyển khác nhau: [www.example.com](http://www.example.com). Các loại phương tiện đó bao gồm:\n1. Truck (Xe tải)\n2. Tricycle (Xe ba bánh)\n3. Motorbike (Xe máy)\n4. Ship (Tàu)\n5. Ferry (Phà)\n6. Road (Đường bộ)\n\nNếu bạn cần thông tin cụ thể về từng loại phương tiện hoặc các route tương ứng, hãy cho tôi biết!!!",
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
