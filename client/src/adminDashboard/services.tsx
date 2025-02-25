import React, { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { getSales, deleteSale, Sale } from "../Api/salesApi";
import { Toaster, toast } from 'sonner';

const AdminPayments: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const salesPerPage = 8;

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSale(id);
      setSales(sales.filter((sale) => sale.id !== id));
      toast.success('Sale deleted successfully');
    } catch (error) {
      console.error("Error deleting sale:", error);
      toast.error('Failed to delete sale');
    }
  };

  // Pagination Logic
  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const filteredSales = sales.filter((sale) =>
    sale.medicine.toString().includes(searchQuery.toLowerCase()) ||
    sale.medicine_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentSales = filteredSales.slice(
    indexOfFirstSale,
    indexOfLastSale
  );
  const totalPages = Math.ceil(filteredSales.length / salesPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <Toaster position="top-center" richColors />
      <h2 className="text-2xl font-bold text-gray-800">Payments</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by Medicine ID or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b border-gray-100">
              <th className="px-4 py-2">Medicine ID</th>
              <th className="px-4 py-2">Medicine Name</th>
              <th className="px-4 py-2">Quantity Sold</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Sale Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSales.map((sale) => (
              <tr key={sale.id} className="border-b border-gray-100">
                <td className="px-4 py-2">{sale.medicine}</td>
                <td className="px-4 py-2">{sale.medicine_name}</td>
                <td className="px-4 py-2">{sale.quantity_sold}</td>
                <td className="px-4 py-2">${sale.total_price}</td>
                <td className="px-4 py-2">{new Date(sale.sale_date).toLocaleString()}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => sale.id !== undefined && handleDelete(sale.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPayments;