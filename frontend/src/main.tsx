import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "../app/globals.css"
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './modules/index.ts'
import { StrictMode } from 'react';
import { ThemeProvider } from "@/components/theme-provider"

export interface Blog {
  title: string, 
  link: string, 
  description: string,
  bloggername: string,
  postdate: string ;
}

export interface News {
  title: string, 
  originallink: string, 
  description: string, 
  pubDate: string ;
}

let store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
  
)
