// import { useState, useEffect, useRef } from "react";
// import Header from "../Components/Header";
// import Section2 from "../Components/HomeSection2";
// import Realestatediscover from "../Components/Realestatediscover";
// import Services from "../Components/DiscoverServices";
// import SectionEnd from "../Components/SectionEnd";
// import WelcomePopup from "../Components/WelcomePopup";

// export default function RealestateHome()
// {
//   const [showServices, setShowServices] = useState(true);
//   const [showSection2, setShowSection2] = useState(false);
//   const [showSectionEnd, setShowSectionEnd] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1050);
//   const [isExact1050, setIsExact1050] = useState(window.innerWidth === 1050);
//   const section2Ref = useRef(null);
//   const sectionEndRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth > 1000);
//       setIsExact1050(window.innerWidth === 1050);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (!isLargeScreen) return;

//     setShowServices(true); // Ensure services are visible on page load

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.target.id === "section2") {
//             setShowSection2(entry.isIntersecting);
//           } else if (entry.target.id === "sectionEnd") {
//             setShowSectionEnd(entry.isIntersecting);
//           }
//         });
//       },
//       { root: null, threshold: 0 } // Trigger as soon as any part is visible
//     );

//     if (section2Ref.current) observer.observe(section2Ref.current);
//     if (sectionEndRef.current) observer.observe(sectionEndRef.current);

//     return () => observer.disconnect();
//   }, [isLargeScreen]);

//   return (
//     <div className="bg-black min-h-screen">
//       <WelcomePopup />
//       <Header />

//       <div className="container mx-auto px-6 py-10 md:ml-14 md:mt-1 pt-10 sm:mt-30 sm:pt-20 mt-10 sm:mt-20">
//         <div className="max-w-full">
//           <h2 className="text-2xl md:text-3xl font-semibold text-white sm:mt-50">
//             Welcome to Casa - A World Reserved for the Exceptional
//           </h2>
//           <p className="mt-4 text-[#36454F] text-sm md:text-base">
//             Handpicked, Verified, and Exclusive from the most trusted names in
//             luxury real estate.
//           </p>
//         </div>
//       </div>

//       {isLargeScreen ? (
//         <>
//           {/* First Screen */}
//           <div className="h-screen flex flex-col items-center relative">
//             {/* Realestatediscover */}
//             <div
//               className={`w-full flex justify-center absolute
//                 ${isExact1050 ? "top-[-15%]" : "top-10 md:top-20"}`}
//             >
//               <div className="w-full max-w-2xl md:max-w-4xl px-6">
//                 <Realestatediscover />
//               </div>
//             </div>

//             {/* Services Section - Displayed Initially */}
//             {showServices && (
//               <div
//                 className={`w-full flex justify-center relative
//                   ${isExact1050 ? "top-[50%]" : "top-[45%] md:top-[50%]"}`}
//               >
//                 <div className="bottom-0 md:bottom-5 w-full">
//                   <Services />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Second Screen */}
//           <div
//             ref={section2Ref}
//             id="section2"
//             className="h-screen flex justify-center items-center w-[90%] ml-20 mt-[-280px]"
//           >
//             {showSection2 && <Section2 />}
//           </div>

//           {/* Third Screen */}
//           <div
//             ref={sectionEndRef}
//             id="sectionEnd"
//             className="mt-5"
//           >
//             {showSectionEnd && <SectionEnd />}
//             {showSectionEnd && (
//               <div className="mb-10">
//                 <Services />
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
//         <div>
//           {/* First Screen */}
//           <div className="flex justify-center items-center w-full">
//             <div className="w-full max-w-2xl md:max-w-4xl px-4 md:px-6">
//               <Realestatediscover />
//             </div>
//           </div>

//           {/* Sections */}
//           <Section2 />
//           <SectionEnd />
//           <Services />
//         </div>
//       )}
//     </div>
//   );
// }

import Header from "../Components/Header";
import Section2 from "../Components/HomeSection2";
import Realestatediscover from "../Components/Realestatediscover";
import Services from "../Components/DiscoverServices";
import SectionEnd from "../Components/SectionEnd";
import WelcomePopup from "../Components/WelcomePopup";
import buildimage from "../Assets/build.png";
import { useEffect, useState } from "react";

export default function RealestateHome() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem("hasVisited");

    if (!isFirstVisit) {
      setShowPopup(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);
  return (
    <div className="bg-black min-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[400px]">
      {showPopup && <WelcomePopup />}
      <Header />

      {/* Main Page Wrapper with Consistent Padding */}
      <div className="px-6 sm:px-10 md:px-20 pt-12">
        {/* Hero Section */}
        <section className="mb-10 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mt-10">
            Welcome to Casa – A World Reserved for the Exceptional
          </h2>
          <p className="mt-4 text-[#A9A9A9] text-sm md:text-base max-w-2xl">
            Handpicked, Verified, and Exclusive from the most trusted names in
            luxury real estate.
          </p>
        </section>

         {/* Discover Section */}
        <section className="mt-8">
          <Realestatediscover />
        </section>
        {/* Image Section */}
        <section className="w-[1380px] h-[300px] bg-black hidden sm:block">
          <img
            src={buildimage}
            alt="Cityscape Chalk Drawing"
            className="w-full h-full object-fill"
          />
        </section>

        {/* Services Section */}
        <section className="hidden md:block">
          <Services />
        </section>

        {/* Property Section */}
        <section className="">
          <Section2 />
        </section>

        {/* Footer & End Section */}
        <section className="">
          <SectionEnd />
        </section>

        {/* Bottom Services - Optional, remove if redundant */}
        <section className="">
          <Services />
        </section>
      </div>
    </div>
  );
}
