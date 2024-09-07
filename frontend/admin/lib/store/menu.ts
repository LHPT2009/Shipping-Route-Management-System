import { KEYMENU, LABELMENU } from "@/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
    labelMenu: string;
    keyMenu: string;
}

const initialState: MenuState = {
    labelMenu: LABELMENU.DASHBOARD,
    keyMenu: KEYMENU.DASHBOARD
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        changeInfoMenu(state, action:PayloadAction<MenuState>) {
            const label = action.payload.labelMenu.charAt(0).toUpperCase() + action.payload.labelMenu.slice(1)
            state.labelMenu = label;
            state.keyMenu = action.payload.keyMenu;
        },
    },
});

export const menuActions = menuSlice.actions;

export default menuSlice.reducer;
