
// import React from 'react';
// import { MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';

// const DropdownField = ({ label, section, field, value, onChange, error, options }) => {
//   const handleDropdownChange = (e) => {
//     onChange(section, field, e.target.value);
//   };

//   return (
//     <div style={{ marginBottom: '1rem' }}>
//       <FormControl fullWidth variant="standard" error={Boolean(error)}>
//         <InputLabel sx={{ color: '#F8F8F8' }}>{label}</InputLabel>
//         <Select
//           value={value}
//           onChange={handleDropdownChange}
//           sx={{
//             color: '#F8F8F8',
//             borderBottom: '2px solid #F8F8F8',
//             '& .MuiSvgIcon-root': { color: '#F8F8F8' } // Ensures dropdown arrow is off-white
//           }}
//         >
//           {options.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {error && <Typography color="error">{error}</Typography>}
//     </div>
//   );
// };

// export default DropdownField;
import React from 'react';
import { MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';

const DropdownField = ({ label, section, field, value, onChange, error, options }) => {
  const handleDropdownChange = (e) => {
    onChange(section, field, e.target.value);
  };

  return (
    <div className="mb-1">
    <FormControl variant="standard" error={Boolean(error)} className='w-3/4'>
      <InputLabel 
       sx={{
        color: '#9CA3AF', // Default label color
        '&.Mui-focused': { color: '#9CA3AF' }, // Keep label gray when focused
      }}
      >{label}</InputLabel>
      <Select
        value={value}
        onChange={handleDropdownChange}
        displayEmpty
        sx={{
          '& .MuiInputLabel-root': { color: '#9CA3AF' }, // Label color (default)
          '& .MuiInputLabel-root.Mui-focused': { color: '#1F2937' }, // Label color on focus
          color: '#E5E7EB', // text-gray-200
          borderBottom: '2px solid #E5E7EB', // border-gray-200
          '&.Mui-focused': { borderBottom: '2px solid #FFFFFF' }, // Focused border color
          '& .MuiSvgIcon-root': { color: '#E5E7EB' }, // Dropdown arrow color
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: '#000000', // bg-black
              color: '#E5E7EB', // text-gray-200
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ '&:hover': { bgcolor: '#1F2937' } }}// hover:bg-gray-700
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <Typography variant="caption" sx={{ color: '#d32f2f' }}>{error}</Typography>}
    </FormControl>
   
  </div>
  );
};

export default DropdownField;
