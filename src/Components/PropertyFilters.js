const PropertyFilters = ({ filters, updateFilter }) => {
    return (
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-3 text-white">Filter Properties</h3>
   
        {/* Location Dropdown */}
        <label className="block text-sm text-white">Location:</label>
        <select
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
        >
          <option value="">All Locations</option>
          <option value="Pune">Pune</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
        </select>
   
        {/* BHK Dropdown */}
        <label className="block text-sm mt-2 text-white">BHK:</label>
        <select
          value={filters.bhk}
          onChange={(e) => updateFilter("bhk", e.target.value)}
          className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
        >
          <option value="">All BHKs</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
        </select>
   
         {/* Budget Slider */}
         <label className="block text-sm mt-4 text-white">Budget: ₹{filters.budget}</label>
        <input
          type="range"
          min="0"
          max="10000000"
          step="50000"
          value={filters.budget}
          onChange={(e) => updateFilter("budget", e.target.value)}
          className="w-full mt-2 appearance-none h-2 bg-gray-800 rounded-lg outline-none border border-yellow-500"
          style={{ accentColor: "#FFD700" }}
        />
      </div>
    );
  };
   
  export default PropertyFilters;
   