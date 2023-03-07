import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import AntProvider from './common/AntProvider';
import { store } from './redux/store';

const container = document.getElementById('ueo-deliver-order-root');
export const PRIMARY_COLOR = '#31b4a9';
if (container) {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <AntProvider primaryColor={PRIMARY_COLOR} prefix='scms'>
                    <App />
                </AntProvider>
            </Provider>
        </BrowserRouter>,
        container,
    );
}
