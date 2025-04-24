// import { useState, useEffect } from "react";
// import InputField from "./InputField";
// import DropdownField from "./DropdownField";
// import CheckBox from "./CheckBoxControl";
// import { useNavigate } from 'react-router-dom';

// const HomeAffordabilityCalculator = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     city: "",
//     yourIncome: "",
//     spouseIncome: "",
//     otherIncomeYou: "",
//     otherIncomeSpouse: "",
//     emi: "",
//     household: "",
//     education: "",
//     entertainment: "",
//     sip: "",
//     fuel: "",
//     homeLoan: false, // ✅ Add this
//     jointHomeLoan: false,
//     creditScore: "",
//     wifeCreditScore: "",
//     interestRate: 8.5,
//     loanTenure: 20, // ✅ Add this
//   });

//   const [result, setResult] = useState(null);
//   const [showResult, setShowResult] = useState(false);
//   const [netSavings, setNetSavings] = useState(0);
//   const [homeAffordability, setHomeAffordability] = useState(0);
//   const navigate = useNavigate();

//   const handleChange = (section, field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const calculateAffordability = () => {
//     const income =
//       parseFloat(formData.yourIncome || 0) +
//       parseFloat(formData.spouseIncome || 0) +
//       parseFloat(formData.otherIncomeYou || 0) +
//       parseFloat(formData.otherIncomeSpouse || 0);

//     const expenses =
//       parseFloat(formData.emi || 0) +
//       parseFloat(formData.household || 0) +
//       parseFloat(formData.education || 0) +
//       parseFloat(formData.entertainment || 0) +
//       parseFloat(formData.sip || 0) +
//       parseFloat(formData.fuel || 0);

//     const availableMonthly = income - expenses;

//     const interestRate = 0.08 / 12; // Assuming default 8% interest
//     const loanTermMonths = 20 * 12; // Assuming default 20-year loan

//     const loanAmount =
//       (availableMonthly * (1 - Math.pow(1 + interestRate, -loanTermMonths))) /
//       interestRate;
//     const homePrice = loanAmount;
//     const emi = availableMonthly;

//     setResult({
//       homePrice: homePrice.toFixed(0),
//       loanAmount: loanAmount.toFixed(0),
//       monthlyEMI: emi.toFixed(0),
//     });

//     setShowResult(true);
//   };
//   useEffect(() => {
//     const totalIncome =
//       Number(formData.yourIncome) +
//       Number(formData.spouseIncome) +
//       Number(formData.otherIncomeYou) +
//       Number(formData.otherIncomeSpouse);

//     const totalExpenditure =
//       Number(formData.emi) +
//       Number(formData.household) +
//       Number(formData.education) +
//       Number(formData.entertainment) +
//       Number(formData.sip) +
//       Number(formData.fuel);

//     const savings = totalIncome - totalExpenditure;
//     setNetSavings(savings);

//     // Home affordability logic (simple approximation)
//     const interest = formData.interestRate / 100 / 12;
//     const months = formData.loanTenure * 12;
//     const homeValue =
//       savings > 0
//         ? Math.round(
//             (savings * ((1 + interest) ** months - 1)) /
//               (interest * (1 + interest) ** months)
//           )
//         : 0;

//     setHomeAffordability(homeValue);
//   }, [formData]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 overflow-y-auto">
//       <div className="bg-[#111111] text-white shadow-lg shadow-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-3xl sm:max-w-4xl relative border border-gray-500 max-h-[90vh] overflow-y-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-3 text-gray-400 hover:text-gray-200 text-xl"
//         >
//           ×
//         </button>

//         {!showResult ? (
//           <>
//             <h2 className="text-xl sm:text-2xl font-semibold text-left mb-4 text-white">
//               🏠 Home Affordability Calculator
//             </h2>
//             <hr className="border-t-2 border-gray-900" />
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 calculateAffordability();
//               }}
//               className="space-y-4 sm:space-y-2"
//             >
//               {/* Section: Location & Loan Preferences */}
//               {/* Section: Location & Loan Preferences */}
//               <div className="mb-4 mt-2">
//                 <h2 className="text-lg font-semibold text-yellow-500 mb-2">
//                   Location & Loan Preferences
//                 </h2>

//                 {/* Dropdown Field */}
//                 <div className="mb-4 max-w-[550px]">
//                   <DropdownField
//                     label="Select City"
//                     section="form"
//                     field="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     options={[
//                       { label: "Hyderabad", value: "Hyderabad" },
//                       { label: "Mumbai", value: "Mumbai" },
//                       { label: "Bangalore", value: "Bangalore" },
//                       { label: "Pune", value: "Pune" },
//                       { label: "Delhi", value: "Delhi" },
//                     ]}
//                   />
//                 </div>

//                 {/* Custom CheckBox components below dropdown */}
//                 <div className="flex flex-row items-center gap-6 flex-nowrap text-white">
//                   <CheckBox
//                     label="Home Loan"
//                     section="form"
//                     field="homeLoan"
//                     checked={formData.homeLoan}
//                     onChange={handleChange}
//                   />

//                   {formData.homeLoan && (
//                     <CheckBox
//                       label="Joint Home Loan"
//                       section="form"
//                       field="jointHomeLoan"
//                       checked={formData.jointHomeLoan}
//                       onChange={handleChange}
//                     />
//                   )}
//                 </div>
//               </div>
//               {/* Section 1: Income */}
//               <h3 className="text-lg font-semibold text-yellow-500 mt-4 mb-2">
//                 Net Income / Month
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <InputField
//                   label="Your Income"
//                   section="form"
//                   field="yourIncome"
//                   value={formData.yourIncome}
//                   onChange={handleChange}
//                   type="integer"
//                 />
//                 <InputField
//                   label="Spouse Income"
//                   section="form"
//                   field="spouseIncome"
//                   value={formData.spouseIncome}
//                   onChange={handleChange}
//                   type="integer"
//                 />
//                 <InputField
//                   label="Other Income (You)"
//                   section="form"
//                   field="otherIncomeYou"
//                   value={formData.otherIncomeYou}
//                   onChange={handleChange}
//                   type="integer"
//                 />
//                 <InputField
//                   label="Other Income (Spouse)"
//                   section="form"
//                   field="otherIncomeSpouse"
//                   value={formData.otherIncomeSpouse}
//                   onChange={handleChange}
//                   type="integer"
//                 />
//               </div>

//               {/* Section 2: Expenses */}
//               <h3 className="text-lg font-semibold text-yellow-500 mt-6 mb-2">
//                 Net Expenditure Per Month
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <InputField
//                   label="Any Other EMIs? (₹/month)"
//                   section="form"
//                   field="otherEmis"
//                   value={formData.otherEmis}
//                   onChange={handleChange}
//                 />
//                 <InputField
//                   label="Monthly Household Deductions"
//                   section="form"
//                   field="householdDeductions"
//                   value={formData.householdDeductions}
//                   onChange={handleChange}
//                 />
//                 <InputField
//                   label="Education Fees"
//                   section="form"
//                   field="educationFees"
//                   value={formData.education}
//                   onChange={handleChange}
//                 />
//                 <InputField
//                   label="Entertainment"
//                   section="form"
//                   field="entertainment"
//                   value={formData.entertainment}
//                   onChange={handleChange}
//                 />
//                 <InputField
//                   label="Monthly Investments (SIPs etc)"
//                   section="form"
//                   field="monthlyInvestments"
//                   value={formData.monthlyInvestments}
//                   onChange={handleChange}
//                 />
//                 <InputField
//                   label="Fuel"
//                   section="form"
//                   field="fuel"
//                   value={formData.fuel}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="">
//                 <h2 className="text-lg font-semibold text-yellow-500 mt-6 mb-2">
//                   Loan Eligibility & Affordability
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <DropdownField
//                     label="Select Your Credit Score"
//                     section="form"
//                     field="creditScore"
//                     value={formData.creditScore}
//                     onChange={handleChange}
//                     options={[
//                       { label: "720 & above", value: "720_above" },
//                       { label: "660-719", value: "660_719" },
//                       { label: "620-659", value: "620_659" },
//                       { label: "580-619", value: "580_619" },
//                       { label: "579 or below", value: "579_below" },
//                     ]}
//                   />

//                   <DropdownField
//                     label="Select Spouse Credit Score"
//                     section="form"
//                     field="wifeCreditScore"
//                     value={formData.wifeCreditScore}
//                     onChange={handleChange}
//                     options={[
//                       { label: "720 & above", value: "720_above" },
//                       { label: "660-719", value: "660_719" },
//                       { label: "620-659", value: "620_659" },
//                       { label: "580-619", value: "580_619" },
//                       { label: "579 or below", value: "579_below" },
//                     ]}
//                   />

//                   <InputField
//                     label="Interest Rate (%)"
//                     section="form"
//                     field="interestRate"
//                     value={formData.interestRate}
//                     onChange={handleChange}
//                   />

//                   <InputField
//                     label="Loan Tenure (Years)"
//                     section="form"
//                     field="loanTenure"
//                     value={formData.loanTenure}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={!formData.yourIncome} // 👈 disable if income is empty
//                   className={`py-2 px-4 rounded transition 
//       ${
//         formData.yourIncome
//           ? "bg-transparent text-yellow-500 hover:underline"
//           : " text-gray-700 cursor-not-allowed"
//       }`}
//                 >
//                   Calculate
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-yellow-500">
//               🏡 Affordability Result
//             </h2>

//             <div className="text-center space-y-6">
//               <div className="mt-6 space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-6">
//                   <h3 className="text-white text-lg font-semibold">
//                     Your net savings per month:{" "}
//                     <span className="text-yellow-500 text-xl font-bold">
//                       ₹{netSavings}
//                     </span>
//                   </h3>

//                   <h3 className="text-white text-lg font-semibold">
//                     Estimated Home Price:{" "}
//                     <span className="text-yellow-500 text-xl font-bold">
//                       ₹{result.homePrice}
//                     </span>
//                   </h3>

//                   <h3 className="text-white text-lg font-semibold">
//                     Estimated Loan Amount:{" "}
//                     <span className="text-yellow-500 text-xl font-bold">
//                       ₹{result.loanAmount}
//                     </span>
//                   </h3>

//                   <h3 className="text-white text-lg font-semibold">
//                     Estimated EMI:{" "}
//                     <span className="text-yellow-500 text-xl font-bold">
//                       ₹{result.monthlyEMI}/month
//                     </span>
//                   </h3>
//                 </div>
//                 <h3 className="text-white text-lg font-semibold">
//                   As per your current financial statement, you can afford a
//                   property up to Rs, {" "}
//                   <span className="text-yellow-500 text-xl font-bold">
//                     ₹{Math.ceil(homeAffordability/500000)*500000}
//                   </span>
//                 </h3>
//               </div>

//               <div className="flex justify-center gap-4 mt-6">
//                 <button
//                   onClick={() => setShowResult(false)}
//                   className="bg-transparent text-yellow-500 px-4 py-2 rounded hover:underline"
//                 >
//                   Go Back
//                 </button>
//                 <button
                 
//                     // Add navigation or action logic here
//                     onClick={async () => {
//                       console.log("City:", formData.city);
//   console.log("Home Affordability:", homeAffordability);
//                         // Save it in sessionStorage or localStorage (alternatively use Redux/Context for state)
//                         // sessionStorage.setItem("searchResults", JSON.stringify(data));
                  
//                         // Navigate to results page
//                         navigate(`/search-result?city=${formData.city}&budgetMax=${(homeAffordability)}`);
                        
//                     }}
//                   className=" text-yellow-500 font-semibold px-4 py-2 rounded "
//                 >
//                   View Properties You Can Buy
//                 </button>
//               </div>  
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeAffordabilityCalculator;

import { useState, useEffect } from "react";
import InputField from "./InputField";
import DropdownField from "./DropdownField";
import CheckBox from "./CheckBoxControl";
import { useNavigate } from 'react-router-dom';

const HomeAffordabilityCalculator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    city: "",
    yourIncome: "",
    spouseIncome: "",
    otherIncomeYou: "",
    otherIncomeSpouse: "",
    emi: "",
    household: "",
    education: "",
    entertainment: "",
    sip: "",
    fuel: "",
    homeLoan: false,
    jointHomeLoan: false,
    creditScore: "",
    wifeCreditScore: "",
    interestRate: 8.5,
    loanTenure: 20,
  });

  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [netSavings, setNetSavings] = useState(0);
  const [homeAffordability, setHomeAffordability] = useState(0);
  const navigate = useNavigate();

  const handleChange = (section, field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculateAffordability = () => {
    const income =
      parseFloat(formData.yourIncome || 0) +
      parseFloat(formData.spouseIncome || 0) +
      parseFloat(formData.otherIncomeYou || 0) +
      parseFloat(formData.otherIncomeSpouse || 0);

    const expenses =
      parseFloat(formData.emi || 0) +
      parseFloat(formData.household || 0) +
      parseFloat(formData.education || 0) +
      parseFloat(formData.entertainment || 0) +
      parseFloat(formData.sip || 0) +
      parseFloat(formData.fuel || 0);

    const availableMonthly = income - expenses;

    const interestRate = 0.08 / 12; // Assuming default 8% interest
    const loanTermMonths = 20 * 12; // Assuming default 20-year loan

    const loanAmount =
      (availableMonthly * (1 - Math.pow(1 + interestRate, -loanTermMonths))) /
      interestRate;
    const homePrice = loanAmount;
    const emi = availableMonthly;

    setResult({
      homePrice: homePrice.toFixed(0),
      loanAmount: loanAmount.toFixed(0),
      monthlyEMI: emi.toFixed(0),
    });

    setShowResult(true);
  };

  useEffect(() => {
    const totalIncome =
      Number(formData.yourIncome) +
      Number(formData.spouseIncome) +
      Number(formData.otherIncomeYou) +
      Number(formData.otherIncomeSpouse);

    const totalExpenditure =
      Number(formData.emi) +
      Number(formData.household) +
      Number(formData.education) +
      Number(formData.entertainment) +
      Number(formData.sip) +
      Number(formData.fuel);

    const savings = totalIncome - totalExpenditure;
    setNetSavings(savings);

    const interest = formData.interestRate / 100 / 12;
    const months = formData.loanTenure * 12;
    const homeValue =
      savings > 0
        ? Math.round(
            (savings * ((1 + interest) ** months - 1)) /
              (interest * (1 + interest) ** months)
          )
        : 0;

    setHomeAffordability(homeValue);
  }, [formData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 overflow-y-auto">
<div className="bg-[#111111] text-white shadow-lg shadow-gray-800 rounded-lg pt-0 px-4 pb-4 sm:pt-0 sm:px-6 sm:pb-6 w-full max-w-3xl sm:max-w-4xl relative border border-gray-500 max-h-[90vh] overflow-y-auto mx-4 sm:mx-0">
        
        {/* Sticky Header Section */}
        <div className="sticky top-0 z-10 bg-[#111111] p-4 border-b border-gray-500">
  <button
    onClick={onClose}
    className="absolute top-2 right-3 text-gray-400 hover:text-gray-200 text-xl mt-4"
  >
    ×
  </button>
  <h2 className="text-xl sm:text-2xl font-semibold text-left mb-0 text-white mt-4">
    🏠 Home Affordability Calculator
  </h2>
</div>

        {!showResult ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculateAffordability();
              }}
              className="space-y-4 sm:space-y-2 overflow-y-auto"
            >
              {/* Section: Location & Loan Preferences */}
              <div className="mb-4 mt-2">
                <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                  Location & Loan Preferences
                </h2>

                {/* Dropdown Field */}
                <div className="mb-4 max-w-[550px]">
                  <DropdownField
                    label="Select City"
                    section="form"
                    field="city"
                    value={formData.city}
                    onChange={handleChange}
                    options={[
                      { label: "Hyderabad", value: "Hyderabad" },
                      { label: "Mumbai", value: "Mumbai" },
                      { label: "Bangalore", value: "Bangalore" },
                      { label: "Pune", value: "Pune" },
                      { label: "Delhi", value: "Delhi" },
                    ]}
                  />
                </div>

                {/* Custom CheckBox components below dropdown */}
                <div className="flex flex-row items-center gap-6 flex-nowrap text-white">
                  <CheckBox
                    label="Home Loan"
                    section="form"
                    field="homeLoan"
                    checked={formData.homeLoan}
                    onChange={handleChange}
                  />

                  {formData.homeLoan && (
                    <CheckBox
                      label="Joint Home Loan"
                      section="form"
                      field="jointHomeLoan"
                      checked={formData.jointHomeLoan}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              {/* Section 1: Income */}
              <h3 className="text-lg font-semibold text-yellow-500 mt-4 mb-2">
                Net Income / Month
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  label="Your Income"
                  section="form"
                  field="yourIncome"
                  value={formData.yourIncome}
                  onChange={handleChange}
                  type="integer"
                />
                <InputField
                  label="Spouse Income"
                  section="form"
                  field="spouseIncome"
                  value={formData.spouseIncome}
                  onChange={handleChange}
                  type="integer"
                />
                <InputField
                  label="Other Income (You)"
                  section="form"
                  field="otherIncomeYou"
                  value={formData.otherIncomeYou}
                  onChange={handleChange}
                  type="integer"
                />
                <InputField
                  label="Other Income (Spouse)"
                  section="form"
                  field="otherIncomeSpouse"
                  value={formData.otherIncomeSpouse}
                  onChange={handleChange}
                  type="integer"
                />
              </div>

              {/* Section 2: Expenses */}
              <h3 className="text-lg font-semibold text-yellow-500 mt-6 mb-2">
                Net Expenditure Per Month
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Any Other EMIs? (₹/month)"
                  section="form"
                  field="otherEmis"
                  value={formData.otherEmis}
                  onChange={handleChange}
                />
                <InputField
                  label="Monthly Household Deductions"
                  section="form"
                  field="householdDeductions"
                  value={formData.householdDeductions}
                  onChange={handleChange}
                />
                <InputField
                  label="Education Fees"
                  section="form"
                  field="educationFees"
                  value={formData.education}
                  onChange={handleChange}
                />
                <InputField
                  label="Entertainment"
                  section="form"
                  field="entertainment"
                  value={formData.entertainment}
                  onChange={handleChange}
                />
                <InputField
                  label="Monthly Investments (SIPs etc)"
                  section="form"
                  field="monthlyInvestments"
                  value={formData.monthlyInvestments}
                  onChange={handleChange}
                />
                                <InputField
                  label="Fuel"
                  section="form"
                  field="fuel"
                  value={formData.fuel}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <h2 className="text-lg font-semibold text-yellow-500 mt-6 mb-2">
                  Loan Eligibility & Affordability
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DropdownField
                    label="Select Your CIBIL Score"
                    section="form"
                    field="creditScore"
                    value={formData.creditScore}
                    onChange={handleChange}
                    options={[
                      { label: "720 & above", value: "720_above" },
                      { label: "660-719", value: "660_719" },
                      { label: "620-659", value: "620_659" },
                      { label: "580-619", value: "580_619" },
                      { label: "579 or below", value: "579_below" },
                    ]}
                  />

                  <DropdownField
                    label="Select Spouse CIBIL Score"
                    section="form"
                    field="wifeCreditScore"
                    value={formData.wifeCreditScore}
                    onChange={handleChange}
                    options={[
                      { label: "720 & above", value: "720_above" },
                      { label: "660-719", value: "660_719" },
                      { label: "620-659", value: "620_659" },
                      { label: "580-619", value: "580_619" },
                      { label: "579 or below", value: "579_below" },
                    ]}
                  />

                  <InputField
                    label="Interest Rate (%)"
                    section="form"
                    field="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Loan Tenure (Years)"
                    section="form"
                    field="loanTenure"
                    value={formData.loanTenure}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!formData.yourIncome} // Disable if income is empty
                  className={`py-2 px-4 rounded transition ${
                    formData.yourIncome
                      ? "bg-transparent text-yellow-500 hover:underline"
                      : "text-gray-700 cursor-not-allowed"
                  }`}
                >
                  Calculate
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-yellow-500">
              🏡 Affordability Result
            </h2>

            <div className="text-center space-y-6">
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <h3 className="text-white text-lg font-semibold">
                    Your net savings per month:{" "}
                    <span className="text-yellow-500 text-xl font-bold">
                      ₹{netSavings}
                    </span>
                  </h3>

                  <h3 className="text-white text-lg font-semibold">
                    Estimated Home Price:{" "}
                    <span className="text-yellow-500 text-xl font-bold">
                      ₹{result.homePrice}
                    </span>
                  </h3>

                  <h3 className="text-white text-lg font-semibold">
                    Estimated Loan Amount:{" "}
                    <span className="text-yellow-500 text-xl font-bold">
                      ₹{result.loanAmount}
                    </span>
                  </h3>

                  <h3 className="text-white text-lg font-semibold">
                    Estimated EMI:{" "}
                    <span className="text-yellow-500 text-xl font-bold">
                      ₹{result.monthlyEMI}/month
                    </span>
                  </h3>
                </div>
                <h3 className="text-white text-lg font-semibold">
                  As per your current financial statement, you can afford a
                  property up to Rs,{" "}
                  <span className="text-yellow-500 text-xl font-bold">
                    ₹{Math.ceil(homeAffordability / 500000) * 500000}
                  </span>
                </h3>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowResult(false)}
                  className="bg-transparent text-yellow-500 px-4 py-2 rounded hover:underline"
                >
                  Go Back
                </button>
                <button
                  onClick={async () => {
                    console.log("City:", formData.city);
                    console.log("Home Affordability:", homeAffordability);
                    // Navigate to results page
                    navigate(`/search-result?city=${formData.city}&budgetMax=${homeAffordability}`);
                  }}
                  className="text-yellow-500 font-semibold px-4 py-2 rounded"
                >
                  View Properties You Can Buy
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeAffordabilityCalculator;