import Header from "../Components/Header";
import Section2 from "../Components/Section2";
import Realestatediscover from "../Components/Realestatediscover";
import Services from "../Components/DiscoverServices";
import SectionEnd from "../Components/SectionEnd";

export default function RealestateHome() {
  return (
    <div className="bg-black min-h-screen px-14">
      <Header />
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-yellow-400">
          Welcome to Casa - A World Reserved for the Exceptional
        </h2>
        <p className="mt-4 text-gray-300">
          Handpicked, Verified, and Exclusive from the most trusted names in
          luxury real estate
        </p>
      </div>
      <div className="container mx-auto  py-10">
        <Realestatediscover />
      </div>

      {/* Property Listings */}
      <div className="container mx-auto py-10">
        <Section2 />
      </div>
      <div className="container mx-auto py-10">
        <SectionEnd />
        
        </div>
        
        <Services />
    </div>
    
  );
}
