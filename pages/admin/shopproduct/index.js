'use client';

import styles from './shopproduct.module.scss';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Admin() {
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);
     const [icProducts, setIcProducts] = useState([]);
     const router = useRouter();
     const [form, setForm] = useState({ 
        shop_id: 0, 
        product_id: 0, 
        price: 0, 
        note: '', 
        description: '', 
        position: 0,
        availability: [] // New field for multi-select availability
    });
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);

    const weightOptions = [
        "100gm", "200gm", "500gm", "1kg", "2kg", "5kg", "10kg", "15kg", "20kg", "30kg", "40kg", "50kg"
    ];

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('admin_code');
        if (!isAuthenticated) {
            router.push('/admin');
        } else {
            getShop();
            getIcProducts();
            getProducts();
        }
    }, []);

    async function getShop() {
        let result = await fetch('/api/shop');
        let res = await result.json();
        if (res && res.length > 0) {
            setShops(res);
        }
    }

    async function getIcProducts() {
        let result = await fetch('/api/ic_product');
        let res = await result.json();
        if (res && res.length > 0) {
            setIcProducts(res);
        }
    }

    async function getProducts() {
        let result = await fetch('/api/shop_products');
        let res = await result.json();
        if (res && res.length > 0) {
            setProducts(res);
        }
    }

    

    useEffect(() => {
        setForm(prevForm => ({ ...prevForm, position: products?.length || 0 }));
    }, [products]);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleMultiSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setForm({ ...form, availability: selectedOptions });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = '/api/shop_products';
        const payload = editingId ? { ...form, id: editingId } : form;
        payload.product_id = Number(payload.product_id)
        payload.price = Number(payload.price)
        payload.shop_id = Number(payload.shop_id)
        payload.position = Number(payload.position)
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            getProducts();
            setForm({ shop_id: 0, product_id: 0, price: '', note: '', description: '', position: 0, availability: [] });
            setEditingId(null);
        } else if (res.status === 400) {
            setError("Product already exists");
        }
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/shop_products`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            getProducts();
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Manage Shop Products</h1>
            <p className={styles.error}>{error}</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="shop_id">Shop</label>
                    <select id="shop_id" name="shop_id" value={form.shop_id} onChange={handleChange}>
                        <option value={0}>Select Shop</option>
                        {shops.map(shop => (
                            <option key={shop.id} value={shop.id}>{shop.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="product_id">Product</label>
                    <select id="product_id" name="product_id" value={form.product_id} onChange={handleChange}>
                        <option value={0}>Select Product</option>
                        {icProducts.map(product => (
                            <option key={product.id} value={product.id}>{product.title}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>pe
                    <label htmlFor="type">Type</label>
                    <select id="type" name="type" value={form.type} onChange={handleChange}>
                        <option value={0}>Select Type</option>
                        <option value={"kg"}>KG</option>
                        <option value={"litter"}>Litter</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="note">Note</label>
                    <input id="note" name="note" placeholder="Note" value={form.note} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <input id="description" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="availability">Available In</label>
                    <select id="availability" name="availability" multiple value={form.availability} onChange={handleMultiSelectChange}>
                        {weightOptions.map((weight, index) => (
                            <option key={index} value={weight}>{weight}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="position">Position</label>
                    <input type="text" id="position" name="position" placeholder="Position" value={form.position} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <button type="submit" className={styles.addproduct}>
                        {editingId ? 'Update' : 'Add'}
                    </button>
                </div>


            </form>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Shop</th>
                        <th>Image</th>
                        <th>Product</th>
                        {/* <th>Type</th> */}
                        <th>Price</th>
                        <th>Note</th>
                        <th>Description</th>
                        <th>Availability</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 && products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{shops.find(s => s.id === product.shop_id)?.name || 'N/A'}</td>
                            <td>
                                {icProducts.find(p => p.id === product.product_id)?.image_url && (
                                    <img
                                        src={icProducts.find(p => p.id === product.product_id)?.image_url}
                                        alt={icProducts.find(p => p.id === product.product_id)?.title}
                                        className={styles.previewImage}
                                    />
                                )}
                            </td>
                            <td>
                                {icProducts.find(p => p.id === product.product_id)?.title || 'N/A'}
                            </td>
                            <td>{product.price} {product.type}</td>
                            <td>{product.note}</td>
                            <td>{product.description}</td>
                            <td>{product.availability?product.availability.join(", "):''}</td>
                            <td>{product.position}</td>
                            <td>
                                <button onClick={() => handleEdit(product)} className={styles.editbtn}><FaEdit /></button>
                                <button onClick={() => handleDelete(product.id)} className={styles.deletebtn}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
