import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
const quotesProvider = require("../../supabase");
const quotesGetter = quotesProvider.from("quotes");

export const fetchRandomQuote = createAsyncThunk('singleQuote/fetchRandomQuote', async ()=>{
    const {data, dataError} = await quotesGetter
    .select('*');
    if (dataError) throw Error
    let array1 = [];
    let randomNumber = Math.floor(Math.random() * data.length);
    array1.push(data[randomNumber])
    return array1
})

const singleQuoteSlice = createSlice({
    name: 'singleQuote',
    initialState: { singleQuote: [],},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRandomQuote.fulfilled, (state, action)=>{
            state.singleQuote = action.payload;
        })
    }
})

export default singleQuoteSlice.reducer