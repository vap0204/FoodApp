import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { createRoot } from 'react-dom';
createRoot(document.getElementById('root')).render(<App />);