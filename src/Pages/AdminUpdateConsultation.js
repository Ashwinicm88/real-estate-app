import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "../Components/DateController";
import TimePicker from "../Components/TimePicker";
import DropdownField from "../Components/DropdownField";
import Header from "../Components/Header";
import axios from "axios";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [consultantOptions, setConsultantOptions] = useState([{"label": "Select Consultant", "value": ""}]);


  // Fetch booking by ID on component mount
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/consultations/${id}`);
        const fetchBooking = response.data;

        // Check if consultant options have loaded
      const isValidConsultant = consultantOptions.some(
        (option) => option.value === fetchBooking.consultationName
      );
        // setBooking(response.data);

        setBooking({
          ...fetchBooking,
          consultationName : "",
        });

      } catch (error) {
        console.error("Failed to fetch booking:", error);
      }
    };

    fetchBooking();
  }, [id, consultantOptions]);
// Fetch consultant options on component mount
useEffect(() => {
  const fetchConsultants = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/consultations`); // Adjust the endpoint as needed
      const consultants = response.data.map(consultant => ({
        label: consultant.consultationName, // Assuming the consultant object has a 'name' property
        value: consultant.consultationName, // Assuming you want to use the name as the value
      }));
      const uniqueConsultants = [
        { label: "Select Consultant", value: "" },
        ...Array.from(
          new Map(consultants.map(c => [c.value, c])).values()
        ),
      ];

      setConsultantOptions(uniqueConsultants);
    } catch (error) {
      console.error("Failed to fetch consultants:", error);
    }
  };

  fetchConsultants();
}, []);

  const handleChange = (section, field, value) => {
    setBooking((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/consultations/${id}`, booking);
      alert("Appointment updated successfully!");
      navigate("/"); // Redirect to homepage or listing page
    } catch (error) {
      console.error("Failed to update booking:", error);
      alert("Failed to update appointment. Please try again.");
    }
  };
  

  if (!booking) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
      <header className="bg-black text-white p-4 sm:mx-8 md:mx-10 xl:mx-24">
        <Header />
      </header>

      <div className="bg-black text-white p-6 sm:p-10 lg:p-8">
        <h2 className="text-2xl font-bold mb-6 mt-3">Update Appointment</h2>

        {/* Desktop View - Table */}
        <div className="hidden sm:block overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-white">
            <thead className="text-white border-b border-gray-600">
              <tr>
                <th className="px-6 py-4 text-center">Client Name</th>
                <th className="px-6 py-4 text-center">Email</th>
                <th className="px-6 py-4 text-center">Preferred Date</th>
                <th className="px-6 py-4 text-center">Preferred Time</th>
                <th className="px-6 py-4 text-center">Consultant Name</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 text-center align-middle">{booking.name}</td>
                <td className="px-6 py-4 text-center align-middle">{booking.email}</td>
                <td className="px-6 py-4 text-center">
                  <DatePicker
                    label=""
                    section=""
                    field="consultationDate"
                    value={booking.consultationDate}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <TimePicker
                    label=""
                    field="timeSlot"
                    value={booking.timeSlot}
                    onChange={handleChange}
                     
                  />
                </td>
                <td className="w-[270px]">
                  <DropdownField
                    label="Select Consultant"
                    field="consultationName"
                    value={booking.consultationName || ""}
                    onChange={handleChange}
                    error={null}
                    options={consultantOptions}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="text-blue-500 hover:underline font-semibold"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      {/* Mobile View - Vertical Card Layout */}
<div className="md:hidden flex flex-col space-y-4 ">
  <div className="border border-gray-700 p-2 rounded-lg w-[90%] mx-auto">
    <p>
      <span className="font-bold p-1">Client Name:</span> {booking.name}
    </p>
    <p>
      <span className="font-bold p-1">Email:</span> {booking.email}
    </p>
    <p>
      <span className="font-bold p-1">Preferred Date:</span>
    </p>
    <div className="w-[80%] mx-auto">
      <DatePicker field="consultationDate" value={booking.consultationDate} onChange={handleChange} className="w-full  p-1" />
    </div>
    <p>
      <span className="font-bold">Preferred Time:</span>
    </p>
    <div className="w-[80%] mx-auto">
      <TimePicker field="timeSlot" value={booking.timeSlot} onChange={handleChange} className="w-full  p-1" />
    </div>
    <p>
      <span className="font-bold  p-1">Consultant Name:</span>
    </p>
    <div className="w-[80%] mx-auto">
      <DropdownField
        field="consultationName"
        value={booking.consultationName || ""}
        onChange={handleChange}
        options={consultantOptions}
        className="w-full"
      />
    </div>
    <div className="flex justify-end mt-4">
  <button className="text-blue-500 px-4 py-2" onClick={handleUpdate}>
    Save
  </button>
</div>

  </div>
</div>
      </div>
    </div>
  );
};

export default UpdateAppointment;