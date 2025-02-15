'use client';

import { useEffect, useState } from 'react';
import { FaTrash, FaFilePdf, FaWhatsapp } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from './orderSummary.module.scss';

export default function OrderSummary({ selectedProducts = [], setSelectedProducts, goBack }) {
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) {
            setTotalAmount(0);
            return;
        }
        const total = selectedProducts.reduce((sum, product) => sum + (product.proTotalPrice || 0), 0);
        setTotalAmount(total);
    }, [selectedProducts]);

    const handleRemove = (id) => {
        if (!Array.isArray(selectedProducts)) return;
        const updatedProducts = selectedProducts.filter(product => product.id !== id);
        setSelectedProducts(updatedProducts);
    };

    const generateAndStorePDF = async () => {
        const doc = new jsPDF();
        const storedUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const userName = storedUser.name || 'Unknown';
        const userContact = storedUser.mobile || 'N/A';
        const shopName = "Test Shop";
        const shopContact = "+91 1234567890";

        doc.setFontSize(16);
        doc.text("Order Summary", 80, 10);
        doc.setFontSize(12);
        doc.text(`Customer: ${userName}`, 14, 20);
        doc.text(`Contact: ${userContact}`, 14, 30);
        doc.text(`Shop: ${shopName}`, 120, 20);
        doc.text(`Shop Contact: ${shopContact}`, 120, 30);

        let totalAmount = 0;
        let totalQuantity = 0;
        let totalProducts = selectedProducts.length;

        const tableData = selectedProducts.map((product, index) => {
            let quantityNumber = parseFloat(product.quantity) || 0;
            if (product.quantity?.includes("g")) {
                quantityNumber /= 1000;
            }
            const totalPrice = quantityNumber * (product.price || 0);
            totalAmount += totalPrice;
            totalQuantity += quantityNumber;
            return [
                index + 1,
                product.title || 'N/A',
                product.quantity || 'N/A',
                `Rs ${product.price || 0}`,
                `Rs ${totalPrice.toFixed(2)}`
            ];
        });

        doc.autoTable({
            head: [['#', 'Product', 'Quantity', 'Unit Price', 'Total Price']],
            body: tableData,
            startY: 40,
        });

        const pdfBlob = doc.output("blob");
        const formData = new FormData();
        formData.append("file", pdfBlob, "Order_Summary.pdf");

        const response = await fetch("/api/orders", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            const fileUrl = `${window.location.origin}${data.fileUrl}`;
            const whatsappMessage = encodeURIComponent(
                `🛒 *Order Summary*\n👤 Name: ${userName}\n📞 Contact: ${userContact}\n🛍️ Shop: ${shopName}\n📲 Shop Contact: ${shopContact}\n\n📦 *Total Products:* ${totalProducts}\n🔢 *Total Quantity:* ${totalQuantity.toFixed(2)} kg\n💰 *Total Amount:* Rs ${totalAmount.toFixed(2)}\n📎 Download Invoice: ${fileUrl}`
            );
            window.open(`https://wa.me/+918602148689?text=${whatsappMessage}`, "_blank");
        } else {
            alert("Failed to store the PDF.");
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button onClick={goBack} className={styles.backButton}>← Back</button>
                <h1>Order Summary</h1>
            </header>

            <div className={styles.orderList}>
                {selectedProducts.length > 0 ? (
                    selectedProducts.map((product) => (
                        <div key={product.id} className={styles.orderItem}>
                            <img src={product.productImage} alt={product.title || 'Product'} className={styles.productImage} />
                            <p className={styles.productTitle}>{product.title || 'N/A'}</p>
                            <p className={styles.quantity}>Qty: {product.quantity || 'N/A'}</p>
                            <p className={styles.price}>Rs {product.price || 0}</p>
                            <p className={styles.totalPrice}>Rs {(product.proTotalPrice || 0).toFixed(2)}</p>
                            <button onClick={() => handleRemove(product.id)} className={styles.removeButton}>
                                <FaTrash />
                            </button>
                        </div>
                    ))
                ) : <p>No products selected.</p>}
            </div>

            <footer className={styles.footer}>
                <div className={styles.summary}>
                    <p><strong>Total Products:</strong> {selectedProducts.length}</p>
                    <p><strong>Total Amount:</strong> Rs {totalAmount.toFixed(2)}</p>
                </div>
                <button onClick={generateAndStorePDF} className={styles.whatsappButton}>
                    <FaWhatsapp /> Place Order
                </button>
            </footer>
        </div>
    );
}