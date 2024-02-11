// OrderByDateChart.js
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const OrderByDateChart = () => {
  const [ordersByDate, setOrdersByDate] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter is 'all'
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders by date data based on the selected filter
        const ordersByDateResponse = await fetch(`http://localhost:5000/api/dashboard/ordersByDate?filter=${filter}`);
        
        if (!ordersByDateResponse.ok) {
          throw new Error(`HTTP error! Status: ${ordersByDateResponse.status}`);
        }
  
        const ordersByDateData = await ordersByDateResponse.json();
        setOrdersByDate(ordersByDateData);
      } catch (error) {
        console.error('Error fetching orders by date data:', error);
      }
    };
  
    fetchData();
  }, [filter]);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing Chart instance
      chartRef.current.destroy();
    }

    // Extract labels (dates) and values (total orders) from data
    const labels = ordersByDate.map((order) => order._id);
    const values = ordersByDate.map((order) => order.totalOrders);

    // Create a bar chart
    const ctx = document.getElementById('orderByDateChart');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Orders per Day',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: `Orders Chart - ${getFilterLabel(filter)}`, // Add filter label to the title
          },
        },
      },
    });
  }, [ordersByDate, filter]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const getFilterLabel = (selectedFilter) => {
    switch (selectedFilter) {
      case 'all':
        return 'All Time';
      case 'week':
        return 'One Week';
      case 'month':
        return 'One Month';
      case 'year':
        return 'One Year';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className='my-4'> 
        <button onClick={() => handleFilterChange('all')} className='btn btn-primary mx-2'>All</button>
        <button onClick={() => handleFilterChange('week')} className='btn btn-primary mx-3' >One Week</button>
        <button onClick={() => handleFilterChange('month')} className='btn btn-primary mx-3'>One Month</button>
        <button onClick={() => handleFilterChange('year')} className='btn btn-primary mx-2'>One Year</button>
      </div>
      <canvas id="orderByDateChart" />
    </div>
  );
};

export default OrderByDateChart;
