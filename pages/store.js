

import {configureStore} from '@reduxjs/toolkit';
import quoteSlice from './reducers/fetchAllQuotesSlice'
import singleQuoteSlice from './reducers/fetchRandomQuoteSlice';
const store = configureStore({
    reducer: {
        quotes: quoteSlice,
        singleQuote: singleQuoteSlice,
    }
})


export default store;