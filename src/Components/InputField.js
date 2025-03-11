// import React from 'react';
// import { TextField } from '@mui/material';

// const InputField = ({ label, section, field, value, onChange, error, type = 'text', maxLength }) => {
//   const handleInputChange = (e) => {
//     let newValue = e.target.value;

//     // Allow only integers
//     if (type === 'integer' && !/^\d*$/.test(newValue)) return;

//     // Allow only floats
//     if (type === 'float' && !/^\d*\.?\d*$/.test(newValue)) return;

//     // Handle maxLength
//     if (maxLength && newValue.length > maxLength) return;

//     // Trigger validation only for this field
//     onChange(section, field, newValue);
//   };

//   return (
//     <div className="mb-2">
//       <TextField
//         label={label}
//         variant="standard"
//         fullWidth
//         value={value}
//         onChange={handleInputChange}
//         error={Boolean(error)}
//         helperText={error || ''}
//         type={type === 'integer' || type === 'float' ? 'text' : type}
//         inputMode={type === 'integer' ? 'numeric' : 'text'}
//         sx={{
//           '& .MuiInputLabel-root': { color: '#9CA3AF' },
//           '& .MuiInput-root': {
//             color: 'white',
//             borderBottom: '1px solid #E5E7EB',
//             width: '300px',
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default InputField;
import React from 'react';
import { TextField } from '@mui/material';


const InputField = ({ label, section, field, value, onChange, error, type = 'text', maxLength }) => {
  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log("its from the inputfield",section,field, value);
    onChange(section,field, value);
    // Trigger validation only for this field
  };


  return (
    <div className="mb-1">
      <TextField
        className='w-3/4'
        label={label}
        variant="standard"
        value={value || ""}
        onChange={handleInputChange}
        error={Boolean(error)}
        helperText={error || ''}
        type={type === 'integer' || type === 'float' ? 'text' : type}
        inputMode={type === 'integer' || type === 'float' ? 'numeric' : 'text'}
        sx={{
          '& .MuiInputLabel-root': { color: '#9CA3AF' }, // Label color (default)
          '& .MuiInputLabel-root.Mui-focused': { color: '#1F2937' }, // Label color on focus
          '& .MuiInput-root': {
            color: 'white', // Input text color
            borderBottom: '1px solid #E5E7EB', // Bottom border
            width: '100%', // Equivalent to Tailwind w-full
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#E5E7EB', // Underline color on focus
          },
        }}
      />
    </div>
  );
};


export default InputField;
//the above code is important

// InputField.js
// import React, { forwardRef } from 'react';
// import TextField from '@mui/material/TextField';

// const InputField = forwardRef(({ label, error, onChange, value, type = 'text', maxLength }, ref) => {
//   const handleInputChange = (e) => {
//     let newValue = e.target.value;

//     // Allow only integers
//     if (type === 'integer' && newValue !== '' && !/^\d+$/.test(newValue)) return;

//     // Allow only floats
//     if (type === 'float' && newValue !== '' && !/^\d*\.?\d*$/.test(newValue)) return;

//     // Handle maxLength
//     if (maxLength && newValue.length > maxLength) return;

//     // Ensure numbers are sent as undefined when empty
//     if ((type === 'integer' || type === 'float') && newValue === '') {
//       newValue = undefined;
//     }

//     // Trigger validation only for this field
//     onChange(newValue);
//   };

//   return (
//     <div className="mb-1">
//       <TextField
//         className='w-3/4'
//         label={label}
//         variant="standard"
//         value={value ?? ""}
//         onChange={handleInputChange}
//         error={Boolean(error)}
//         helperText={error || ''}
//         type={type === 'integer' || type === 'float' ? 'text' : type}
//         inputMode={type === 'integer' || type === 'float' ? 'numeric' : 'text'}
//         ref={ref} // Forward the ref to the TextField
//         sx={{
//           '& .MuiInputLabel-root': { color: '#9CA3AF' },
//           '& .MuiInput-root': {
//             color: 'white',
//             borderBottom: '1px solid #E5E7EB',
//           },
//         }}
//       />
//     </div>
//   );
// });

// export default InputField;