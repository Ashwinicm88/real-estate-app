import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, Grid, Button } from '@mui/material';
import DropdownField from './DropdownField'; // Adjust the import path as necessary

const validationSchema = yup.object({
  location: yup.string().required('Location is required'),
  bhk: yup.string().required('BHK type is required'),
  budget: yup.string().required('Budget is required'),
});

const CustomDropdownPage = () => {
  const formik = useFormik({
    initialValues: {
      location: '',
      bhk: '',
      budget: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
    },
  });

  // Sample options for the dropdowns
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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <DropdownField
              label="Location"
              section="search"
              field="location"
              value={formik.values.location}
              onChange={formik.setFieldValue}
              error={formik.touched.location && formik.errors.location}
              options={locationOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DropdownField
              label="BHK Type"
              section="search"
              field="bhk"
              value={formik.values.bhk}
              onChange={formik.setFieldValue}
              error={formik.touched.bhk && formik.errors.bhk}
              options={bhkOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DropdownField
              label="Budget"
              section="search"
              field="budget"
              value={formik.values.budget}
              onChange={formik.setFieldValue}
              error={formik.touched.budget && formik.errors.budget}
              options={budgetOptions}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CustomDropdownPage;