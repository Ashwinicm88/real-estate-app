// import Home from "./Pages/Home";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import React from "react";
// import DisplayImages from "./components/DisplayImages";
// import MultipleImageUpload from "./components/MultipleImageUpload";
// import SingleImageDisplay from "./components/SingleImageDisplay";
// import SingleImageUpload from "./components/SingleImageUpload";
// import Display from "./Pages/Display_D";
// import PropertySearch from "./components/PropertySearch";
// import Project from "./components/ImageSwapper";
// // import ImageSlider from "./components/ImageSlider";
// // import ImageSlider from "./components/ImageSlider";
// // import ProjectPriceChart from "./Pages/ProjectPriceChart";
// const App = () => {

//   return (
//     <Router>
//       <Routes>
//        <Route path="/" element={<Home />}></Route>
//        <Route path="/Display" element={<Display />}></Route>
//        <Route path="/DisplayImages" element={<DisplayImages />}></Route>
//        <Route path="/multiple-upload" element={<MultipleImageUpload />}></Route>
//        <Route path="/single-upload" element={<SingleImageUpload />}></Route>
//        <Route path="/single-display" element={<SingleImageDisplay />}></Route>
//        <Route path="/property-search" element={<PropertySearch />}></Route>
//        {/* <Route path="/image-swapper" element={<ImageSwiper />}></Route> */}
//        {/* <Route path="/project/:projectId" element={<ImageSwapper />} /> ✅ Correct route */}
//        <Route path="/project/:projectId" element={<Project />} />
//        {/* <Route pathe="/image-slider" element={<ImageSlider />}></Route> */}
//        {/* <Route path="/project-price-chart" element={<ProjectPriceChart />}></Route> */}
//        </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
// import DisplayImages from "./components/DisplayImages";
import MultipleImageUpload from "./components/MultipleImageUpload";
import SingleImageDisplay from "./components/SingleImageDisplay";
import SingleImageUpload from "./components/SingleImageUpload";
import Display from "./Pages/Display_D";
import PropertySearch from "./components/PropertySearch";
import Project from "./components/ImageSwapper";
import ProjectPriceChart from "./Pages/ProjectPriceChart"; // ✅ Import ProjectPriceChart
import SinChartdisplay from "./components/SinChart";
import PriceScatterChart from "./components/PriceScatterChart";
import PriceBarChart from "./components/PriceBarChart";
import ScatterChartComponent from "./components/ScatterChartComponent";
import Organizations from "./components/Organizations";
import ShowOrganization from "./components/MultiStageForm";
import Displayprop from "./Pages/Display";

// import DisplayImages from "./components/DisplayImages";

// import SingleImageDisplay from "./components/SingleImageDisplay";
// import SingleImageUpload from "./components/SingleImageUpload";

// import VersionDisplay from "./Pages/Version2_Display";
// import WingDetails from "./components/wing_details";
import ShowNeedle from "./components/showneedle"
import FormDataInput from "./Pages/FormData";
import RealestateHome from "./Pages/Realestate-Home";
import PostFormData from "./components/PostwithForm";
import AllStageData from "./components/AllStageData"
import './App.css';


const App = () => {
  return (
   // <Router>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Display" element={<Display />} />
        {/* <Route path="/DisplayImages" element={<DisplayImages />} /> */}
        <Route path="/multiple-upload" element={<MultipleImageUpload />} />
        <Route path="/single-upload" element={<SingleImageUpload />} />
        <Route path="/single-display" element={<SingleImageDisplay />} />
        <Route path="/property-search" element={<PropertySearch />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/project-price-chart" element={<ProjectPriceChart />} /> {/* ✅ Added Route */}
        <Route path="/sin-chart-display" element={<SinChartdisplay />} />
        <Route path="/price-scatter-chart" element={<PriceScatterChart />} />
        <Route path="/price-bar-chart" element={<PriceBarChart />} />
        <Route path="/scatter-chart" element={<ScatterChartComponent />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/show-formdata" element={<FormDataInput />}></Route>
        <Route path="/show-organization" element={<ShowOrganization />}></Route>
        <Route path="/display-d" element={<Displayprop />}></Route>
        <Route path="/realestate-home" element={<RealestateHome />}></Route>
        <Route path="/show-needle" element={<ShowNeedle />}></Route>
        <Route path="/post-formdata" element={<PostFormData />}></Route>
        <Route path="/multiple-upload" element={<MultipleImageUpload />}></Route>
        <Route path="/all-stagedata" element={<AllStageData />}></Route>
      </Routes>
       {/* <Route path="/" element={<Home />}></Route>
       <Route path="/displayimages" element={<DisplayImages />}></Route>
     
       <Route path="/single-upload" element={<SingleImageUpload />}></Route>
       <Route path="/single-display" element={<SingleImageDisplay />}></Route>
       <Route path="/property-search" element={<PropertySearch />}></Route>
       <Route path="/version-display" element={<VersionDisplay />}></Route>
       <Route path="/wing-details" element={<WingDetails />}></Route>
       <Route path="/show-needle" element={<ShowNeedle />}></Route>
       <Route path="/show-formdata" element={<FormDataInput />}></Route>
       </Routes> */}
    </Router>
   
  );
};

export default App;
