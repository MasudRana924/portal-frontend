import React, { useState } from 'react';
import { DatePicker, Button, Modal } from 'antd';
import { Calendar, Search } from 'lucide-react';
import axios from 'axios'; // Import Axios for API calls
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const itemsPerPage = 20;

  // Sample merchant data
  const merchants = Array.from({ length: 100 }, (_, index) => ({
    uuid: `UUID-${index + 1}`,
    merchantName: `Merchant ${index + 1}`,
    businessType: ['Retail', 'Service', 'Food', 'Technology'][Math.floor(Math.random() * 4)],
    productType: ['Electronics', 'Clothing', 'Food', 'Software'][Math.floor(Math.random() * 4)],
    merchantWallet: `Wallet-${index + 1}`,
    merchantTechPerson: {
      name: `Tech Person ${index + 1}`,
      email: `tech${index + 1}@example.com`,
      phone: `+1234567${index.toString().padStart(4, '0')}`,
    },
    KAM: {
      email: `kam${index + 1}@example.com`,
      phone: `+9876543${index.toString().padStart(4, '0')}`,
    },
    initiateDate: new Date(2024, 0, index + 1).toISOString(),
  }));

  // Filter merchants based on active search query (only when search button is clicked)
  const filteredMerchants = merchants.filter(merchant =>
    activeSearchQuery ? (
      merchant.merchantName.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      merchant.businessType.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      merchant.productType.toLowerCase().includes(activeSearchQuery.toLowerCase())
    ) : true
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMerchants = filteredMerchants.slice(startIndex, endIndex);

  // Handle report generation and download
  const handleGenerateReport = async () => {
    if (!dateRange) {
      alert('Please select a date range');
      return;
    }
  
    try {
      const response = await axios.get('https://portal-back-maxp.onrender.com/api/v1/export', {
        params: {
          startDate: dateRange[0].format('YYYY-MM-DD'),
          endDate: dateRange[1].format('YYYY-MM-DD'),
          format: 'excel', // Ensure format is set to 'excel'
        },
        responseType: 'blob', // To handle binary data (Excel file)
      });
  
      // Create a URL for the file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `merchants_report_${dateRange[0].format('YYYY-MM-DD')}_to_${dateRange[1].format('YYYY-MM-DD')}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up after the download
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearchQuery(searchQuery); // Only update the active search when button is clicked
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
        <div className="flex justify-between items-center">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search merchants..."
                className="w-full pl-4 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Generate Report Button */}
          <Button
            type="primary"
            icon={<Calendar className="h-4 w-4 mr-2" />}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center ml-4"
            style={{ backgroundColor: '#1890ff' }}
          >
            Generate Report
          </Button>
        </div>
      </div>

      <Modal
        title="Generate Report"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="generate"
            type="primary"
            onClick={handleGenerateReport}
            disabled={!dateRange}
            style={{ backgroundColor: '#1890ff' }}
          >
            Generate
          </Button>,
        ]}
      >
        <div className="py-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date Range
          </label>
          <RangePicker
            className="w-full"
            onChange={(dates) => setDateRange(dates)}
            format="YYYY-MM-DD"
          />
        </div>
      </Modal>

     {/* Table Section */}
     <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Merchant Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Type
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Type
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tech Contact
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                KAM Contact
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Initiate Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMerchants.map((merchant) => (
              <tr key={merchant.uuid} className="hover:bg-gray-50">
                <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                  {merchant.merchantName}
                </td>
                <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-500">
                  {merchant.businessType}
                </td>
                <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-500">
                  {merchant.productType}
                </td>
                <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>{merchant.merchantTechPerson.name}</div>
                    <div className="text-gray-400">{merchant.merchantTechPerson.email}</div>
                  </div>
                </td>
                <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>{merchant.KAM.email}</div>
                    <div className="text-gray-400">{merchant.KAM.phone}</div>
                  </div>
                </td>
                <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-500">
                  {new Date(merchant.initiateDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-3 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="px-2">...</span>
              )}
              <button
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-3 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'border hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-3 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
