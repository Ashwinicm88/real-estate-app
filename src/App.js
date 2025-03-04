// import Home from "./Pages/Home";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import React from "react";
// import DisplayImages from "./Components/DisplayImages";
// import MultipleImageUpload from "./Components/MultipleImageUpload";
// import SingleImageDisplay from "./Components/SingleImageDisplay";
// import SingleImageUpload from "./Components/SingleImageUpload";
// import Display from "./Pages/Display_D";
// import PropertySearch from "./Components/PropertySearch";
// import Project from "./Components/ImageSwapper";
// // import ImageSlider from "./Components/ImageSlider";
// // import ImageSlider from "./Components/ImageSlider";
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
import DisplayImages from "./Components/DisplayImages";
import MultipleImageUpload from "./Components/MultipleImageUpload";
import SingleImageDisplay from "./Components/SingleImageDisplay";
import SingleImageUpload from "./Components/SingleImageUpload";
import Display from "./Pages/Display_D";
import PropertySearch from "./Components/PropertySearch";
import Project from "./Components/ImageSwapper";
import ProjectPriceChart from "./Pages/ProjectPriceChart"; // ✅ Import ProjectPriceChart
import SinChartdisplay from "./Components/SinChart";
import PriceScatterChart from "./Components/PriceScatterChart";
import PriceBarChart from "./Components/PriceBarChart";
import ScatterChartComponent from "./Components/ScatterChartComponent";
import Organizations from "./Components/Organizations";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Display" element={<Display />} />
        <Route path="/DisplayImages" element={<DisplayImages />} />
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
      </Routes>
    </Router>
  );
};

export default App;
