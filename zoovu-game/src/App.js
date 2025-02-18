import React, { useState } from 'react'
import './App.css';
import WelcomeScreen from '../src/components/WelcomeScreen';
import GameScreen from '../src/components/GameScreen';

const App = () => {
  const [submited, setSubmited ] = useState(false);
  const [name, setName ] = useState('');
  const handleSubmit = () => {
    setSubmited(true);
  };

  return (
    <div className="App">
      {submited ? (
        <GameScreen  userName={name}/>
      ) : (
        <header className="App-header">
          <WelcomeScreen onSubmit={handleSubmit} userName={name} setUserName={setName}/>
        </header>
      )}
    </div>
  )
}

export default App;

