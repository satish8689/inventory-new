'use client';

import { useEffect, useState } from 'react';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ shop_id: '', ic_product_id: '', price: '', note: '', desc: '', position: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        console.log("calling")
        // fetch('/api/shop_products')
        //     .then((res) => res.json())
        //     .then((data) => setProducts(data))
        //     .catch((err)=>{
        //         console.log("---------->error", err)
        //     });
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method =  'POST';
        const url ='/api/shop';

        console.log("form", form)
        // const bodyData = {

        // }
        // const res = await fetch(url, {
        //     method,
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(form),
        // });

        // if (res.ok) {
        //     const updatedProducts = await res.json();
        //     setProducts(updatedProducts);
        //     setForm({ shop_id: '', ic_product_id: '', price: '', note: '', desc: '', position: '' });
        //     setEditingId(null);
        // }

        // e.preventDefault();
        // const method = editingId ? 'PUT' : 'POST';
        // const url = editingId ? `/api/shop_products/${editingId}` : '/api/shop_products';

        // const res = await fetch(url, {
        //     method,
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(form),
        // });

        // if (res.ok) {
        //     const updatedProducts = await res.json();
        //     setProducts(updatedProducts);
        //     setForm({ shop_id: '', ic_product_id: '', price: '', note: '', desc: '', position: '' });
        //     setEditingId(null);
        // }
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/shop_products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Manage Shop Products</h1>
            <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded-md">
                <input name="shop_id" placeholder="Shop ID" value={form.shop_id} onChange={handleChange} required />
                <input name="ic_product_id" placeholder="Product ID" value={form.ic_product_id} onChange={handleChange} required />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
                <input name="note" placeholder="Note" value={form.note} onChange={handleChange} />
                <input name="desc" placeholder="Description" value={form.desc} onChange={handleChange} />
                <input name="position" placeholder="Position" value={form.position} onChange={handleChange} />
                <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
            </form>
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Shop</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Note</th>
                        <th>Description</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.shop_id}</td>
                            <td>{product.ic_product_id}</td>
                            <td>{product.price}</td>
                            <td>{product.note}</td>
                            <td>{product.desc}</td>
                            <td>{product.position}</td>
                            <td>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
