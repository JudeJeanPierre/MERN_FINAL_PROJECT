import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) :
        [],
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const newItem = action.payload;

            const itemIn = state.cart.cartItems.find((item) =>
                item._id === newItem._id);

            const cartItems = itemIn ? state.cart.cartItems.map(
                (item) => item._id === itemIn._id ? newItem : item)
                : [...state.cart.cartItems, newItem];

                localStorage.setItem('cartItems', JSON.stringify(cartItems))

            return { ...state, cart: { ...state.cart, cartItems } };
               
        case 'CART_DELETE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) =>
                item._id !== action.payload._id
            );

            localStorage.setItem('cartItems', JSON.stringify(cartItems))

            return { ...state, cart: { ...state.cart, cartItems } };
        }
        default:
            return state;
    }
}
export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>{children}</Store.Provider>
}