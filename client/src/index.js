import React from 'react';
import ReactDOM from 'react-dom';
import dotnenv from "dotenv";
import App from './App';

// Load environment variables
dotnenv.config();
ReactDOM.render(<App />, document.getElementById('root'));
