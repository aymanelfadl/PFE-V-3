import React, { useState, useEffect } from 'react';
import NewOrderForm from './addOrder';
import { useNavigate } from 'react-router-dom';
import './AddOrder.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewOrderPage = () => {
  const [products, setProducts] = useState([]); // Fetch products from the server
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/productlist');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePlaceOrder = async (orderData) => {
    console.log('Order Data:', orderData); 
    console.log('Deliverey Date:', orderData.delivereyDate);
  console.log('Code Postal:', orderData.codePostal);

    try {
      if (!orderData.delivereyDate || !orderData.codePostal) {
        console.error('Please provide deliveryDate and CodePostal');
        // Optionally, you can display an error message to the user
        return;
      }

      const response = await fetch('http://localhost:5000/api/orders/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order placed successfully:', result.order);
        // Handle success, e.g., redirect to order details page
        toast.success('Order placed successfully!');
      } else {
        const errorData = await response.json(); // Parse error response
        console.error('Failed to place order:', errorData.error);
        // Handle failure, e.g., show an error message to the user
        toast.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
            <div className='div1'><Link to="/allOrders" exact={true}  className='orders' style={{fontFamily:'sans-serif' , fontWeight:'bold' , color:'black' }}>BACK</Link></div>
      <NewOrderForm products={products} onSubmit={handlePlaceOrder} />

      <ToastContainer
  position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>
    </div>
  );
};

export default NewOrderPage;