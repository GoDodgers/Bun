/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import React, { ReactElement, ReactHTML, ReactHTMLElement } from 'react';
import ReactDOM from 'react-dom';

import { createRoot } from 'react-dom/client';

import App from './src/app/app.tsx'

import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App></App>);
