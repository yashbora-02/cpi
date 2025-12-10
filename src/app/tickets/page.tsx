"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import {
  FaTicketAlt,
  FaFilter,
  FaSearch,
  FaExternalLinkAlt,
  FaFileDownload,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner
} from "react-icons/fa";

interface Ticket {
  id: string;
  ticketNumber: string;
  type: string;
  title: string;
  description: string;
  reportedBy: string;
  email: string;
  phone: string;
  fileUrl?: string | null;
  fileName?: string | null;
  status: string;
  createdAt: any;
  updatedAt: any;
}

export default function TicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Auth check
  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      router.replace("/login");
    }
  }, [router]);

  // Fetch tickets
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tickets");
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        setFilteredTickets(data);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tickets
  useEffect(() => {
    let filtered = tickets;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.type === typeFilter);
    }

    setFilteredTickets(filtered);
  }, [searchQuery, statusFilter, typeFilter, tickets]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "N/A";
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
          )
        );
        setFilteredTickets((prevFiltered) =>
          prevFiltered.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
          )
        );
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket({ ...selectedTicket, status: newStatus });
        }
        alert("Ticket status updated successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update ticket status");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("An error occurred while updating the ticket");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
      open: {
        bg: "bg-yellow-100 text-yellow-800 border-yellow-300",
        text: "Open",
        icon: <FaClock className="mr-1" />,
      },
      in_progress: {
        bg: "bg-blue-100 text-blue-800 border-blue-300",
        text: "In Progress",
        icon: <FaSpinner className="mr-1" />,
      },
      resolved: {
        bg: "bg-green-100 text-green-800 border-green-300",
        text: "Resolved",
        icon: <FaCheckCircle className="mr-1" />,
      },
      closed: {
        bg: "bg-gray-100 text-gray-800 border-gray-300",
        text: "Closed",
        icon: <FaCheckCircle className="mr-1" />,
      },
    };

    const badge = badges[status] || badges.open;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E90FF] to-[#00D4E0] text-white px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaTicketAlt />
                Support Tickets
              </h1>
              <p className="text-sm text-white/90 mt-1">View and manage all support tickets</p>
            </div>
            <button
              onClick={fetchTickets}
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-all"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaSearch className="inline mr-2" />
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ticket #, title, name, email..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaFilter className="inline mr-2" />
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaFilter className="inline mr-2" />
                  Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="General Request">General Request</option>
                  <option value="Application Issue / Bug">Application Issue / Bug</option>
                  <option value="Digital Card Change Request">Digital Card Change Request</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
              <div className="text-2xl font-bold text-gray-800">{tickets.length}</div>
              <div className="text-sm text-gray-600">Total Tickets</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
              <div className="text-2xl font-bold text-gray-800">
                {tickets.filter((t) => t.status === "open").length}
              </div>
              <div className="text-sm text-gray-600">Open</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
              <div className="text-2xl font-bold text-gray-800">
                {tickets.filter((t) => t.status === "resolved").length}
              </div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-gray-500">
              <div className="text-2xl font-bold text-gray-800">
                {tickets.filter((t) => t.status === "closed").length}
              </div>
              <div className="text-sm text-gray-600">Closed</div>
            </div>
          </div>

          {/* Tickets List */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FaSpinner className="animate-spin text-4xl text-[#00D4E0] mx-auto mb-4" />
              <p className="text-gray-600">Loading tickets...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No tickets found</p>
              <p className="text-gray-400 text-sm mt-2">
                {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first ticket from the Support Center"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Ticket #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Reporter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono font-semibold text-[#1E90FF]">
                            {ticket.ticketNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{ticket.type}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {ticket.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{ticket.reportedBy}</div>
                          <div className="text-xs text-gray-500">{ticket.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(ticket.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(ticket.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="text-[#00D4E0] hover:text-[#008a8d] font-semibold flex items-center gap-1"
                          >
                            View
                            <FaExternalLinkAlt className="text-xs" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Results count */}
          {!isLoading && filteredTickets.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              Showing {filteredTickets.length} of {tickets.length} tickets
            </div>
          )}
        </div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#1E90FF] to-[#00D4E0] text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Ticket Details</h3>
                  <p className="text-sm text-white/80">{selectedTicket.ticketNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status and Type */}
                <div className="flex items-center gap-4">
                  {getStatusBadge(selectedTicket.status)}
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                    {selectedTicket.type}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Title</h4>
                  <p className="text-lg font-semibold text-gray-900">{selectedTicket.title}</p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {selectedTicket.description}
                  </p>
                </div>

                {/* Reporter Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Reported By</h4>
                    <p className="text-gray-900">{selectedTicket.reportedBy}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Email</h4>
                    <p className="text-gray-900">{selectedTicket.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Phone</h4>
                    <p className="text-gray-900">{selectedTicket.phone}</p>
                  </div>
                </div>

                {/* Attachment */}
                {selectedTicket.fileUrl && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Attachment</h4>
                    <a
                      href={selectedTicket.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FaFileDownload />
                      {selectedTicket.fileName || "Download File"}
                    </a>
                  </div>
                )}

                {/* Timestamps */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Created</h4>
                    <p className="text-sm text-gray-600">{formatDate(selectedTicket.createdAt)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Last Updated</h4>
                    <p className="text-sm text-gray-600">{formatDate(selectedTicket.updatedAt)}</p>
                  </div>
                </div>

                {/* Update Status Section */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Update Ticket Status</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      onClick={() => updateTicketStatus(selectedTicket.id, "open")}
                      disabled={isUpdatingStatus || selectedTicket.status === "open"}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedTicket.status === "open"
                          ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-500"
                          : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => updateTicketStatus(selectedTicket.id, "in_progress")}
                      disabled={isUpdatingStatus || selectedTicket.status === "in_progress"}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedTicket.status === "in_progress"
                          ? "bg-blue-100 text-blue-800 border-2 border-blue-500"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateTicketStatus(selectedTicket.id, "resolved")}
                      disabled={isUpdatingStatus || selectedTicket.status === "resolved"}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedTicket.status === "resolved"
                          ? "bg-green-100 text-green-800 border-2 border-green-500"
                          : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Resolved
                    </button>
                    <button
                      onClick={() => updateTicketStatus(selectedTicket.id, "closed")}
                      disabled={isUpdatingStatus || selectedTicket.status === "closed"}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedTicket.status === "closed"
                          ? "bg-gray-100 text-gray-800 border-2 border-gray-500"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Closed
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
                <p className="text-xs text-gray-500">
                  Ticket ID: <span className="font-mono">{selectedTicket.id}</span>
                </p>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
