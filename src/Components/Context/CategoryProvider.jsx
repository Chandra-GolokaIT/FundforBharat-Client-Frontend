import React, { useState, useEffect } from 'react';
import { CategoryContext } from './CategoryContext';
import axios from 'axios';
import { ADMIN_URL } from '../../constants/constant';
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${ADMIN_URL}/api/admin/categories/active`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
