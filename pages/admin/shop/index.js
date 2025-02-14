'use client';

import styles from './shop.module.scss';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Admin() {
    const [shops, setShops] = useState([]);
    const [form, setForm] = useState({ name: ''});
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    
    async function getShop(){
        let result = await fetch('/api/shop');
        let res = await result.json();
        if(res && res.length > 0){
            setShops(res);
        }
    }

    useEffect(() => {
        getShop();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = '/api/shop';
        editingId && {...form, id:editingId};
        console.log("form", form)
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            getShop();
            setForm({ name: ''});
            setEditingId(null);
        }else if(res.status == 400){
            setError("Shop already exists")
        }
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/shop`, { 
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id
            }),
        });
        if (res.ok) {
            setShops(shops.filter((p) => p.id !== id));
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Manage Shops</h1>
            <p className={styles.error}> {error} </p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <button type="submit" className={styles.addproduct}>{editingId ? 'Update' : 'Add'}</button>
            </form>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shops.length > 0 && shops.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
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
