import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header'
import { ProductGrid } from './ProdutcsGrid';
import './HomePage.css';

function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data)
      });
  },[]);


  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products}/>
      </div>
    </>
  );
}

export default HomePage;