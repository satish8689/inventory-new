'use client';

import { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import styles from './products.module.scss';
import OrderSummary from '../orderSummary.js';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [icProducts, setIcProducts] = useState([]);
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            setShowPopup(true);
        } else {
            const userData = JSON.parse(storedUser);
            setUserName(userData.name);
            setUserMobile(userData.mobile);
        }
        getProducts();
    }, []);

    async function getIcProducts() {
        let result = await fetch('/api/ic_product');
        let res = await result.json();
        if (res && res.length > 0) {
            setIcProducts(res);
            return res;
        }
    }

    async function getProducts() {
        const resultIcProduct = await getIcProducts();
        let result = await fetch('/api/products');
        let res = await result.json();
        if (res && res.length > 0) {
            let productObj = res.map(iterator => {
                let icpro = resultIcProduct.find(p => p.id === iterator.product_id);
                let productTitleDesplay = icpro?.title.split("||")
                console.log("productTitleDesplay", productTitleDesplay[0])
                return {
                    productTitle: productTitleDesplay[0]?productTitleDesplay[0] : "",
                    productImage: icpro?.image_url || "",
                    ...iterator
                };
            });
            setProducts(productObj);
        }
        setIsLoading(false); // Hide loader after fetching
    }

    const handleQuantityChange = (productId, quantity) => {
        let selectPro = products.find(p => p.id === productId);
        if (!selectPro) return;

        let numericQuantity = parseFloat(quantity);
        let quantityInKg = quantity.includes("kg") ? numericQuantity : numericQuantity / 1000;
        let totalPrice = quantityInKg * selectPro.price;

        setSelectedProducts(prev => {
            let updatedProducts = prev.map(p =>
                p.title === selectPro.productTitle
                    ? { ...p, quantity, proTotalPrice: totalPrice }
                    : p
            );

            if (!quantity) {
                updatedProducts = updatedProducts.filter(p => p.title !== selectPro.productTitle);
            } else if (!prev.some(p => p.title === selectPro.productTitle)) {
                updatedProducts.push({
                    id: selectPro.id,
                    title: selectPro.productTitle,
                    productImage: selectPro.productImage,
                    price: selectPro.price,
                    type: selectPro.type,
                    quantity,
                    proTotalPrice: totalPrice
                });
            }

            return updatedProducts;
        });
    };

    const handleOrder = () => {
        setShowOrderSummary(true);
    };

    const handleGoBack = () => {
        setShowOrderSummary(false);
    };

    if (showOrderSummary) {
        return <OrderSummary selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} goBack={handleGoBack} />;
    }

    const filteredProducts = products.filter(product =>
        !search || (product.productTitle && product.productTitle.toLowerCase().includes(search.toLowerCase()))
    );

    const handlePopupSubmit = () => {
        if (!userName.trim() || !userMobile.trim()) {
            alert("Please enter valid Name and Mobile Number");
            return;
        }

        if (!/^\d{10}$/.test(userMobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        localStorage.setItem('userInfo', JSON.stringify({ name: userName, mobile: userMobile }));
        setShowPopup(false);
    };

    return (
        <>
        <div className={styles.header}>
    <div className={styles.shopName}>My Shop</div><br/>
    <div className={styles.searchBoxCont}>
        <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchBox}
        />
    </div>
</div>
<div className={styles.container}>
            {showPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2>Enter Your Details</h2>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            type="tel"
                            placeholder="Enter Mobile Number"
                            value={userMobile}
                            onChange={(e) => setUserMobile(e.target.value)}
                            className={styles.input}
                        />
                        <button onClick={handlePopupSubmit} className={styles.submitButton}>
                            Submit
                        </button>
                    </div>
                </div>
            )}



            {/* <div className={styles.searchBoxCont}>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchBox}
            /></div>     */}
            

            {isLoading ? (
                <div className={styles.loadercontainer}><div className={styles.loader}></div></div>
            ) : (
                <div className={styles.productList}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => {
                            const selectedProduct = selectedProducts.find(p => p.title === product.productTitle);
                            return (
                                <div key={product.id} className={styles.productCard}>
                                    <img
                                        src={product.productImage}
                                        alt={product.productTitle}
                                        className={styles.productImage}
                                    />
                                    <div className={styles.productDetails}>
                                        <div className={styles.actions}>
                                            <span className={styles.productTitle}>{product.productTitle}</span>
                                            <select
                                                value={selectedProduct?.quantity || ""}
                                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                                className={styles.quantitySelect}
                                            >
                                                <option value="">Select Quantity</option>
                                                {product.availability?.map((quantity, index) => (
                                                    <option key={index} value={quantity}>{quantity}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <span className={styles.productPrice}>Rs {product.price} / 1{product.type}</span>
                                        <span className={styles.productNote}>{product.note}</span>
                                        <span className={styles.productNote}>{product.description}</span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            )}

            <button onClick={handleOrder} className={styles.orderButton}>Order Summary</button>
        </div>
        </>
        
    );
}
