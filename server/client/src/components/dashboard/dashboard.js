import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { FaUser, FaCartArrowDown,FaMoneyCheckAlt, FaEllipsisV, FaBars } from 'react-icons/fa';
import { FcSalesPerformance } from "react-icons/fc";
import StockChart from './StockChart';
import { Link } from 'react-router-dom';
import BarChart from './EarningsChart';
import Map from './map/Map';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalProductsPerSupplier, setTotalProductsPerSupplier] = useState([]); // Initialize as an empty array
  const [open , setOpen] = useState(false);
  const [openMap , setOpenMap] = useState(false);

  const handleOrderOpen = () =>{
    setOpen(!open);
    setOpenMap(false);
  }

  const handleOpenMAp = () =>{
    setOpen(false);
    setOpenMap(!openMap);
  }
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
    <div className='dash container '>
       <section className='row '>
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
        
       <div>
  <div className='latestorders mt-3'>
    <div className='row' >
      <div className='col dashClass ' onClick={handleOrderOpen} style={{ cursor: "pointer" }}>
        <h4 className='text-center p-1 pt-2'>Recent Orders</h4>
      </div>
      <div className='col dashClass border-start'  onClick={handleOpenMAp} style={{ cursor: "pointer" }}>
        <h4 className='text-center p-1 pt-2'>Map Dashboard.</h4>
      </div>
    </div>
    {openMap && (
       <div className='container shadow'>
          <center><Map /></center> 
        </div>
    )}
    {open && (
      <table className='table' id='latestOrders' style={{marginTop:"0%"}}>
        <tbody>
          {dashboardData.latestOrders.map((order, index) => {
            const orderId = index + 1;
            return (
              <td key={order._id} id='latestO' >
                <div className='grid text-center client' style={{rowGap:"0"}}>
                  <div className='d-flex flex-row mb-3 g-col-6' >
                  <div className='p-2'>{orderId}</div> 
                  <div className='p-2'>{order.customerName}</div>
                  <div className='p-2'>
                  <Link
                    to={`/orderDetails/${order._id}`}
                    onClick={() => handleViewDetails(order._id)}
                  >
                    <FaEllipsisV style={{ marginLeft: "65px" }} />
                  </Link>
                  </div>
                  </div>
                  <div className='g-start-2'>
                  <h6 style={{marginTop:"-18px"}}>Price: {order.totalPrice + " MAD"}</h6>
                    <div
                      className='status'
                      style={{
                        backgroundColor: order.Status === 'Delivered' ? 'greenyellow' : 'red',
                      }}
                    >
                      {order.Status}
                    </div>
                </div>
                </div>
              </td>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
</div>
{!openMap &&
  <div className='container-sm row mt-2'>
        <div className='container-sm shadow mx-4 col '>
          <BarChart/>
         </div>
        <div className=' container-sm shadow mx-4 col '>
        <div className='mb-2'>
          <StockChart/>
          </div>  
        </div>
    </div>
}
    </div>
  
  );
};

export default Dashboard;
