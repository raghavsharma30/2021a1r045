import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Products = () => {
  const { categoryname, productid } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/categories/${categoryname}/products/${productid}`);
        setProduct(response.data);
      } catch (error) {
        console.error(`Error fetching product details:`, error.message);
      }
    };
    fetchProductDetails();
  }, [categoryname, productid]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <h1 className="product-details-title">{product.productName}</h1>
      <div className="products-info">
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating} stars</p>
        <p>Description: {product.description}</p>
      </div>
    </div>
  );
};

export default Products;
