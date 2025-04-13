
import React, { useState } from "react";
import InputField from "./InputField"; 
import DatePicker from "./DateController"; 
import TimePicker from "./TimePicker";

const BookConsultation = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false); // Add loading state
  const handleChange = (section, field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      alert("Please fill in all fields before booking.");
      return;
    }

    // Debugging: check the input date
  console.log("Input Date:", formData.date);
 
  const formattedData = {
    name: formData.name,
    email: formData.email,
    consultationDate: formData.date, // Send correct formatted date to backend
    timeSlot: formData.time, // Ensure the backend gets the correct field name
  };

  setLoading(true); // Start loading

  try {
    const response = await fetch("http://localhost:8080/api/consultations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error("Failed to book consultation");
    }

    const data = await response.json();
    alert(`✅ Appointment booked for ${data.consultationDate} at ${data.timeSlot}`);

    // Reset form
    setFormData({ name: "", email: "", date: "", time: "" });
    onClose(); // Close modal after booking
  } catch (error) {
    console.error("Error booking consultation:", error);
    alert("❌ Failed to book consultation. Please try again.");
  } finally {
    setLoading(false);
  }

};

  //   const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  //   const newBookings = [...existingBookings, formData];
  //   localStorage.setItem("bookings", JSON.stringify(newBookings));
  //   console.log("Saved Data:", JSON.parse(localStorage.getItem("bookings")));

  //   alert(`✅ Appointment booked for ${formData.date} at ${formData.time}`);
  //   setFormData({ name: "", email: "", date: "", time: "" });
  //   onClose(); 
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="bg-[#111111] text-white shadow-lg shadow-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md relative border border-gray-500">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-200 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-yellow-500">
          Book Consultation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-2">
          <InputField
            label="Your Name"
            section="form"
            field="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Your Email"
            section="form"
            field="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
           <div className="override-select-bg">
          <DatePicker
            label="Select Date"
            section="form"
            field="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="override-select-bg">
  <TimePicker
    label="Select Time"
    section="form"
    field="time"
    value={formData.time}
    onChange={handleChange}
  />
</div>

          <div className="flex justify-end pr-2 sm:pr-14">
            <button
              type="submit"
              className="bg-transparent text-yellow-500 py-2 rounded transition hover:underline"
              disabled={loading}
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookConsultation;