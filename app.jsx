import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // Import global styles
import MainPage from './main.jsx'; // Import the main component

// App component - Root of the React application
function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);