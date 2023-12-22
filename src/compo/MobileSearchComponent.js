

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductItem = styled.li`
  width: 48%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MobileSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceOptions] = useState(['All',100, 500, 700]);
  const [nameOptions] = useState(['All', 'Samsung', 'Apple', 'Google']);
  const [typeOptions] = useState(['All', 'Smartphone', 'Tablet', 'Feature Phone']);
  const [filters, setFilters] = useState({ price: 'All', name: 'All', type: 'All' });
  const [mobiles, setMobiles] = useState([]);

  const handleSearch = async () => {
    //  query string based on filters
    const queryString = `?price=${filters.price}&name=${filters.name}&type=${filters.type}`;

    try {
      const response = await fetch(`http://localhost:5000/api/mobiles/search${queryString}`);
      const data = await response.json();

      setMobiles(data);
      console.log('Search Results:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetching all mobiles when the component mounts
    const fetchAllMobiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mobiles');
        const data = await response.json();
        console.log(data);
        setMobiles(data);
        console.log('Fetched all mobiles:', data);
      } catch (error) {
        console.error('Error fetching all mobiles:', error);
      }
    };

    fetchAllMobiles();
  }, []); 

  return (
    <Container>
      <Title>Mobile Search</Title>
      <div>
        <label htmlFor="priceFilter">Price:</label>
        <Dropdown
          id="priceFilter"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        >
          {priceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Dropdown>
      </div>
      <div>
        <label htmlFor="nameFilter">Name:</label>
        <Dropdown
          id="nameFilter"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        >
          {nameOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Dropdown>
      </div>
      <div>
        <label htmlFor="typeFilter">Type:</label>
        <Dropdown
          id="typeFilter"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Dropdown>
      </div>
      <div>
        <label htmlFor="searchQuery">Search:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </div>

      {/* Display the fetched mobiles */}
      <ProductList>
        {mobiles.map((mobile) => (
          <ProductItem key={mobile.id}>
            <img src="https://via.placeholder.com/150" alt={mobile.name} />
            <h3>{mobile.name}</h3>
            <p>Price: ${mobile.price}</p>
            <p>Type: {mobile.type}</p>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

export default MobileSearchComponent;
