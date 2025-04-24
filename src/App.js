import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DisplayImages from "./components/DisplayImages";
import MultipleImageUpload from "./Components/MultipleImageUpload";
import SingleImageDisplay from "./Components/SingleImageDisplay";
import SingleImageUpload from "./Components/SingleImageUpload";
import Display from "./Pages/Display";
import PropertySearch from "./Components/PropertySearch";
import Project from "./Components/ImageSwapper1";
import ProjectPriceChart from "./Pages/ProjectPriceChart"; // ✅ Import ProjectPriceChart
import SinChartdisplay from "./Components/SinChart";
import PriceScatterChart from "./Components/PriceScatterChart";
import PriceBarChart from "./Components/PriceBarChart";
import ScatterChartComponent from "./Components/ScatterChartComponent";
import Organizations from "./Components/Organizations";
//import ShowOrganization from "./Components/MultiStageForm";
import Displayprop from "./Pages/Display";
import ShowNeedle from "./Components/showneedle";
import PropertySearch1 from "./Pages/PropertySearch";
import VersionDisplay from "./Pages/Version2_Display";
import WingDetails from "./Components/wing_details";
// import ShowNeedle from "./Components/showneedle"
import FormDataInput from "./Pages/FormData";
import RealestateHome from "./Pages/Realestate-Home";
import PostFormData from "./Components/PostwithForm";
import AllStageData from "./Components/AllStageData"
import './App.css';

//import MultiStageForm from "./Components/MultiStageForm";
import ProjectList from "./Pages/PropertyAllData";
import LatestEntity from "./Components/LatestEntity";
import DisplayProperty from "./Pages/DisplayProperty";

// import AllStageData from "./Components/AllStageData";
import SearchResult from "./Pages/SearchResult";
import PropertyDetails from "./Pages/PropertyDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminPanel from "./Pages/AdminPanel";
import AdminLogin from "./Pages/AdminLogin";
import AdminAllStageData from "./Pages/AdminAllStageData";
import HomeAffordabilityCalculator from "./Components/HomeAffordibility";
import CostOfOwnership from "./Pages/Truecoo";
import AdminConsultationList from "./Pages/AdminConsultationList";
import UpdateConsultation from "./Pages/AdminUpdateConsultation";
import ViewallProperties from "./Pages/Allproperties";
import ComparePage from "./Pages/ComparePage";
const App = () => {
  return (
   // <Router>
    <Router>
      <Routes>
        {/*Public Routes*/}
        <Route path="/" element={<RealestateHome />} />
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
        {/* <Route path="/show-organization" element={<ShowOrganization />}></Route> */}
        <Route path="/display-d" element={<Displayprop />}></Route>
        <Route path="/realestate-home" element={<RealestateHome />}></Route>
        <Route path="/show-needle" element={<ShowNeedle />}></Route>
        <Route path="/post-formdata" element={<PostFormData />}></Route>
        <Route path="/multiple-upload" element={<MultipleImageUpload />}></Route>
        {/* <Route path="/all-stagedata" element={<AllStageData />}></Route> */}
        
        <Route path="/version-display" element={<VersionDisplay />}></Route>
        <Route path="/show-needle" element={<ShowNeedle />}></Route>
        <Route path="/property-search" element={<PropertySearch1 />}></Route>
       <Route path="/wing-details" element={<WingDetails />}></Route>
       <Route path="/show-formdata" element={<FormDataInput />}></Route>
       {/* <Route path="/multi-stage-form" element={<MultiStageForm1 />}></Route> */}
      {/* <Route path="/ShowForm" element={<MultiStageForm />}></Route> */}
      <Route path="/project-list" element={<ProjectList />}></Route>
      <Route path="/latest-entity" element={<LatestEntity />}></Route>
      <Route path="/display-property" element={<DisplayProperty />}></Route>
      {/* <Route path="/post-with-form" element={<PostwithForm/>}></Route> */}
      {/* <Route path="/all-stage-data" element={<AllStageData />}></Route> */}
      <Route path="/search-result" element={<SearchResult />}></Route>
      <Route path="/property-details/:projectId" element={<PropertyDetails />}></Route>
      <Route path="/home-affordability-calculator" element={<HomeAffordabilityCalculator />} />
      <Route path="/cost-of-ownership" element={<CostOfOwnership />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/view-allproperties" element={<ViewallProperties />} />
      <Route path="/compare" element={<ComparePage />} />


{/* Protected Route for Admin */}

<Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
  <Route path="/admin-panel" element={<AdminPanel />} />
  <Route path="/all-stagedata" element ={<AllStageData />}></Route>
  <Route path="/all-update" element={<AdminAllStageData />} />
  <Route path="/all-update/:projectId" element={<AdminAllStageData />} />
  <Route path="/admin-consultation-list" element={<AdminConsultationList />} />
  <Route path="/update-appointment/:id" element={<UpdateConsultation />} />
</Route>
      </Routes>
    </Router>
   
  );
};

export default App;
