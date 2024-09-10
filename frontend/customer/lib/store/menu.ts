import { KEYMENU } from "@/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
    keyMenu: string;
}

const initialState: MenuState = {
    keyMenu: ""
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        changeInfoMenu(state, action:PayloadAction<MenuState>) {
            state.keyMenu = action.payload.keyMenu;
        },
    },
});

export const menuActions = menuSlice.actions;

export default menuSlice.reducer;
