import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
const quotesProvider = require("../supabase");
const quotesGetter = quotesProvider.from("quotes");

export const fetchAllQuotes = createAsyncThunk('quotes/fetchAllQuotes', async ()=>{
    const { data, error } = await quotesGetter
    .select("*");
    if(error) throw error;
 
    return data
})

const quoteSlice = createSlice({
    name: 'quotes',
    initialState: { quotes: [], status: 'idle', error:null },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllQuotes.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchAllQuotes.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.quotes = action.payload;
        })

        .addCase(fetchAllQuotes.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default quoteSlice.reducer