import React, { useState } from 'react';
import AutoComplete from './components/AutoComplete';
import './App.css';

function App() {
  const [search, setSearch] = useState('');

  const onChange = (value: string) => {
    setSearch(value)
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Country Auto Complete</h1>
      </header>
      <AutoComplete search={search} onChange={onChange}/>
    </div>
  );
}

export default App;
