import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/CombineSlice.js'
import { Provider } from 'react-redux'
const store=configureStore({
    reducer:rootReducer
})
createRoot(document.getElementById('root')).render(
<Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>
)
