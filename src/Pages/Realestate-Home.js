import Navbar from "../components/Navbar";
import Realestatediscover from "../components/Realestatediscover";
export default function RealestateHome() {
    return (
        
        <div>
            <Navbar />
            <div className="p-4">
            <h2 className="text-2xl font-semibold text-yellow-400">Welcome to RealEstateBuddy - A World Reserved for the Exceptional</h2>
            <p className="mt-4 text-gray-300">Handpicked, Verified, and Exclusive from the most trusted names in luxury real estate</p>
            </div>
             <Realestatediscover/>
        
            
            
        </div>
    );
}