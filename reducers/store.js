

import {configureStore} from '@reduxjs/toolkit';
import quoteSlice from './fetchAllQuotesSlice'
import singleQuoteSlice from './fetchRandomQuoteSlice';
const store = configureStore({
    reducer: {
        quotes: quoteSlice,
        singleQuote: singleQuoteSlice,
    }
})


export default store;