'use client';

import styles from './products.module.scss';
import { useEffect, useState } from 'react';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [search, setSearch] = useState('');
    const [icProducts, setIcProducts] = useState([]);
     
    // async function getShop() {
    //     let result = await fetch('/api/shop');
    //     let res = await result.json();
    //     if (res && res.length > 0) {
    //         setShops(res);
    //     }
    // }

    async function getIcProducts() {
        let result = await fetch('/api/ic_product');
        let res = await result.json();
        if (res && res.length > 0) {
            setIcProducts(res);
        }
    }

    async function getProducts() {
        let result = await fetch('/api/products');
        let res = await result.json();
        if (res && res.length > 0) {
            setProducts(res);
        }
    }

    useEffect(() => {
        // getShop();
        getIcProducts();
        getProducts();
    }, []);
    

    const handleQuantityChange = (productId, quantity) => {
        setSelectedProducts(prev => ({
            ...prev,
            [productId]: quantity
        }));
    };

    const handleOrder = () => {
        console.log("Selected Products:", selectedProducts);
    };

    const filteredProducts = products.filter(product => 
        !search || (product.title && product.title.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Select Products</h1>
            <input 
                type="text" 
                placeholder="Search products..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className={styles.searchBox} 
            />
            <div className={styles.productList}>
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        {/* <img src={product.image_url} alt={product.title} className={styles.productImage} /> */}
                        {icProducts.find(p => p.id === product.product_id)?.image_url && (
                                    <img
                                        src={icProducts.find(p => p.id === product.product_id)?.image_url}
                                        alt={icProducts.find(p => p.id === product.product_id)?.title}
                                        className={styles.productImage}
                                    />
                                )}
                        <div className={styles.productDetails}>
                            <h2 className={styles.productTitle}> {icProducts.find(p => p.id === product.product_id)?.title || 'N/A'} </h2>
                            <p className={styles.productPrice}>Price: {product.price}</p>
                            <p className={styles.productNote}>{product.note}</p>
                            <label>Quantity:</label>
                            <select onChange={(e) => handleQuantityChange(product.id, e.target.value)} className={styles.quantitySelect}>
                                <option value="">Select Quantity</option>
                                {product.availability?.map((quantity, index) => (
                                    <option key={index} value={quantity}>{quantity}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )) : <p>No products available</p>}
            </div>
            <button onClick={handleOrder} className={styles.orderButton}>Place Order</button>
        </div>
    );
}
