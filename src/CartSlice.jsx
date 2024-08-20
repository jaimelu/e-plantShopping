import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
            state.totalQuantity += 1;
        },
        
        removeItem: (state, action) => {
            console.log("removeItem called");
        
            // Find the item to remove by matching the name
            const itemToRemove = state.items.find(item => item.name === action.payload);
        
            if (itemToRemove) {
                // Subtract the item's quantity from the total quantity
                state.totalQuantity -= itemToRemove.quantity;
                console.log(`state.totalQuantity: ${state.totalQuantity}`);
        
                state.items = state.items.filter(item => item.name !== action.payload);
            }
        },
        
        

        updateQuantity: (state, action) => {
            console.log(`updateQuantity called with state: ${state.items} and action: ${action}` )
            const { name, quantity } = action.payload;
            console.log(`Received name: ${name}, received quantity: ${quantity}`)
            const itemToUpdate = state.items.find(item => item.name === name);
            console.log(`itemToUpdate: ${itemToUpdate}`)
            if (itemToUpdate) {
                const quantityDifference = quantity - itemToUpdate.quantity;
                state.totalQuantity += quantityDifference;
                itemToUpdate.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
