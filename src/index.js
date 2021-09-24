import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
// app.listen(port);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
