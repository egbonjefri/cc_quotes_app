import {Provider} from 'react-redux'
import store from '../reducers/store'
import '../styles/materialize.css'


export default function App({ Component, pageProps }){
    return(
        <Provider store={store}>
<Component {...pageProps} />
<p className='center'>Created by @egbonjefri for Codecademy</p>
        </Provider> )
}