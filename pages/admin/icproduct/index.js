'use client';

import styles from './icproduct.module.scss';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import Resizer from 'react-image-file-resizer';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ title: '', image_url: '' });
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    
    async function getProduct(){
        let result = await fetch('/api/ic_product');
        let res = await result.json();
        if(res && res.length > 0){
            setProducts(res);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            Resizer.imageFileResizer(
                file,
                150, // maxWidth
                150, // maxHeight
                'JPEG', // format
                100, // quality
                0, // rotation
                (uri) => {
                    setForm({ ...form, image_url: uri });
                },
                'base64' // outputType
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = '/api/ic_product';
        form.id = editingId ? editingId: '';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            getProduct();
            setForm({ title: '', image_url: '' });
            setEditingId(null);
        }else if(res.status == 400){
            setError("Product already exists")
        }
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/ic_product`, { 
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id
            }),
        });
        if (res.ok) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Manage Shop Products</h1>
            <p className={styles.error}> {error} </p>
            <form onSubmit={handleSubmit} className={styles.form}>
                {form.image_url && <img src={form.image_url} alt="Preview" className={styles.previewImage} />}
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
                <button type="submit" className={styles.addproduct}>{editingId ? 'Update' : 'Add'}</button>
            </form>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 && products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td><img src={product.image_url} alt={product.title} className={styles.productImage} /></td>
                            <td>{product.title}</td>
                            <td>
                                <button onClick={() => handleEdit(product)} className={styles.editbtn}> <FaEdit /></button>
                                <button onClick={() => handleDelete(product.id)} className={styles.deletebtn}> <FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
