import React, { useState } from 'react';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    merchantName: '',
    businessType: '',
    productType: '',
    merchantWallet: '',
    merchantTechPersonEmail: '',
    merchantTechPersonPhone: '',
    KAMEmail: '',
    KAMPhone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
          <p className="mt-2 text-gray-600">Please fill in the product details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Merchant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Merchant Name
              </label>
              <input
                type="text"
                name="merchantName"
                value={formData.merchantName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter merchant name"
                required
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <input
                type="text"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter business type"
                required
              />
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>
              <input
                type="text"
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter product type"
                required
              />
            </div>

            {/* Merchant Wallet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Merchant Wallet
              </label>
              <input
                type="text"
                name="merchantWallet"
                value={formData.merchantWallet}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter merchant wallet"
                required
              />
            </div>

            {/* Tech Person Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tech Person Email
              </label>
              <input
                type="email"
                name="merchantTechPersonEmail"
                value={formData.merchantTechPersonEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter tech person email"
                required
              />
            </div>

            {/* Tech Person Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tech Person Phone
              </label>
              <input
                type="tel"
                name="merchantTechPersonPhone"
                value={formData.merchantTechPersonPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter tech person phone"
                required
              />
            </div>

            {/* KAM Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KAM Email
              </label>
              <input
                type="email"
                name="KAMEmail"
                value={formData.KAMEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter KAM email"
                required
              />
            </div>

            {/* KAM Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KAM Phone
              </label>
              <input
                type="tel"
                name="KAMPhone"
                value={formData.KAMPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter KAM phone"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;