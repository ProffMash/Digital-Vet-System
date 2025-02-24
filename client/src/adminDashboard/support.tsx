import React, { useEffect, useState } from 'react';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { getContacts, deleteContact, Contact } from '../Api/contactApi';  // Importing the API functions
import { Toaster, toast } from 'sonner';

const AdminSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Contact[]>([]); // State to hold support messages
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(6); // Number of items per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  // Fetch support messages on component mount or page change
  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const data = await getContacts(); // Fetch all messages
        const filteredData = data.filter(message =>
          message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.message.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setMessages(filteredData);
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching support messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupportMessages();
  }, [searchQuery, currentPage]); // Re-fetch when search query or page changes

  // Handle delete action
  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      setMessages(messages.filter(message => message.contact_id !== id)); // Remove the deleted message from the list
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting support message:', error);
      toast.error('Failed to delete message');
    }
  };

  // Get messages for the current page
  const paginatedMessages = messages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <Toaster position="top-center" richColors />
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Active Tickets</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-700 border-b border-gray-200 bg-gray-100">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : paginatedMessages.length > 0 ? (
              paginatedMessages.map(message => (
                <tr key={message.contact_id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">#{message.contact_id}</td>
                  <td className="px-6 py-4">{message.name}</td>
                  <td className="px-6 py-4">{message.email}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{message.message}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="text-green-600 hover:text-green-800" onClick={() => message.contact_id !== undefined && handleDelete(message.contact_id)}>
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" onClick={() => message.contact_id !== undefined && handleDelete(message.contact_id)}>
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-600">
                  No support messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4 mt-4 border-t border-gray-200">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-600 hover:text-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-600 hover:text-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminSupport;