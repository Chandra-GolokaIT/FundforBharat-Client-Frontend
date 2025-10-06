import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/constant';
import { CategoryContext } from '../Context/CategoryContext';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

function CategoriesContainer({ onCategorySelect, activeCategory }) {
    const { categories } = useContext(CategoryContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 900);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const getCategorySlug = (categoryName) => {
        return categoryName.toLowerCase().replace(/ & /g, ' and ').replace(/\s+/g, '-');
    };

    const handleCategoryClick = async (category) => {
        try {
            const endpoint =
                category.name === "All Categories"
                    ? `${BASE_URL}/api/campaigns/get-all`
                    : `${BASE_URL}/api/campaigns/getByCategory/${getCategorySlug(category.name)}`;

            const response = await axios.get(endpoint);
            onCategorySelect(response.data || [], category.name);
            
            // Close dropdown on mobile after selection
            if (isMobile) {
                setIsDropdownOpen(false);
            }
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            onCategorySelect([], category.name);
            
            // Close dropdown on mobile even if there's an error
            if (isMobile) {
                setIsDropdownOpen(false);
            }
        }
    };

    // Mobile dropdown version
    if (isMobile) {
        return (
            <div className='categories-dropdown-container'>
                <div 
                    className='categories-dropdown-header'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span className='categories-dropdown-title'>
                        {activeCategory || "All Categories"}
                    </span>
                    {isDropdownOpen ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
                </div>
                
                {isDropdownOpen && (
                    <div className='categories-dropdown-menu'>
                        <span
                            key="all"
                            className={activeCategory === "All Categories" ? 'active-category-dropdown' : 'category-dropdown-item'}
                            onClick={() => handleCategoryClick({ name: "All Categories" })}
                        >
                            All Categories
                        </span>

                        {categories.map((category) => (
                            <span
                                key={category.id}
                                className={activeCategory === category.name ? 'active-category-dropdown' : 'category-dropdown-item'}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Desktop version (original)
    return (
        <div className='categories-container'>
            <h5>CATEGORIES</h5>

            <span
                key="all"
                className={activeCategory === "All Categories" ? 'active-category' : ''}
                style={{ cursor: 'pointer' }}
                onClick={() => handleCategoryClick({ name: "All Categories" })}
            >
                All Categories
            </span>

            {categories.map((category) => (
                <span
                    key={category.id}
                    className={activeCategory === category.name ? 'active-category' : ''}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category.name}
                </span>
            ))}
        </div>
    );
}

export default CategoriesContainer;