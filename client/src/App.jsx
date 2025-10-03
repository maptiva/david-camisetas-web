import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <>
      <Header />
      <main>
        <h2>Nuestros Productos</h2>
        <ProductList />
      </main>
      <WhatsAppButton />
    </>
  );
}

export default App;