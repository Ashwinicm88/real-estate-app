// import React from 'react';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
// import { Container, Grid, Button } from '@mui/material';
// import DropdownField from './DropdownField'; // Adjust the import path as necessary

// const validationSchema = yup.object({
//   location: yup.string().required('Location is required'),
//   bhk: yup.string().required('BHK type is required'),
//   budget: yup.string().required('Budget is required'),
// });

// const CustomDropdownPage = () => {
//   const formik = useFormik({
//     initialValues: {
//       location: '',
//       bhk: '',
//       budget: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log('Form Submitted:', values);
//     },
//   });

//   // Sample options for the dropdowns
//   const locationOptions = [
//     { label: 'Hadapsar', value: 'hadapsar' },
//     { label: 'Kothrud', value: 'kothrud' },
//     { label: 'Airoli', value: 'airoli' },
//   ];

//   const bhkOptions = [
//     { label: '1 BHK', value: '1bhk' },
//     { label: '2 BHK', value: '2bhk' },
//     { label: '3 BHK', value: '3bhk' },
//   ];

//   const budgetOptions = [
//     { label: 'Below 30 Lakhs', value: 'below30' },
//     { label: '30 Lakhs - 50 Lakhs', value: '30to50' },
//     { label: 'Above 50 Lakhs', value: 'above50' },
//   ];

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item xs={12} sm={4}>
//             <DropdownField
//               label="Location"
//               section="search"
//               field="location"
//               value={formik.values.location}
//               onChange={formik.setFieldValue}
//               error={formik.touched.location && formik.errors.location}
//               options={locationOptions}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <DropdownField
//               label="BHK Type"
//               section="search"
//               field="bhk"
//               value={formik.values.bhk}
//               onChange={formik.setFieldValue}
//               error={formik.touched.bhk && formik.errors.bhk}
//               options={bhkOptions}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <DropdownField
//               label="Budget"
//               section="search"
//               field="budget"
//               value={formik.values.budget}
//               onChange={formik.setFieldValue}
//               error={formik.touched.budget && formik.errors.budget}
//               options={budgetOptions}
//             />
//           </Grid>
//           <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ mt: 4 }}
//         >
//           Submit
//         </Button>
//         </Grid>
       
//       </form>
//     </Container>
//   );
// };

// export default CustomDropdownPage;
import React, { useState } from 'react';
import DropdownField from './DropdownField'; // Ensure correct import path


const CustomDropdownPage = () => {
  // State for dropdown values
  const [selectedValues, setSelectedValues] = useState({
    location: '',
    bhk: '',
    budget: '',
  });

  // Function to handle dropdown change
  const handleDropdownChange = (section, field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Sample options for dropdowns
  const locationOptions = [
    { label: 'Hadapsar', value: 'hadapsar' },
    { label: 'Kothrud', value: 'kothrud' },
    { label: 'Airoli', value: 'airoli' },
  ];

  const bhkOptions = [
    { label: '1 BHK', value: '1bhk' },
    { label: '2 BHK', value: '2bhk' },
    { label: '3 BHK', value: '3bhk' },
  ];

  const budgetOptions = [
    { label: 'Below 30 Lakhs', value: 'below30' },
    { label: '30 Lakhs - 50 Lakhs', value: '30to50' },
    { label: 'Above 50 Lakhs', value: 'above50' },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', selectedValues);
  };

  return (
    <div maxWidth="lg" className="mt-8 p-6">
      <form onSubmit={handleSubmit} className="flex items-center justify-center w-full space-x-4">
        {/* All fields in a single row */}
        <div className="flex space-x-4 w-full max-w-4xl">
          <DropdownField
            label="Location"
            section="search"
            field="location"
            value={selectedValues.location}
            onChange={handleDropdownChange}
            options={locationOptions}
          />

          <DropdownField
            label="BHK Type"
            section="search"
            field="bhk"
            value={selectedValues.bhk}
            onChange={handleDropdownChange}
            options={bhkOptions}
          />

          <DropdownField
            label="Budget"
            section="search"
            field="budget"
            value={selectedValues.budget}
            onChange={handleDropdownChange}
            options={budgetOptions}
          />
        </div>

        {/* Submit button aligned in the same row */}
        <button
          type="submit"
          variant="contained"
          color="primary"
          className="bg-white hover:bg-yellow-500 text-black font-semibold px-5 py-1 rounded"
        >
          Discover Now
        </button> 
      </form> 

    
    </div>
  );
};

export default CustomDropdownPage;
