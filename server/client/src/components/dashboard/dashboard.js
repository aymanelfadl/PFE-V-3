import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { FaUser, FaCartArrowDown,FaMoneyCheckAlt, FaEllipsisV, FaBars } from 'react-icons/fa';
import { FcSalesPerformance } from "react-icons/fc";
import StockChart from './StockChart';
import { Link } from 'react-router-dom';
import BarChart from './EarningsChart';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalProductsPerSupplier, setTotalProductsPerSupplier] = useState([]); // Initialize as an empty array
  const [open , setOpen] =useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/dashboardData');
        const data = await response.json();
        setDashboardData(data);

        // Fetch total products per supplier
        const totalProductsPerSupplierResponse = await fetch('http://localhost:5000/api/dashboard/totalProductsPerSupplier');
        const totalProductsPerSupplierData = await totalProductsPerSupplierResponse.json();
        setTotalProductsPerSupplier(totalProductsPerSupplierData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (orderId) => {
    setSelectedOrder(orderId);
  };
   

  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  return (
    <div className='dash container'>
       <section className='row'>
         <div className='customers col'>
          <p>Customers: <FaUser className='totalC'/> </p>
          <h6>total Customers:  {dashboardData.totalCustomers}</h6> 
         </div>
          <div className='customers col'>
            <p>Orders: <FaCartArrowDown className='totalC'/> </p>
            <h6> Total Orders: {dashboardData.totalOrders}</h6> 
          </div>
          <div className='customers col'>
            <p>Sales: <FaMoneyCheckAlt  className='totalC'/></p>
            <h6>Total Sales: {dashboardData.sales}</h6>
          </div>
         
          <div className='customers col'>
             <p>Earnings  <FcSalesPerformance className='totalC' /> </p>
           <h6>Total Earnings : {dashboardData.earnings} MAD</h6>  
          </div>
        
       </section>
        
       <div style={{ width: open? "" : "280px" }}>
  <div className='latestorders'>
    <div className='Obar' onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
      <h4>Recent Orders</h4>
    </div>

    {open && (
      <table className='table' id='latestOrders'>
        <tbody>
          {dashboardData.latestOrders.map((order, index) => {
            const orderId = index + 1;
            return (
              <td key={order._id} id='latestO'>
                <div className='client'>
                  {orderId}
                  <Link
                    to={`/orderDetails/${order._id}`}
                    onClick={() => handleViewDetails(order._id)}
                    className='lien'
                  >
                    <FaEllipsisV style={{ marginLeft: "30px" }} />
                  </Link>
                  <p>{order.customerName}</p>
                  <h6 id='price'>Price: {order.totalPrice + " MAD"}</h6>
                  <center>
                    <div
                      className='status'
                      style={{
                        backgroundColor: order.Status === 'Delivered' ? 'greenyellow' : 'red',
                        paddingLeft: order.Status === 'Delivered' ? '30px' : '10px',
                      }}
                    >
                      {order.Status}
                    </div>
                  </center>
                </div>
              </td>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
</div>

  <div className='row mt-3'>
        <div className='container shadow mx-4 col'>
          <BarChart/>
         </div>
        <div className=' container shadow mx-4 col'>
          <StockChart/>  
        </div> 
    </div>
    </div>
  );
};

export default Dashboard;
