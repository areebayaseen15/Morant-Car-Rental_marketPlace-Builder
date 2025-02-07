"use client"
import { useState, useEffect } from "react";

type Invoice = [string, string, string, string, string, string, string];
type SalesData = { month: string; value: number };

const fetchInvoices = (): Invoice[] => [
  ['1', '#068499', 'Ali Khan', 'Koenigsegg', '21/07/2022 08:21', 'Paid', '$101'],
  ['2', '#068500', 'Saira Bano', 'Nissan GT - R', '21/07/2022 08:21', 'Pending', '$144'],
  ['3', '#068501', 'Imran Ali', 'Rolls-Royce All New Rush', '21/07/2022 08:21', 'Paid', '$121'],
  ['4', '#068502', 'Fatima Khan', 'CR - V', '21/07/2022 08:21', 'Overdue', '$300'],
  ['5', '#068503', 'Zara Ahmed', 'All New Terios', '22/07/2022 09:15', 'Paid', '$275'],
  ['6', '#068504', 'Ahmed Raza', 'MG ZX Exclusive', '22/07/2022 09:30', 'Pending', '$520'],
  ['7', '#068505', 'Nida Shah', 'New MG ZS', '23/07/2022 11:00', 'Paid', '$410'],
  ['8', '#068506', 'Umar Hassan', 'MG ZX Excite', '23/07/2022 11:20', 'Overdue', '$680'],
  ['9', '#068507', 'Sara Bano', 'New MG ZS', '24/07/2022 14:00', 'Pending', '$550'],
];

const fetchSalesData = (): SalesData[] => [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 80 },
  { month: 'Mar', value: 60 },
  { month: 'Apr', value: 40 },
  { month: 'May', value: 20 },
  { month: 'Jun', value: 50 },
  { month: 'Jul', value: 70 },
  { month: 'Aug', value: 30 },
  { month: 'Sep', value: 90 },
  { month: 'Oct', value: 60 },
  { month: 'Nov', value: 100 },
  { month: 'Dec', value: 110 },
];

export default function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    setInvoices(fetchInvoices());
    setSalesData(fetchSalesData());
  }, []);

  
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice[2].toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice[5].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Customers</h3>
          <p className="text-2xl text-black font-bold mt-2">1.456</p>
          <span className="text-green-500 text-sm">+4.5% Since last week</span>
        </div>

      
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Revenue</h3>
          <p className="text-2xl text-black font-bold mt-2">$3.345</p>
          <span className="text-red-500 text-sm">-0.10% Since last week</span>
        </div>

      
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Profit</h3>
          <p className="text-2xl text-black font-bold mt-2">60%</p>
          <span className="text-red-500 text-sm">-0.2% Since last week</span>
        </div>

      
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Invoices</h3>
          <p className="text-2xl text-black font-bold mt-2">1.135</p>
          <span className="text-green-500 text-sm">+1.5% Since last week</span>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search invoices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border text-black border-gray-300 rounded-md w-full"
        />
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Invoice Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg text-black font-semibold mb-4">Invoice Statistics</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded">
              <span className="text-gray-600">Total Paid</span>
              <p className="text-xl  text-gray-700 font-bold">234</p>
            </div>
            <div className="bg-red-50 p-4 rounded">
              <span className="text-gray-600">Total Overdue</span>
              <p className="text-xl text-gray-700 font-bold">514</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded">
              <span className="text-gray-600">Total Unpaid</span>
              <p className="text-xl text-gray-700 font-bold">345</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <h3 className="text-lg text-black font-semibold mb-4">Sales Analytics</h3>
          <div className="h-64">
           
            <div className="flex items-end justify-between h-full border-b-2 border-l-2 border-gray-200 pb-4 pl-4">
              {salesData.map((data, index) => (
                <div
                  key={index}
                  className="w-8 bg-blue-200"
                  style={{ height: `${data.value}px` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              {salesData.map((data) => (
                <span key={data.month}>{data.month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

     
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg  text-black font-semibold mb-4">Recent Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="pb-3">No</th>
                <th className="pb-3">Id Customers</th>
                <th className="pb-3">Customer Name</th>
                <th className="pb-3">Cars Name</th>
                <th className="pb-3">Order Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Price</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {filteredInvoices.map((row, index) => (
                <tr key={index} className="text-sm border-b text-black last:border-b-0">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-4">
                      {cellIndex === 5 ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            cell === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : cell === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
