import Header from "../Components/Header";
import Section2 from "../Components/HomeSection2";
import Realestatediscover from "../Components/Realestatediscover";
import Services from "../Components/DiscoverServices";
import SectionEnd from "../Components/SectionEnd";
import WelcomePopup from "../Components/WelcomePopup";
 
 
export default function RealestateHome() {
  return (
    <div className="bg-black min-h-screen px-4 sm:px-14">
      {/* Push content down to avoid overlap */}
      <div className="pt-10">
        <WelcomePopup /> {/* Popup added here */}
        <Header />
        <div className="container mx-auto px-6 py-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Welcome to Casa - A World Reserved for the Exceptional
          </h2>
          <p className="mt-4 text-[#36454F] text-sm md:text-base">
            Handpicked, Verified, and Exclusive from the most trusted names in
            luxury real estate.
          </p>
        </div>
 
        <div className="container mx-auto">
          <Realestatediscover />
        </div>
 
        <div className="container mx-auto py-10">
          <Section2 />
        </div>
 
        <div className="container mx-auto py-10">
          <SectionEnd />
        </div>
 
        {/* Sticky Bottom Section */}
        <Services />
      </div>
 
    </div>
  );
}