'use client';
import { useEffect, useState } from 'react';
export default function Home() {
    const [productss, setProductss] = useState([]);
    useEffect(() => {
        
    }, []);
    return (
        <div>
            <h1>products data</h1>
            {/* <ul>{productss.map(products => <li key={products.id}>{products.title}</li>)}</ul> */}
        </div>
    );
}