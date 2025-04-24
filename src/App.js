import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CryptoTable from './components/CryptoTable/CryptoTable';
import { CryptoWebSocket } from './features/crypto/cryptoService';
import { store } from './app/store';
import styles from './App.css';
import logo from './assets/logos/logo.png'; // Add your logo file

function App() {
  useEffect(() => {
    const ws = new CryptoWebSocket(store);
    ws.connect();
    
    return () => {
      ws.disconnect();
    };
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          
          <h1>Crypto Market Tracker</h1>
          <p>Real-time cryptocurrency prices with Bitcoin reflections</p>
        </div>
      </header>
      <main className={styles.main}>
        <CryptoTable />
      </main>
    </div>
  );
}

export default App;