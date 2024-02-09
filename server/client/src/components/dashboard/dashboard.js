import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { FaUser, FaCartArrowDown,FaMoneyCheckAlt, FaEllipsisV } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { FcSalesPerformance } from "react-icons/fc";
import StockChart from './StockChart';
import { Link } from 'react-router-dom';
import BarChart from './EarningsChart';
import Map from './map/Map';
import { index } from 'd3';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCustomers, setOpenCustomers] = useState(false);
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
         <div className='customers col' onClick={()=>{setOpenCustomers(!openCustomers)}}>
          <p>Customers: <FaUser className='totalC'/> </p>
          <h6>total Customers:  {dashboardData.totalCustomers}</h6> 
          {openCustomers && 
            <Modal show={openCustomers} onHide={() => setOpenCustomers(!openCustomers)}>
              <Modal.Header>
              <Modal.Title>Customers :</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {dashboardData.customerNames.map((customer, index) => (
                  <div key={index} className='container text-cente'>
                    <div className='row align-items-start'>
                      <div className="col border-bottom">
                        <p>{customer.name}</p>
                      </div>
                      <div className="col mx-2"><p>From</p></div>
                      <div className="col border-bottom">
                        <p>{customer.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setOpenCustomers(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
          }
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
  <Modal show={open} onHide={() => setOpen(!open)}>
    <Modal.Header closeButton>
      <Modal.Title>Latest Orders</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ overflowY: 'auto', maxHeight:"440px",overflowX:"hidden"}}>
    {dashboardData.latestOrders.slice(-5).map((order, index) => {
  const orderId = `#${index + 1}`;
  return (
    <div className='card mx-5 my-2 shadow-sm' style={{ width: "24rem" }} key={order._id}>
      <div className='card-body'>
        <div className='d-flex'>
          <div className='p-1 flex-grow-1'>
            {orderId}
          </div>
          <div className='p-1'>
            <Link to={`/orderDetails/${order._id}`} onClick={() => handleViewDetails(order._id)}>
              <FaEllipsisV />
            </Link>
          </div>
        </div>
        <h2 className='card-title'>{order.customerName}</h2>
        <h4 className='card-subtitle mb-2 text-body-secondary'>Price : {order.totalPrice} MAD</h4>
        <div className='status card-text d-flex justify-content-center mx-5' style={{ backgroundColor: order.status === 'Delivered' ? 'greenyellow' : 'red' }}>
          {order.status}
        </div>
      </div>
    </div>
  );
})}

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
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
