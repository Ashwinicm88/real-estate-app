// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import InputField from "../Components/InputField"; // your own custom input
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";


// const onSubmit = async (data) => {
//   const { email, password } = data;

//   try {
//       const response = await axios.post("http://localhost:8080/admin/login", {
//           username: email,
//           password
//       }, { withCredentials: true });

//       if (response.status === 200) {
//           const userData = response.data;  // Expecting { username, role }
//           localStorage.setItem("user", JSON.stringify(userData));

//           console.log("Login successful");
//           navigate(userData.role === "ADMIN" ? "/admin-panel" : "/");
//       }
//   } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid credentials ❌");
//   }
// };

 
//   const values = watch(); // email and password
 
//   // 🔧 This matches InputField's signature
//   const handleFieldChange = (section, field, value) => {
//     setValue(field, value);
//     trigger(field);
//   };
//   const navigate = useNavigate();
//   const onSubmit = (data) => {
//     const { email, password } = data;
 
//     // 🔐 Dummy credentials
//     const adminEmail = "admin@example.com";
//     const adminPassword = "admin123";
 
//     if (email === adminEmail && password === adminPassword) {
//       console.log("Login successful");
//       navigate("/admin-panel"); // 🔁 redirect to your admin panel route
//     } else {
//       alert("Invalid credentials ❌");
//     }
//   };
 
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black">
//       <div className="w-full max-w-md bg-[#111] bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-gray-700">
//         <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">Admin Login</h2>
 
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Email */}
//           <InputField
//             label="Email"
//             section="admin"
//             field="email"
//             value={values.email}
//             onChange={handleFieldChange}
//             error={errors.email?.message}
//           />
 
//           {/* Password */}
//           <InputField
//             label="Password"
//             section="admin"
//             field="password"
//             type="password"
//             value={values.password}
//             onChange={handleFieldChange}
//             error={errors.password?.message}
//           />
 
//           <button
//             type="submit"
//             className="w-full mt-6 text-orange-500 font-semibold text-lg tracking-wide transition duration-200 hover:scale-105"
//             style={{
//               textShadow: "0 0 8px rgba(255, 165, 0, 0.7)",
//             }}
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
 
// export default AdminLogin;
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../Components/InputField"; // Custom Input Component
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Yup Schema for validation
const loginSchema = yup.object().shape({
  // email: yup.string().email("Email ID must be valid").required("Email is required"),
  email: yup
    .string()
    .matches(/^(admin|[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4})$/, "Email ID must be valid")
    .required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const AdminLogin = () => {
  const navigate = useNavigate(); // ✅ Correctly placed useNavigate()

  // ✅ Use react-hook-form
  const {
    setValue,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const values = watch(); // ✅ Capture form values

  // 🔧 Function to handle input changes
  const handleFieldChange = (section, field, value) => {
    setValue(field, value);
    trigger(field);
  };

  // ✅ Updated onSubmit function to call backend
  // const onSubmit = async (data) => {
  //   const { email, password } = data;
  //   console.log("Submitting request: ",{username:email,password});

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/admin/login",
  //       {
  //         username: email, // Backend expects "username" instead of "email"
  //         password,
  //       },
  //       { withCredentials: true } // Enables session handling
  //     );

  //     if (response.status === 200) {
  //       const userData = response.data; // Expecting { username, role }
  //       localStorage.setItem("user", JSON.stringify(userData));

  //       console.log("Login successful");
  //       navigate(userData.role === "ADMIN" ? "/admin-panel" : "/");
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     alert("Invalid credentials ❌");
  //   }
  // };

const onSubmit = async (data) => {
  const { email, password } = data;
  console.log("Submitting request: ", { username: email, password });

  try {
    // ✅ Convert JSON to URL-encoded form data
    const formData = new URLSearchParams();
    formData.append("username", email); // Spring expects "username"
    formData.append("password", password);

    const response = await axios.post("http://localhost:8080/admin/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // ✅ Fix: Backend expects this format
      },
      withCredentials: true, // Ensures cookies/session handling
    });

if (response.status === 200 && response.data && response.data.role === "ADMIN") {
  const userData = response.data;

  localStorage.setItem("user", JSON.stringify(userData));

  console.log("Login successful", userData);
  console.log("Navigate to:/admin-panel");
  navigate("/admin-panel"); // ✅ No need to refresh!
} else {
  console.error("Login failed: No role returned");
  alert("Invalid credentials ❌");
}

    // if (response.status === 200 && response.data.role) {
    //   const userData = response.data; // Expecting { username, role }

    //   localStorage.setItem("user", JSON.stringify(userData));

    //   console.log("Login successful",userData);
    //   // window.location.reload();
    //   navigate(userData.role === "ADMIN" ? "/admin-panel" : "/");
    // }
    // else{
    //   console.error("Login failed: No role returned");
    //   alert("Invalid credentials ❌");
    // }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Invalid credentials ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-[#111] bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <InputField
            label="Email"
            section="admin"
            field="email"
            value={values.email}
            onChange={handleFieldChange}
            error={errors.email?.message}
          />

          {/* Password */}
          <InputField
            label="Password"
            section="admin"
            field="password"
            type="password"
            value={values.password}
            onChange={handleFieldChange}
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-full mt-6 text-orange-500 font-semibold text-lg tracking-wide transition duration-200 hover:scale-105"
            style={{
              textShadow: "0 0 8px rgba(255, 165, 0, 0.7)",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
