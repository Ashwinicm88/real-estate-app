import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import axios from "axios";



  // Fetch consultations from localStorage
  // useEffect(() => {
  //   const storedBookings = localStorage.getItem("bookings");
  //   if (storedBookings) {
  //     setBookings(JSON.parse(storedBookings));
  //   }
  // }, []);

  const ConsultationList = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
  
    // Fetch consultations from backend API
    useEffect(() => {
      const fetchConsultations = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/consultations");
          setBookings(response.data);
          console.log("API Response:", response.data);
        } catch (error) {
          console.error("Error fetching consultations:", error);
        }
      };
  
      fetchConsultations();
    }, []);
  
  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
      <header className="bg-black text-white p-4 sm:mx-8 md:mx-10 xl:mx-24">
        <Header />
      </header>

      <div className="bg-black text-white p-6 sm:p-10 lg:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 mt-3">Consultation Requests</h2>

        {/* Desktop View - Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-500">
                <th className="px-2 py-2 text-left">Client Name</th>
                <th className="px-2 py-2 text-left">Email</th>
                <th className="px-2 py-2 text-left">Date</th>
                <th className="px-2 py-2 text-left">Time</th>
                <th className="px-2 py-2 text-left">Confirm</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-400">
                    No consultations booked yet.
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr key={index} className="">
                    <td className="px-2 py-2">{booking.name}</td>
                    <td className="px-2 py-2">{booking.email}</td>
                    <td className="px-2 py-2">{booking.consultationDate}</td>
                    <td className="px-2 py-2">{booking.timeSlot}</td>
                    <td className="px-2 py-2">
                      <button
                        className="text-blue-400 hover:underline"
                        onClick={() => navigate(`/update-appointment/${booking.id}`)}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="lg:hidden space-y-4">
          {bookings.length === 0 ? (
            <p className="text-center text-gray-400">No consultations booked yet.</p>
          ) : (
            bookings.map((booking, index) => (
              <div key={index} className="border border-gray-500 p-4 rounded-lg">
                <p><strong>Client Name:</strong> {booking.name}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Date:</strong> {booking.consultationDate}</p>
                <p><strong>Time:</strong> {booking.timeSlot}</p>

                <div className="mt-2">
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={() => navigate(`/update-appointment/${booking.id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationList;