import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronUp, ArrowUpDown, Truck, 
  Package, CheckCircle, Clock, AlertCircle, Printer, Download,
  Archive, Trash2, Check, X
} from 'lucide-react';
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardContent 
} from '../components/ui/Card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/Alert";

const MyOrders = () => {
  const [orders] = useState([
    {
      id: "ORD-2024-001",
      date: "2024-02-20",
      books: [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", condition: "Good", price: 12.99 },
        { title: "1984", author: "George Orwell", condition: "Very Good", price: 15.99 }
      ],
      status: "Delivered",
      detailedStatus: {
        orderPlaced: "Feb 20, 2024 09:15 AM",
        processing: "Feb 20, 2024 10:30 AM",
        shipped: "Feb 20, 2024 02:45 PM",
        delivered: "Feb 21, 2024 11:20 AM"
      },
      total: 28.98
    },
    {
      id: "ORD-2024-002",
      date: "2024-02-19",
      books: [
        { title: "Pride and Prejudice", author: "Jane Austen", condition: "Fair", price: 8.99 }
      ],
      status: "In Transit",
      detailedStatus: {
        orderPlaced: "Feb 19, 2024 03:20 PM",
        processing: "Feb 19, 2024 04:15 PM",
        shipped: "Feb 20, 2024 09:30 AM",
        estimated: "Feb 22, 2024"
      },
      total: 8.99
    },
    // Add more orders here for pagination demo
  ]);

  const [expandedOrders, setExpandedOrders] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ field: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [showBulkActionAlert, setShowBulkActionAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ title: '', message: '', type: '' });
  const ordersPerPage = 5;

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(orderId)) {
        newSelected.delete(orderId);
      } else {
        newSelected.add(orderId);
      }
      return newSelected;
    });
  };

  const toggleSelectAll = () => {
    if (selectedOrders.size === currentOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(currentOrders.map(order => order.id)));
    }
  };

  const handleBulkAction = (action) => {
    let alertConfig = {
      title: '',
      message: '',
      type: 'success'
    };

    switch (action) {
      case 'print':
        alertConfig = {
          title: 'Print Started',
          message: `Printing ${selectedOrders.size} order${selectedOrders.size > 1 ? 's' : ''}`,
          type: 'success'
        };
        break;
      case 'download':
        alertConfig = {
          title: 'Download Started',
          message: `Downloading ${selectedOrders.size} order${selectedOrders.size > 1 ? 's' : ''}`,
          type: 'success'
        };
        break;
      case 'archive':
        alertConfig = {
          title: 'Orders Archived',
          message: `${selectedOrders.size} order${selectedOrders.size > 1 ? 's' : ''} archived successfully`,
          type: 'success'
        };
        break;
      case 'delete':
        alertConfig = {
          title: 'Orders Deleted',
          message: `${selectedOrders.size} order${selectedOrders.size > 1 ? 's' : ''} moved to trash`,
          type: 'success'
        };
        break;
      default:
        return;
    }

    setAlertInfo(alertConfig);
    setShowBulkActionAlert(true);
    setTimeout(() => setShowBulkActionAlert(false), 3000);
    setSelectedOrders(new Set());
  };

  // Color theme
  const theme = {
    primary: 'indigo',
    success: 'emerald',
    warning: 'amber',
    danger: 'rose',
    info: 'sky'
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Sorting function
  const sortOrders = (orders) => {
    return [...orders].sort((a, b) => {
      if (sortConfig.field === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (sortConfig.field === 'total') {
        return sortConfig.direction === 'asc' 
          ? a.total - b.total
          : b.total - a.total;
      }
      return 0;
    });
  };

  const handleSort = (field) => {
    setSortConfig(prevConfig => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filter and sort orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.books.some(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    ) || order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedOrders = sortOrders(filteredOrders);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "In Transit":
        return <Truck className="h-5 w-5 text-blue-600" />;
      case "Processing":
        return <Package className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const StatusTimeline = ({ detailedStatus }) => (
    <div className="space-y-4 mt-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div className="flex-1">
          <p className="font-medium">Order Placed</p>
          <p className="text-sm text-gray-600">{detailedStatus.orderPlaced}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5 text-green-600" />
        <div className="flex-1">
          <p className="font-medium">Processing</p>
          <p className="text-sm text-gray-600">{detailedStatus.processing}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Truck className="h-5 w-5 text-green-600" />
        <div className="flex-1">
          <p className="font-medium">Shipped</p>
          <p className="text-sm text-gray-600">{detailedStatus.shipped}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className={`h-5 w-5 ${detailedStatus.delivered ? 'text-green-600' : 'text-gray-400'}`} />
        <div className="flex-1">
          <p className="font-medium">Delivered</p>
          <p className="text-sm text-gray-600">
            {detailedStatus.delivered || `Estimated: ${detailedStatus.estimated}`}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by book title, author, or order ID"
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Processing</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => handleSort('date')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
          >
            <ArrowUpDown className="h-4 w-4" />
            Date {sortConfig.field === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('total')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
          >
            <ArrowUpDown className="h-4 w-4" />
            Total {sortConfig.field === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
        </div>

        {/* Bulk Action Alert */}
        {showBulkActionAlert && (
          <Alert className={`mb-4 ${
            alertInfo.type === 'success' ? 'bg-emerald-50 border-emerald-200' :
            alertInfo.type === 'warning' ? 'bg-amber-50 border-amber-200' :
            'bg-rose-50 border-rose-200'
          }`}>
            <AlertTitle className="text-lg text-black font-semibold">{alertInfo.title}</AlertTitle>
            <AlertDescription className="text-black">{alertInfo.message}</AlertDescription>
          </Alert>
        )}

        {/* Header with Bulk Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          
          {selectedOrders.size > 0 && (
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button
                onClick={() => handleBulkAction('print')}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white rounded-lg border shadow-sm hover:bg-gray-50"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button
                onClick={() => handleBulkAction('download')}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white rounded-lg border shadow-sm hover:bg-gray-50"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white rounded-lg border shadow-sm hover:bg-gray-50"
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="flex items-center gap-2 px-3 py-2 text-white bg-rose-600 rounded-lg shadow-sm hover:bg-rose-700"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Select All Header */}
        {currentOrders.length > 0 && (
          <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
            <input
              type="checkbox"
              checked={selectedOrders.size === currentOrders.length}
              onChange={toggleSelectAll}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">
              {selectedOrders.size === 0 ? 'Select all orders' :
               selectedOrders.size === currentOrders.length ? 'Deselect all orders' :
               `${selectedOrders.size} order${selectedOrders.size > 1 ? 's' : ''} selected`}
            </span>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {currentOrders.map(order => (
            <Card 
              key={order.id} 
              className={`overflow-hidden border-l-4 transition-all duration-200 ${
                selectedOrders.has(order.id) ? 'ring-2 ring-indigo-500 bg-indigo-50' : 'hover:shadow-md'
              }`}
              style={{
                borderLeftColor: order.status === 'Delivered' ? `#${theme.success}-500` : 
                               order.status === 'In Transit' ? `#${theme.info}-500` : 
                               `#${theme.warning}-500`
              }}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedOrders.has(order.id)}
                  onChange={() => toggleOrderSelection(order.id)}
                  className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                
                <div className="flex-1 cursor-pointer" onClick={() => toggleOrderExpansion(order.id)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                      <div className="flex items-center gap-2">
                        <StatusIcon status={order.status} />
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                      </div>
                      <span className="text-gray-600">{order.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                      {expandedOrders[order.id] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>
              </CardHeader>

              {expandedOrders[order.id] && (
                <CardContent>
                  <div className="border-t pt-4 mt-2">
                    {/* Status Timeline */}
                    <StatusTimeline detailedStatus={order.detailedStatus} />
                    
                    {/* Books List */}
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Order Details</h3>
                      <div className="space-y-4">
                        {order.books.map((book, index) => (
                          <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg border">
                            <div>
                              <h4 className="font-medium text-blue-600">{book.title}</h4>
                              <p className="text-gray-600">{book.author}</p>
                              <span className="inline-block mt-1 px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                                Condition: {book.condition}
                              </span>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="font-medium">${book.price.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {sortedOrders.length > 0 && (
          <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-sm">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {sortedOrders.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;