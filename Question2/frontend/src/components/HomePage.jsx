import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const HomePage = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompany && selectedCategory) {
      navigate(`/categories/${selectedCategory}/products?company=${selectedCompany}`);
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Select the company and category !!</h1>
      <form className="homepage-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Select Company:
            <select className="form-select" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
              <option value="">Select a company</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Select Category:
            <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        <button className="form-button" type="submit">Search Products</button>
      </form>
    </div>
  );
};

export default HomePage;
