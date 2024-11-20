import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AccountContextProvider } from './context/AccountContext'
import { QuestionContextProvider } from './context/questionContext'
import { StatisticsContextProvider } from './context/StatisticsContext'
import { ReviewContextProvider } from './context/ReviewContext'
import { ReportedContextProvider } from './context/ReportedContext'
import { MenuContextProvider } from './context/MenuContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AccountContextProvider>
    <QuestionContextProvider>
    <StatisticsContextProvider>
    <ReviewContextProvider>
    <ReportedContextProvider>
      <MenuContextProvider>
        <App />
      </MenuContextProvider>
    </ReportedContextProvider>
    </ReviewContextProvider>
    </StatisticsContextProvider>
    </QuestionContextProvider>
  </AccountContextProvider>
  </React.StrictMode>
);


