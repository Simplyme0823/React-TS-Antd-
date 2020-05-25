import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

import App from './App'

ReactDOM.render(
    //将store传递给app组件
    <Provider store={store}>
        <App />
    </Provider>, document.querySelector('#root'));
