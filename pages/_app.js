import {Provider} from 'react-redux'
import store from './store'
import '../styles/materialize.css'


export default function App({ Component, pageProps }){
    return(
        <Provider store={store}>
<Component {...pageProps} />
<p className='center'>Created by @egbonjefri for Codecademy</p>
        </Provider> )
}