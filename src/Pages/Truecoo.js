import React from "react";
import Header from "../Components/Header";
import CostofOwnership from "../Components/CostOfOwnership"
import { useNavigate } from "react-router-dom";

const Truecoo = () => {
    const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // navigates to the previous page
  };

  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14 min-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[400px]">
      <header className="bg-black text-white p-4 sm:mx-8 md:mx-10 xl:mx-24">
        <Header />
      </header>
      <div className="bg-black text-white p-6 sm:p-10 lg:p-8 ">        
            <button
          onClick={handleBack}
          className="bg-transparent text-yellow-500"
        >
          Back
        </button> <CostofOwnership/>
        </div>      
      </div>
  );
};

export default Truecoo;

