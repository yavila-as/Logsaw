import React, { useState } from 'react'
import './App.css';
import WelcomeScreen from '../src/containers/WelcomeScreen';
import GameScreen from '../src/containers/GameScreen';

const App = () => {
  const [submited, setSubmited ] = useState(false);
  const [name, setName ] = useState('');
  const handleSubmit = () => {
    setSubmited(true);
  };

  return (
    <div className="App">
      {submited ? (
        <GameScreen  userName={name}  userName={name} />
      ) : (
          <header className="App-header">
            <WelcomeScreen onSubmit={handleSubmit} userName={name} setUserName={setName}/>
          </header>
      )}
    </div>
  )
}

export default App;

