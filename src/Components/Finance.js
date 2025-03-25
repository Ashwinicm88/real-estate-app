import { useState } from "react";

const FinancialPlanner = () => {
  const [formData, setFormData] = useState({
    singleEarner: "",
    netSalary: "",
    spouseSalary: "",
    expenses: "",
    jointLoan: "",
    age: "",
    spouseAge: "",
    cibilScore: "",
    spouseCibilScore: "",
    loanTenure: "",
    interestRate: "",
    downpayment: "",
    loanAmount: "2500000",
    loanYears: "20",
    emiAmount: "250000",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Financial Planner</h2>

      <div className="border border-gray-500 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Availing home loan?</h3>

        {/* Income Section */}
        <div className="mb-4">
          <h4 className="font-semibold">Income:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">Single Earner? (Y/N)
              <input type="text" name="singleEarner" value={formData.singleEarner} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Your net salary
              <input type="number" name="netSalary" value={formData.netSalary} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Spouse net salary
              <input type="number" name="spouseSalary" value={formData.spouseSalary} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="mb-4">
          <h4 className="font-semibold">Expenses:</h4>
          <label className="block">
            <input type="text" name="expenses" value={formData.expenses} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" placeholder="Enter total expenses" />
          </label>
        </div>

        {/* Loan Details Section */}
        <div className="mb-4">
          <h4 className="font-semibold">Loan details:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">Joint loan
              <input type="text" name="jointLoan" value={formData.jointLoan} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Your age
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Spouse age
              <input type="number" name="spouseAge" value={formData.spouseAge} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Your CIBIL Score
              <input type="number" name="cibilScore" value={formData.cibilScore} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Spouse CIBIL Score
              <input type="number" name="spouseCibilScore" value={formData.spouseCibilScore} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Loan Tenure (Years)
              <input type="number" name="loanTenure" value={formData.loanTenure} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Interest Rate (%)
              <input type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
            <label className="block">Downpayment
              <input type="number" name="downpayment" value={formData.downpayment} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-md" />
            </label>
          </div>
        </div>

        {/* Approximate Approvals */}
        <div className="mt-4">
          <h4 className="font-semibold">Approximate approvals:</h4>
          <p>
            You are eligible for approx 
            <span className="font-bold text-yellow-400">
              Rs. <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} className="bg-gray-800 text-white w-24 p-1 rounded-md" />
            </span> loan for 
            <span className="font-bold text-yellow-400">
              <input type="number" name="loanYears" value={formData.loanYears} onChange={handleChange} className="bg-gray-800 text-white w-12 p-1 rounded-md" /> years
            </span> and the EMI will be approx 
            <span className="font-bold text-yellow-400">
              Rs. <input type="number" name="emiAmount" value={formData.emiAmount} onChange={handleChange} className="bg-gray-800 text-white w-24 p-1 rounded-md" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialPlanner;
