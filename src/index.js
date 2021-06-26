import React from 'react';
import ReactDOM from 'react-dom';
import 'App.css';
import Layout from './infrastructure/layout.jsx';
// import Test from './Test.jsx';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <>
      <Layout/>
       {/*<Test/>*/}
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
