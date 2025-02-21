import React, { useState } from 'react';
import { PackageSearch, AlertCircle, Calendar, Truck, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const TrackOrders = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
  
    const sampleTrackingSteps = [
      { status: 'Order Placed', date: '2024-02-18', completed: true },
      { status: 'Confirmed', date: '2024-02-18', completed: true },
      { status: 'Shipped', date: '2024-02-19', completed: true },
      { status: 'Out for Delivery', date: '2024-02-21', completed: false },
      { status: 'Delivered', date: null, completed: false }
    ];
  
    const handleTracking = (e) => {
      e.preventDefault();
      // Simulate tracking lookup
      setTrackingResult({
        orderNumber: 'ORD-2024-001',
        status: 'In Transit',
        steps: sampleTrackingSteps
      });
    };
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-200 mb-6">Track Orders</h1>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <form onSubmit={handleTracking} className="space-y-4">
            <div>
              <label htmlFor="tracking" className="block text-sm font-medium text-gray-200 mb-2">
                Enter Tracking Number
              </label>
              <input
                type="text"
                id="tracking"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="e.g., ORD-2024-001"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              Track Order
            </button>
          </form>
        </div>
  
        {trackingResult && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-200">Order #{trackingResult.orderNumber}</h2>
              <p className="text-yellow-500">{trackingResult.status}</p>
            </div>
            <div className="space-y-8">
              {trackingResult.steps.map((step, index) => (
                <div key={step.status} className="relative flex items-center">
                  {index < trackingResult.steps.length - 1 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-12 ${step.completed ? 'bg-yellow-500' : 'bg-slate-600'}`} />
                  )}
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${step.completed ? 'bg-yellow-500' : 'bg-slate-700'}`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-slate-900" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-slate-600" />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-200">{step.status}</p>
                    {step.date && (
                      <p className="text-sm text-gray-400">{format(new Date(step.date), 'MMM dd, yyyy')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default TrackOrders;