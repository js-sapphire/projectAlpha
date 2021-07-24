import { makeStore } from "./makeStore";

const reducer = (state, action) => {
    switch(action.type){
        case 'DARK':
            return {
                ...state,
                theme: "DARK"
            }
        case 'LIGHT':
            return {
                ...state,
                theme: "LIGHT"
            }
        default: 
            return state;
    }
}

const initialTheme = {
    theme: "LIGHT"
};

export const [ThemeProvider, useTheme, useThemeDispatch] = makeStore(reducer, initialTheme);
