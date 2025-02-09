// import React, { useState } from 'react';
// import { Shield, Key, Scale, UserCheck, Cpu, Clock, Lock, ChevronRight, Building, Users, Menu, X, Play, Pause, XCircle } from 'lucide-react';
// import { motion } from "framer-motion";
// import Typewriter from "react-typewriter-effect";

// const LandingPage = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const features = [
//     {
//       icon: Shield,
//       title: 'Immutable Agreements',
//       description: 'Tamper-proof rental contracts stored securely on the blockchain',
//       details: 'Our smart contracts are built on advanced blockchain technology, ensuring that once signed, agreements cannot be altered without mutual consent. Every change is tracked and timestamped.'
//     },
//     {
//       icon: Clock,
//       title: 'Automated Payments',
//       description: 'Smart contracts handle rent payments and deposits automatically',
//       details: 'Set up recurring payments that execute automatically on predefined dates. Late payments trigger smart notifications, and security deposits are held in secure escrow.'
//     },
//     {
//       icon: Scale,
//       title: 'Dispute Resolution',
//       description: 'Built-in decentralized arbitration system for conflict resolution',
//       details: 'Our decentralized arbitration system ensures fair and transparent dispute resolution, with automated enforcement of decisions.'
//     },
//     {
//       icon: UserCheck,
//       title: 'Identity Verification',
//       description: 'Secure blockchain-based identity verification system',
//       details: 'Advanced identity verification using blockchain credentials ensures all parties are verified and trustworthy.'
//     },
//     {
//       icon: Lock,
//       title: 'Enhanced Security',
//       description: 'Military-grade encryption for all rental transactions',
//       details: 'State-of-the-art encryption protects all transactions and personal data, ensuring maximum security for all users.'
//     },
//     {
//       icon: Cpu,
//       title: 'Smart Enforcement',
//       description: 'Self-executing contracts ensure compliance with terms',
//       details: 'Automated enforcement of contract terms eliminates manual oversight and ensures all parties fulfill their obligations.'
//     }
//   ];

//   const steps = [
//     {
//       step: '01',
//       title: 'Create Account',
//       description: 'Sign up and verify your identity using blockchain credentials'
//     },
//     {
//       step: '02',
//       title: 'List or Find Property',
//       description: 'Browse verified listings or create your own rental property'
//     },
//     {
//       step: '03',
//       title: 'Smart Contract',
//       description: 'Generate an automated, tamper-proof rental agreement'
//     },
//     {
//       step: '04',
//       title: 'Secure Management',
//       description: 'Enjoy automated payments and transparent rental management'
//     }
//   ];

//   const FeatureModal = ({ feature, onClose }) => {
//     if (!feature) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
//         <div className="bg-white rounded-lg p-6 max-w-md w-full m-4 relative animate-slideIn">
//           <button 
//             onClick={onClose}
//             className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
//           >
//             <XCircle className="h-6 w-6" />
//           </button>
          
//           <div className="flex items-center space-x-2 mb-4">
//             <feature.icon className="h-6 w-6 text-indigo-600" />
//             <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
//           </div>
          
//           <p className="text-slate-600 mb-6 leading-relaxed">{feature.details}</p>
          
//           <div className="flex justify-end space-x-4">
//             <button 
//               onClick={onClose}
//               className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
//             >
//               Close
//             </button>
//             <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
//       {/* Navigation */}
//       <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-2">
//               <Building className="h-8 w-8 text-indigo-300  hover:rotate-12 transition-transform" />
//               <span className="text-xl font-bold text-slate-800 tracking-tight">TO-RENT</span>
//             </div>
            
//             <div className="hidden md:block">
//               <div className="flex items-center text-slate-800 space-x-8">
//                 {['Features', 'How it Works', 'Benefits', 'Contact'].map((item) => (
//                   <a
//                     key={item}
//                     href={`#${item.toLowerCase().replace(' ', '-')}`}
//                     className="text-slate-600 hover:text-indigo-600 relative group tracking-wide"
//                   >
//                     {item}
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
//                   </a>
//                 ))}
//                 <button className="bg-slate-900  text-white px-4 py-2 rounded-lg hover:bg-slate-900   transform hover:scale-105 transition-all tracking-wide">
//                   Get Started
//                 </button>
//               </div>
//             </div>
            
//             <button 
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
        
//         <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden`}>
//           <div className="px-4 pt-2 pb-3 space-y-1">
//             {['Features', 'How it Works', 'Benefits', 'Contact'].map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase().replace(' ', '-')}`}
//                 className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md tracking-wide"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-slate-900/30 backdrop-blur-sm" />
//           <div className="absolute inset-0">
//             <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent animate-pulse" />
//           </div>
//         </div>
        
//         <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center text-white space-y-8">

//             <h1 className="text-6xl font-bold leading-tight tracking-tight">
//               Secure Blockchain
//               <br />
//               <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
//                 Rental Agreements
//               </span>
//             </h1>

   

//             <p className="text-xl max-w-2xl mx-auto leading-relaxed tracking-wide text-slate-200">
//               Transform your rental experience with transparent, automated, and tamper-proof 
//               smart contracts. Say goodbye to rental fraud and payment disputes.
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button className="bg-white text-indigo-300 font-extrabold px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-105 transition-all flex items-center tracking-wide">
//                 Start Now <ChevronRight className="ml-2 h-5 w-5" />
//               </button>
//               <button className="border-2 border-white/80 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-all tracking-wide">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-8 bg-white" id="features">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Key Features</h2>
//             <p className="text-slate-600 mt-2 tracking-wide">Revolutionizing rental agreements with blockchain technology</p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group bg-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
//                 onClick={() => setActiveFeature(feature)}
//               >
//                 <div className="inline-flex items-center justify-center w-12 h-12  text-indigo-3
//                 00 rounded-lg mb-4 group-hover:scale-110 transition-transform">
//                   <feature.icon className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">{feature.title}</h3>
//                 <p className="text-slate-600 tracking-wide leading-relaxed">{feature.description}</p>
//                 <ChevronRight className="mt-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>



// {/* How It Works Section */}
// <div className="py-10 bg-slate-50" id="how-it-works">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="text-center mb-16">
//       <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How It Works</h2>
//       <p className="text-slate-600 mt-4 tracking-wide">Simple, secure, and efficient rental management</p>
//     </div>

//     <div className="grid md:grid-cols-4 gap-8">
//       {steps.map((step, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, x: -50 }} // Start off-screen to the left
//           whileInView={{ opacity: 1, x: 0 }} // Slide in from left
//           transition={{ delay: index * 0.3, duration: 0.6, ease: "easeOut" }} // Step-by-step effect
//           viewport={{ once: true, amount: 0.2 }} // Trigger when in view
//           className="relative group cursor-pointer"
//         >
//           <div className="text-4xl font-bold text-pink-500/20 mb-4 group-hover:text-pink-500/40 transition-colors tracking-tight">
//             {step.step}
//           </div>
//           <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">{step.title}</h3>
//           <p className="text-slate-600 tracking-wide leading-relaxed">{step.description}</p>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </div>



//       {/* CTA Section */}
//       <div className=" bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-4 tracking-tight">Ready to Transform Your Rental Experience?</h2>
//           <p className="text-indigo-100 mb-8 tracking-wide">Join thousands of landlords and tenants using Tor-Rent</p>
//           <button className="bg-white text-indigo-300 font-extrabold px-8 py-3 rounded-lg hover:bg-indigo-50 transform hover:scale-105 transition-all tracking-wide">
//             Get Started Now
//           </button>
//         </div>
//       </div>


// <footer className="bg-slate-900 text-slate-400 py-6">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="grid md:grid-cols-4 gap-6">
//       <div>
//         <div className="flex items-center space-x-2 text-white mb-3">
//           <Building className="h-6 w-6 text-indigo-500" />
//           <span className="text-lg font-bold tracking-tight">TO-RENT</span>
//         </div>
//         <p className="text-sm tracking-wide">Blockchain-powered rental agreements for the modern world.</p>
//       </div>

//       {['Platform', 'Resources', 'Legal'].map((title, index) => (
//         <div key={index}>
//           <h3 className="text-white font-semibold mb-3 tracking-tight text-sm">{title}</h3>
//           <ul className="space-y-1">
//             {['About', 'Features', 'Documentation', 'Contact'].map((item, idx) => (
//               <li key={idx}>
//                 <a href="#" className="text-sm hover:text-indigo-400 transition-colors tracking-wide">{item}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>

//     <div className="border-t border-slate-800 mt-6 pt-4 text-center">
//       <p className="text-xs tracking-wide">&copy; 2024 Tor-Rent. All rights reserved.</p>
//     </div>
//   </div>
// </footer>


//       {/* Feature Modal */}
//       {activeFeature && (
//         <FeatureModal 
//           feature={activeFeature} 
//           onClose={() => setActiveFeature(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default LandingPage;










// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Shield, Key, Scale, UserCheck, Cpu, Clock, Lock, ChevronRight, Building, Users, Menu, X, Play, Pause, XCircle } from 'lucide-react';
// import { motion } from "framer-motion";
// import Typewriter from "react-typewriter-effect";

// const LandingPage = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const navigate = useNavigate(); // Get the navigate function

//   const features = [
//     {
//               icon: Shield,
//               title: 'Immutable Agreements',
//               description: 'Tamper-proof rental contracts stored securely on the blockchain',
//               details: 'Our smart contracts are built on advanced blockchain technology, ensuring that once signed, agreements cannot be altered without mutual consent. Every change is tracked and timestamped.'
//             },
//             {
//               icon: Clock,
//               title: 'Automated Payments',
//               description: 'Smart contracts handle rent payments and deposits automatically',
//               details: 'Set up recurring payments that execute automatically on predefined dates. Late payments trigger smart notifications, and security deposits are held in secure escrow.'
//             },
//             {
//               icon: Scale,
//               title: 'Dispute Resolution',
//               description: 'Built-in decentralized arbitration system for conflict resolution',
//               details: 'Our decentralized arbitration system ensures fair and transparent dispute resolution, with automated enforcement of decisions.'
//             },
//             {
//               icon: UserCheck,
//               title: 'Identity Verification',
//               description: 'Secure blockchain-based identity verification system',
//               details: 'Advanced identity verification using blockchain credentials ensures all parties are verified and trustworthy.'
//             },
//             {
//               icon: Lock,
//               title: 'Enhanced Security',
//               description: 'Military-grade encryption for all rental transactions',
//               details: 'State-of-the-art encryption protects all transactions and personal data, ensuring maximum security for all users.'
//             },
//             {
//               icon: Cpu,
//               title: 'Smart Enforcement',
//               description: 'Self-executing contracts ensure compliance with terms',
//               details: 'Automated enforcement of contract terms eliminates manual oversight and ensures all parties fulfill their obligations.'
//             }
//   ];

//   const steps = [
//     {
//               step: '01',
//               title: 'Create Account',
//               description: 'Sign up and verify your identity using blockchain credentials'
//             },
//             {
//               step: '02',
//               title: 'List or Find Property',
//               description: 'Browse verified listings or create your own rental property'
//             },
//             {
//               step: '03',
//               title: 'Smart Contract',
//               description: 'Generate an automated, tamper-proof rental agreement'
//             },
//             {
//               step: '04',
//               title: 'Secure Management',
//               description: 'Enjoy automated payments and transparent rental management'
//             }
//   ];

//   const FeatureModal = ({ feature, onClose }) => {
//     if (!feature) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
//         <div className="bg-white rounded-lg p-6 max-w-md w-full m-4 relative animate-slideIn">
//           <button 
//             onClick={onClose}
//             className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
//           >
//             <XCircle className="h-6 w-6" />
//           </button>
          
//           <div className="flex items-center space-x-2 mb-4">
//             <feature.icon className="h-6 w-6 text-indigo-600" />
//             <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
//           </div>
          
//           <p className="text-slate-600 mb-6 leading-relaxed">{feature.details}</p>
          
//           <div className="flex justify-end space-x-4">
//             <button 
//               onClick={onClose}
//               className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
//             >
//               Close
//             </button>
//             <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
//       {/* Navigation */}
//       {/* Your navigation code */}

//       {/* Hero Section */}
//       <div className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-slate-900/30 backdrop-blur-sm" />
//           <div className="absolute inset-0">
//             <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent animate-pulse" />
//           </div>
//         </div>
        
//         <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center text-white space-y-8">
//             <h1 className="text-6xl font-bold leading-tight tracking-tight">
//               Secure Blockchain
//               <br />
//               <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
//                 Rental Agreements
//               </span>
//             </h1>

//             <p className="text-xl max-w-2xl mx-auto leading-relaxed tracking-wide text-slate-200">
//               Transform your rental experience with transparent, automated, and tamper-proof 
//               smart contracts. Say goodbye to rental fraud and payment disputes.
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => navigate('/aadhaar-login')} // Navigate to AadhaarLogin page
//                 className="bg-white text-indigo-300 font-extrabold px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-105 transition-all flex items-center tracking-wide"
//               >
//                 Start Now <ChevronRight className="ml-2 h-5 w-5" />
//               </button>
//               <button className="border-2 border-white/80 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-all tracking-wide">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

     
//     </div>
//   );
// };

// export default LandingPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Key, Scale, UserCheck, Cpu, Clock, Lock, ChevronRight, Building, Users, Menu, X, Play, Pause, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Typewriter from 'react-typewriter-effect';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const navigate = useNavigate(); // Get the navigate function

  const features = [
    {
      icon: Shield,
      title: 'Immutable Agreements',
      description: 'Tamper-proof rental contracts stored securely on the blockchain',
      details: 'Our smart contracts are built on advanced blockchain technology, ensuring that once signed, agreements cannot be altered without mutual consent. Every change is tracked and timestamped.',
    },
    {
      icon: Clock,
      title: 'Automated Payments',
      description: 'Smart contracts handle rent payments and deposits automatically',
      details: 'Set up recurring payments that execute automatically on predefined dates. Late payments trigger smart notifications, and security deposits are held in secure escrow.',
    },
    {
      icon: Scale,
      title: 'Dispute Resolution',
      description: 'Built-in decentralized arbitration system for conflict resolution',
      details: 'Our decentralized arbitration system ensures fair and transparent dispute resolution, with automated enforcement of decisions.',
    },
    {
      icon: UserCheck,
      title: 'Identity Verification',
      description: 'Secure blockchain-based identity verification system',
      details: 'Advanced identity verification using blockchain credentials ensures all parties are verified and trustworthy.',
    },
    {
      icon: Lock,
      title: 'Enhanced Security',
      description: 'Military-grade encryption for all rental transactions',
      details: 'State-of-the-art encryption protects all transactions and personal data, ensuring maximum security for all users.',
    },
    {
      icon: Cpu,
      title: 'Smart Enforcement',
      description: 'Self-executing contracts ensure compliance with terms',
      details: 'Automated enforcement of contract terms eliminates manual oversight and ensures all parties fulfill their obligations.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Account',
      description: 'Sign up and verify your identity using blockchain credentials',
    },
    {
      step: '02',
      title: 'List or Find Property',
      description: 'Browse verified listings or create your own rental property',
    },
    {
      step: '03',
      title: 'Smart Contract',
      description: 'Generate an automated, tamper-proof rental agreement',
    },
    {
      step: '04',
      title: 'Secure Management',
      description: 'Enjoy automated payments and transparent rental management',
    },
  ];

  const FeatureModal = ({ feature, onClose }) => {
    if (!feature) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white rounded-lg p-6 max-w-md w-full m-4 relative animate-slideIn">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
            <XCircle className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-2 mb-4">
            <feature.icon className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
          </div>

          <p className="text-slate-600 mb-6 leading-relaxed">{feature.details}</p>

          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors">
              Close
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-indigo-300 hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold text-slate-800 tracking-tight">TO-RENT</span>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center text-slate-800 space-x-8">
                {['Features', 'How it Works', 'Benefits', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-slate-600 hover:text-indigo-600 relative group tracking-wide"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
                  </a>
                ))}
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transform hover:scale-105 transition-all tracking-wide">
                  Get Started
                </button>
              </div>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {['Features', 'How it Works', 'Benefits', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-slate-900/30 backdrop-blur-sm" />
          <div className="absolute inset-0">
            <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent animate-pulse" />
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white space-y-8">
            <h1 className="text-6xl font-bold leading-tight tracking-tight">
              Secure Blockchain
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
                Rental Agreements
              </span>
            </h1>

            <p className="text-xl max-w-2xl mx-auto leading-relaxed tracking-wide text-slate-200">
              Transform your rental experience with transparent, automated, and tamper-proof
              smart contracts. Say goodbye to rental fraud and payment disputes.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/aadhaar-login')} // Navigate to AadhaarLogin page
                className="bg-white text-indigo-300 font-extrabold px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-105 transition-all flex items-center tracking-wide"
              >
                Start Now <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white/80n bg-black text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-all tracking-wide">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Key Features</h2>
            <p className="text-slate-600 mt-2 tracking-wide">Revolutionizing rental agreements with blockchain technology</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col justify-center items-center rounded-xl bg-slate-50 shadow-lg px-6 py-8"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveFeature(feature)}
              >
                <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 mt-2 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


{/* How It Works Section */}
<div className="py-10 bg-slate-50" id="how-it-works">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How It Works</h2>
      <p className="text-slate-600 mt-4 tracking-wide">Simple, secure, and efficient rental management</p>
    </div>

    <div className="grid md:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }} // Start off-screen to the left
          whileInView={{ opacity: 1, x: 0 }} // Slide in from left
          transition={{ delay: index * 0.3, duration: 0.6, ease: "easeOut" }} // Step-by-step effect
          viewport={{ once: true, amount: 0.2 }} // Trigger when in view
          className="relative group cursor-pointer"
        >
          <div className="text-4xl font-bold text-pink-500/20 mb-4 group-hover:text-pink-500/40 transition-colors tracking-tight">
            {step.step}
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">{step.title}</h3>
          <p className="text-slate-600 tracking-wide leading-relaxed">{step.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</div>



      {/* CTA Section */}
      <div className=" bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Ready to Transform Your Rental Experience?</h2>
          <p className="text-indigo-100 mb-8 tracking-wide">Join thousands of landlords and tenants using Tor-Rent</p>
          <button className="bg-black text-indigo-300 font-extrabold px-8 py-3 rounded-lg hover:bg-indigo-50 transform hover:scale-105 transition-all tracking-wide">
            Get Started Now
          </button>
        </div>
      </div>


<footer className="bg-slate-900 text-slate-400 py-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-4 gap-6">
      <div>
        <div className="flex items-center space-x-2 text-white mb-3">
          <Building className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-bold tracking-tight">TO-RENT</span>
        </div>
        <p className="text-sm tracking-wide">Blockchain-powered rental agreements for the modern world.</p>
      </div>

      {['Platform', 'Resources', 'Legal'].map((title, index) => (
        <div key={index}>
          <h3 className="text-white font-semibold mb-3 tracking-tight text-sm">{title}</h3>
          <ul className="space-y-1">
            {['About', 'Features', 'Documentation', 'Contact'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors tracking-wide">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-slate-800 mt-6 pt-4 text-center">
      <p className="text-xs tracking-wide">&copy; 2024 Tor-Rent. All rights reserved.</p>
    </div>
  </div>
</footer>

      {/* Feature Modal */}
      <FeatureModal feature={activeFeature} onClose={() => setActiveFeature(null)} />
    </div>
  );
};

export default LandingPage;
