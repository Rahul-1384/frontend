import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/order/orders-detail/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')?.access}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 text-yellow-500 w-5" />;
      case 'shipped':
        return <Truck className="h-5 text-blue-500 w-5" />;
      case 'delivered':
        return <CheckCircle className="h-5 text-green-500 w-5" />;
      case 'cancelled':
        return <XCircle className="h-5 text-red-500 w-5" />;
      default:
        return <Package className="h-5 text-gray-500 w-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-b-2 border-indigo-600 h-12 rounded-full w-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="lg:px-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      <h1 className="text-2xl text-gray-900 font-bold mb-6">My Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md duration-300 hover:shadow-lg overflow-hidden transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <Package className="h-6 text-indigo-600 w-6" />
                  <span className="text-gray-900 text-lg font-semibold">
                    Order #{order.id}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(order.status)}
                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
                <div>
                  <p className="text-gray-500 text-sm">Order Type</p>
                  <p className="text-gray-900 font-medium">
                    {order.order_type.charAt(0).toUpperCase() + order.order_type.slice(1)}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Order Date</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Last Updated</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(order.updated_at).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Order Details</p>
                  <p className="text-gray-900 font-medium">
                    {order.rental ? 'Rental Order' : 
                     order.donation ? 'Donation Order' : 'Sale Order'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="bg-white rounded-lg shadow text-center py-12">
            <Package className="h-12 text-gray-400 w-12 mx-auto" />
            <h3 className="text-gray-900 text-sm font-medium mt-2">No orders</h3>
            <p className="text-gray-500 text-sm mt-1">
              You haven't placed any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;