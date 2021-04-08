import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import { AuthContextProvider } from './components/context/AuthContext';
import reducers from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)))
ReactDOM.render(
  <AuthContextProvider>
  <Provider store = {store}>
     <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </AuthContextProvider>,
  

  document.getElementById('root')
);
