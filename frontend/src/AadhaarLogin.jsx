// import React, { useState } from 'react';
// import { ethers } from 'ethers';

// const AadhaarLogin = () => {
//   const [aadhaar, setAadhaar] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [anonID, setAnonID] = useState(null);

//   const requestOTP = async () => {
//     if (!aadhaar || !phone) {
//       alert("Please enter Aadhaar and Phone Number!");
//       return;
//     }
//     // Simulate OTP send
//     setOtpSent(true);
//   };

//   const verifyAadhaar = async () => {
//     if (!otp) {
//       alert("Please enter the OTP!");
//       return;
//     }
//     // Simulate verification
//     setAnonID("123456789");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Panel */}
//       <div className="w-1/2 bg-blue-500 p-8 flex flex-col">
//         <div className="text-white text-2xl font-bold mb-auto">Logo</div>
//         <div className="flex justify-center items-center flex-grow">
//           <img 
//             src="/api/placeholder/400/400"
//             alt="Login illustration"
//             className="max-w-md"
//           />
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-1/2 p-8 flex flex-col justify-center">
//         <div className="max-w-md mx-auto w-full">
//           <button className="text-gray-600 mb-8">
//             ← Back
//           </button>

//           <h1 className="text-2xl font-bold mb-4">
//             {anonID ? "Verification Complete" : "Aadhaar Verification"}
//           </h1>
          
//           <p className="text-gray-600 mb-6">
//             Please enter your Aadhaar number and phone number for verification.
//           </p>

//           {!anonID ? (
//             <>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Aadhaar Number
//                   </label>
//                   <input
//                     type="text"
//                     value={aadhaar}
//                     onChange={(e) => setAadhaar(e.target.value)}
//                     className="w-full p-2 border rounded-md"
//                     placeholder="Enter your 12-digit Aadhaar number"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full p-2 border rounded-md"
//                     placeholder="Enter registered phone number"
//                   />
//                 </div>

//                 {otpSent && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       OTP
//                     </label>
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full p-2 border rounded-md"
//                       placeholder="Enter OTP"
//                     />
//                   </div>
//                 )}

//                 <button
//                   onClick={otpSent ? verifyAadhaar : requestOTP}
//                   className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   {otpSent ? "Verify OTP" : "Request OTP"}
//                 </button>
//               </div>

//               <p className="mt-6 text-center text-gray-600">
//                 Don't have an Aadhaar card?{" "}
//                 <a href="#" className="text-blue-500 hover:underline">
//                   Apply here
//                 </a>
//               </p>
//             </>
//           ) : (
//             <div className="text-center">
//               <div className="mb-4 text-green-500 font-medium">
//                 Verification Successful!
//               </div>
//               <div className="mb-4">
//                 Your Anonymous ID: <strong>{anonID}</strong>
//               </div>
//               <button
//                 onClick={() => {}}
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//               >
//                 Continue to Blockchain Registration
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AadhaarLogin;



// import React, { useState } from 'react';

// const AadhaarLogin = ({ onOTPRequest, onOTPVerify, onBlockchainRegister }) => {
//   const [aadhaar, setAadhaar] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [anonID, setAnonID] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const requestOTP = async () => {
//     if (!aadhaar || !phone) {
//       setError("Please enter both Aadhaar and Phone Number!");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const result = await onOTPRequest(aadhaar, phone);
//       if (result.success) {
//         setOtpSent(true);
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError("Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyAadhaar = async () => {
//     if (!otp) {
//       setError("Please enter the OTP!");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const result = await onOTPVerify(aadhaar, phone, otp);
//       if (result.success) {
//         setAnonID(result.anonymousId);
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError("Verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBlockchainRegistration = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       await onBlockchainRegister(anonID);
//     } catch (err) {
//       setError("Blockchain registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Panel */}
//       <div className="w-1/2 bg-blue-500 p-8 flex flex-col">
//         <div className="text-white text-2xl font-bold mb-auto">Logo</div>
//         <div className="flex justify-center items-center flex-grow">
//           <img 
//             src="/api/placeholder/400/400"
//             alt="Login illustration"
//             className="max-w-md"
//           />
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-1/2 p-8 flex flex-col justify-center">
//         <div className="max-w-md mx-auto w-full">
//           <button className="text-gray-600 mb-8">
//             ← Back
//           </button>

//           <h1 className="text-2xl font-bold mb-4">
//             {anonID ? "Verification Complete" : "Aadhaar Verification"}
//           </h1>
          
//           <p className="text-gray-600 mb-6">
//             Please enter your Aadhaar number and phone number for verification.
//           </p>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//               {error}
//             </div>
//           )}

//           {!anonID ? (
//             <>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Aadhaar Number
//                   </label>
//                   <input
//                     type="text"
//                     value={aadhaar}
//                     onChange={(e) => setAadhaar(e.target.value)}
//                     className="w-full p-2 border rounded-md"
//                     placeholder="Enter your 12-digit Aadhaar number"
//                     disabled={loading}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full p-2 border rounded-md"
//                     placeholder="Enter registered phone number"
//                     disabled={loading}
//                   />
//                 </div>

//                 {otpSent && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       OTP
//                     </label>
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full p-2 border rounded-md"
//                       placeholder="Enter OTP"
//                       disabled={loading}
//                     />
//                   </div>
//                 )}

//                 <button
//                   onClick={otpSent ? verifyAadhaar : requestOTP}
//                   className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
//                   disabled={loading}
//                 >
//                   {loading ? "Processing..." : (otpSent ? "Verify OTP" : "Request OTP")}
//                 </button>
//               </div>

//               <p className="mt-6 text-center text-gray-600">
//                 Don't have an Aadhaar card?{" "}
//                 <a href="#" className="text-blue-500 hover:underline">
//                   Apply here
//                 </a>
//               </p>
//             </>
//           ) : (
//             <div className="text-center">
//               <div className="mb-4 text-green-500 font-medium">
//                 Verification Successful!
//               </div>
             
//               <button
//                 onClick={handleBlockchainRegistration}
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Next"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AadhaarLogin;


import React, { useState } from 'react';
import { Building, ChevronLeft } from 'lucide-react';
import imgPath from './assets/image-removebg-preview.png';


const AadhaarLogin = ({ onOTPRequest, onOTPVerify, onBlockchainRegister }) => {
  const [aadhaar, setAadhaar] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [anonID, setAnonID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestOTP = async () => {
    if (!aadhaar || !phone) {
      setError("Please enter both Aadhaar and Phone Number!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await onOTPRequest(aadhaar, phone);
      if (result.success) {
        setOtpSent(true);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyAadhaar = async () => {
    if (!otp) {
      setError("Please enter the OTP!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await onOTPVerify(aadhaar, phone, otp);
      if (result.success) {
        setAnonID(result.anonymousId);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockchainRegistration = async () => {
    setLoading(true);
    setError("");

    try {
      await onBlockchainRegister(anonID);
    } catch (err) {
      setError("Blockchain registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Now with gradient background matching landing page */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-8 flex flex-col relative">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-slate-900/30 backdrop-blur-sm" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-white">
            <Building className="h-8 w-8 text-indigo-300" />
            <span className="text-xl font-bold tracking-tight">TO-RENT</span>
          </div>
          
          <div className="flex justify-center items-center h-full mt-12">
            <img 
              src={imgPath}
              alt="Login illustration"
              className="max-w-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-8 flex flex-col justify-center bg-slate-50">
        <div className="max-w-md mx-auto w-full">
          <button className="text-slate-600 mb-8 flex items-center hover:text-indigo-600 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </button>

          <h1 className="text-3xl font-bold mb-4 text-slate-900 tracking-tight">
            {anonID ? "Verification Complete" : "Aadhaar Verification"}
          </h1>
          
          <p className="text-slate-600 mb-6 tracking-wide">
            Please enter your Aadhaar number and phone number for verification.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {!anonID ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter your 12-digit Aadhaar number"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter registered phone number"
                    disabled={loading}
                  />
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Enter OTP"
                      disabled={loading}
                    />
                  </div>
                )}

                <button
                  onClick={otpSent ? verifyAadhaar : requestOTP}
                  className="w-full bg-black from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? "Processing..." : (otpSent ? "Verify OTP" : "Request OTP")}
                </button>
              </div>

            
            </>
          ) : (
            <div className="text-center">
              <div className="mb-4 text-green-500 font-medium">
                Verification Successful!
              </div>
             
              <button
                onClick={handleBlockchainRegistration}
                className="w-full bg-black from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? "Processing..." : "Next"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AadhaarLogin;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate
// import { Building, ChevronLeft } from 'lucide-react';
// import imgPath from './assets/image-removebg-preview.png';

// const AadhaarLogin = ({ onOTPRequest, onOTPVerify, onBlockchainRegister }) => {
//   const [aadhaar, setAadhaar] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [anonID, setAnonID] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();  // Initialize navigate

//   const handleBlockchainRegistration = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       await onBlockchainRegister(anonID, navigate);  // Pass navigate function
//     } catch (err) {
//       setError("Blockchain registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <div className="w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-8 flex flex-col relative">
//         <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-slate-900/30 backdrop-blur-sm" />
        
//         <div className="relative z-10">
//           <div className="flex items-center space-x-2 text-white">
//             <Building className="h-8 w-8 text-indigo-300" />
//             <span className="text-xl font-bold tracking-tight">TO-RENT</span>
//           </div>
          
//           <div className="flex justify-center items-center h-full mt-12">
//             <img 
//               src={imgPath}
//               alt="Login illustration"
//               className="max-w-md w-full"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="w-1/2 p-8 flex flex-col justify-center bg-slate-50">
//         <div className="max-w-md mx-auto w-full">
//           <button className="text-slate-600 mb-8 flex items-center hover:text-indigo-600 transition-colors">
//             <ChevronLeft className="h-5 w-5 mr-1" />
//             Back
//           </button>

//           <h1 className="text-3xl font-bold mb-4 text-slate-900 tracking-tight">
//             {anonID ? "Verification Complete" : "Aadhaar Verification"}
//           </h1>
          
//           <p className="text-slate-600 mb-6 tracking-wide">
//             Please enter your Aadhaar number and phone number for verification.
//           </p>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}

//           {!anonID ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   Aadhaar Number
//                 </label>
//                 <input
//                   type="text"
//                   value={aadhaar}
//                   onChange={(e) => setAadhaar(e.target.value)}
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                   placeholder="Enter your 12-digit Aadhaar number"
//                   disabled={loading}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                   placeholder="Enter registered phone number"
//                   disabled={loading}
//                 />
//               </div>

//               {otpSent && (
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-1">
//                     OTP
//                   </label>
//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                     placeholder="Enter OTP"
//                     disabled={loading}
//                   />
//                 </div>
//               )}

//               <button
//                 onClick={otpSent ? verifyAadhaar : requestOTP}
//                 className="w-full bg-black from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : (otpSent ? "Verify OTP" : "Request OTP")}
//               </button>
//             </div>
//           ) : (
//             <div className="text-center">
//               <div className="mb-4 text-green-500 font-medium">
//                 Verification Successful!
//               </div>
             
//               <button
//                 onClick={handleBlockchainRegistration}
//                 className="w-full bg-black from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Next"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AadhaarLogin;
