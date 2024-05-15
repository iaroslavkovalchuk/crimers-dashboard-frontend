import { configureStore, createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data : [],
        sendTimer: 5
    },
    reducers: {
        setData: (state, action) => {
            const payloadData = action.payload;
            const obj = {}
            console.log("data", state.data);

            payloadData.forEach((item) => {
                if(!obj[item.customer_id]) {
                    obj[item.customer_id] = {
                        ...item,
                        data: [item]
                    }
                } else {
                    const itemData = obj[item.customer_id];
                    itemData.data.push(item);
                }
            })
            state.data = Object.values(obj) || [];
        },
        updateMessageStatus: (state, action) => {
            const { itemIndex, childIndex, newStatus } = action.payload;
            // Check if the itemIndex and childIndex are valid
            if (state.data[itemIndex] && state.data[itemIndex].data[childIndex]) {
                // Directly update the message_status using Immer's proxy state
                state.data[itemIndex].data[childIndex].message_status = newStatus;
            }
        },
        setSendTimer: (state, action) => {
            state.sendTimer = action.payload;
        },
    }
})

export default notificationSlice.reducer;
export const { setData, updateMessageStatus, setSendTimer } = notificationSlice.actions;