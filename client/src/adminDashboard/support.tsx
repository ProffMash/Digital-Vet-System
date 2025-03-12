import React, { useEffect, useState } from 'react';
import { Search, XCircle, Eye } from 'lucide-react';
import { getContacts, deleteContact, Contact } from '../Api/contactApi';
import { Toaster, toast } from 'sonner';

const AdminSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null); // State to hold the selected message for detailed view

  // Fetch support messages
  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const data = await getContacts();
        const filteredData = data.filter(message =>
          message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.message.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setMessages(filteredData);
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching support messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupportMessages();
  }, [searchQuery, currentPage]);

  // Handle delete action
  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      setMessages(messages.filter(message => message.contact_id !== id));
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting support message:', error);
      toast.error('Failed to delete message');
    }
  };

  // Handle view details action
  const handleViewDetails = (message: Contact) => {
    setSelectedMessage(message); // Set the selected message for detailed view
  };

  // Close the detailed view modal
  const closeDetailsModal = () => {
    setSelectedMessage(null);
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
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : paginatedMessages.length > 0 ? (
              paginatedMessages.map(message => (
                <tr key={message.contact_id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">#{message.contact_id}</td>
                  <td className="px-6 py-4">{message.subject}</td>
                  <td className="px-6 py-4">{message.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleViewDetails(message)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => message.contact_id !== undefined && handleDelete(message.contact_id)}
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-600">
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

      {/* Modal for detailed view */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Message Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Subject:</label>
                <p className="mt-1 text-gray-900">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email:</label>
                <p className="mt-1 text-gray-900">{selectedMessage.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message:</label>
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDetailsModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;