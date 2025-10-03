import React from 'react';
import styles from './Header.module.css';
import logo from '../assets/logo.png'; // Asumiré que moveremos el logo a assets

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="David CAMISETAS Logo" className={styles.headerLogo} />
      <div className={styles.headerContent}>
        <h1>David CAMISETAS</h1>
        <p>Producción y venta de productos personalizados</p>
      </div>
      <div className={styles.headerIcons}>
        <a href="https://www.instagram.com/davidcamisetas/" target="_blank" rel="noopener noreferrer" className={styles.instagramBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <button className={styles.carritoBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span className={`${styles.carritoContador} ${styles.visible}`}>0</span>
        </button>
      </div>
    </header>
  );
};

export default Header;