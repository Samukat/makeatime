import React, { useState } from 'react';
import './App.scss';

function App() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="App">
      <h1>Make A Time</h1>
    </div>
  );
}

export default App;
