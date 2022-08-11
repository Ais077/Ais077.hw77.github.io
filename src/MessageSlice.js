import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./MessApi";

const initialState = {
    allInfo: [],
}

export const postMessage = createAsyncThunk(
    'message/post',
    async (message) => {
        const res = await instance.post('/message',message);
        return res.data;
    }
)

export const getMessage = createAsyncThunk(
    'message/get',
    async ()=> {
        const res = await instance.get('/message');
        return res.data;
    }
)

const messagesSlice = createSlice({
    name: 'messagesSlice', 
    initialState, 
    extraReducers: (bulder) => {
        bulder
        .addCase(postMessage.fulfilled,(state, action)=> {
            state.allInfo.push(action.payload);
        })
        .addCase(getMessage.fulfilled,(state, action) => {
                state.allInfo = action.payload;
        })
    }
})

export default messagesSlice.reducer;
