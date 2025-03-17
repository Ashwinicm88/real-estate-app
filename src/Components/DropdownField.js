<<<<<<< HEAD
=======

//Very Important Code for all formdata in this project
>>>>>>> Gmap
import React from 'react';
import { MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';
 
const DropdownField = ({ label, section, field, value, onChange, error, options }) => {
  const handleDropdownChange = (e) => {
    onChange(section, field, e.target.value);
  };
 
  return (
<<<<<<< HEAD
    <div className="mb-4">
    <FormControl variant="standard" error={Boolean(error)} className='w-3/4'>
      <InputLabel
=======
    <div className="w-full mb-1 mobile-s:mx-3 mobile-m:mx-4 
    text-base mobile-s:text-sm mobile-m:text-md mobile-l:text-lg md:ml-10 md:w-3/4">
    <FormControl variant="standard" error={Boolean(error)} className='w-3/4'>
      <InputLabel 
>>>>>>> Gmap
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
<<<<<<< HEAD
    {error && <Typography sx={{ color: '#EF4444)' }}>{error}</Typography>}
  </div>
  );
};
 
export default DropdownField;
=======
   
  </div>
  );
};

export default DropdownField;
// import React from 'react';
// import { MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';

// const DropdownField = ({ label, section, field, value, onChange, error, options }) => {
//   const handleDropdownChange = (e) => {
//     onChange(section, field, e.target.value);
//   };

//   return (
//     <div className="w-full overflow-hidden flex justify-center">
//       <FormControl
//         variant="standard"
//         error={Boolean(error)}
//         sx={{
//           width: 'fit-content',
//           minWidth: '200px',
//         }}
//       >
//         <InputLabel sx={{ color: '#9CA3AF', '&.Mui-focused': { color: '#9CA3AF' } }}>
//           {label}
//         </InputLabel>
//         <Select
//           value={value}
//           onChange={handleDropdownChange}
//           sx={{
//             width: '200px',
//             color: '#E5E7EB',
//             borderBottom: '2px solid #E5E7EB',
//             '&.Mui-focused': { borderBottom: '2px solid #FFFFFF' },
//             '& .MuiSvgIcon-root': { color: '#E5E7EB' },
//           }}
//           MenuProps={{
//             PaperProps: {
//               sx: {
//                 maxHeight: 200,
//                 width: 200,
//               },
//             },
//           }}
//         >
//           {options.map((option) => (
//             <MenuItem
//               key={option.value}
//               value={option.value}
//               sx={{
//                 whiteSpace: 'nowrap',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 maxWidth: '200px',
//                 '&:hover': { bgcolor: '#1F2937' },
//               }}
//             >
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//         {error && <Typography variant="caption" sx={{ color: '#d32f2f' }}>{error}</Typography>}
//       </FormControl>
//     </div>
//   );
// };

// export default DropdownField;
>>>>>>> Gmap
