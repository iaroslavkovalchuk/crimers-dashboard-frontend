import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data : []
    },
    reducers: {
        setData: (state, action) => {
            const payloadData = action.payload;
            const obj = {}

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
            // console.log(obj);
        }
    }
})

export default notificationSlice.reducer;
export const { setData } = notificationSlice.actions;