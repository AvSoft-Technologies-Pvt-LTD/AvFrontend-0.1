// import React, { useState } from "react";
// import {BrowserRouter as Router,Routes,Route,Navigate,Outlet,} from "react-router-dom";
// // Public Pages
// import Login from "./form/Login";
// import RegisterSelect from "./form/RegisterSelect";
// import Registration from "./form/Registration";
// import Verification from "./form/Verification";
// import Healthcard from "./components/Healthcard";
// import BookApp from "./components/BookApp";
// import Home from "./pages/Home";
// import DashboardLayout from "./pages/layouts/DashboardLayout";
// import Overview from "./pages/layouts/menu/DoctorDashboard/Overview";
// import LabRoutes from "./pages/layouts/menu/LabDashboard/Ldroutes";
// import Dashboard from "./pages/layouts/menu/LabDashboard/LabDashboard";
// import HospitalRoutes from "./pages/layouts/menu/HospitalDashboard/Hdroutes";
// import AdminRoutes from "./pages/layouts/menu/SuperAdminDashboard/AdminRoute";
// import AdminDashboard from "./pages/layouts/menu/SuperAdminDashboard/Dashboard";
// import HospitalDashboard from "./pages/layouts/menu/HospitalDashboard/Dashboard";
// import DrRoutes from "./pages/layouts/menu/DoctorDashboard/DrRoutes";
//  import StaffManagement from "./components/AdminModule";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PharmacyManagement from "./components/PharmacyModule";
// import LabManagement from "./components/LabModule";
// import TokenDisplay from "./components/Token-Display";
// import QueueToken from "./components/Queue-Token";
// import QueueManagement from "./components/FrontendDesk";
// const getUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };
// const PrivateRoute = ({ allowedType }) => {
//   const user = getUser();
//   if (!user) return <Navigate to="/login" />;
//   if (allowedType && user.userType !== allowedType) {
//     return <Navigate to="/redirect" />;
//   }
//   return <Outlet />;
// };
// const RoleRedirect = () => {
//   const user = getUser();
//   if (!user) return <Navigate to="/login" />;
//   switch (user.userType) {
//     case "doctor":
//       return <Navigate to="/doctordashboard" />;
//     case "lab":
//       return <Navigate to="/labdashboard" />;
//     case "hospital":
//       return <Navigate to="/hospitaldashboard" />;
//     case "freelancer":
//       return <Navigate to="/freelancerdashboard" />;
//     case "superadmin":
//       return <Navigate to="/superadmindashboard" />;
//     default:
//       return <Navigate to="/" />;
//   }
// };
// const App = () => {
//     const [tokens, setTokens] = useState([]);

//   const handleTokenGenerated = (newToken) => {
//     setTokens((prev) => [...prev, newToken]);
//   };

//   const handleTokenUpdate = (updatedTokens) => {
//     setTokens(updatedTokens);
//   };

//   const getNextTokenNumber = () => {
//     return tokens.length + 1;
//   };
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<RegisterSelect />} />
//         <Route path="/registration" element={<Registration />} />
//         <Route path="/verification" element={<Verification />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/healthcard" element={<Healthcard />} />
//         <Route path="/bookconsultation" element={<BookApp />} />
//         {/* Role Redirect */}
//         <Route path="/redirect" element={<RoleRedirect />} />
//         {/* Doctor Dashboard */}
//         <Route element={<PrivateRoute allowedType="doctor" />}>
//           <Route path="/doctordashboard" element={<DashboardLayout />}>
//             <Route index element={<Overview />} /> {/* /doctordashboard */}
//              <Route path="dr-admin" element={<StaffManagement />} />
//                 <Route path="pharmacymodule" element={<PharmacyManagement />} />
//                 <Route path="labmodule" element={<LabManagement />} />
//                  <Route path="frontdesk" element={
//               <QueueManagement
//                 tokens={tokens}
//                 onTokensUpdate={handleTokenUpdate}
//               />
//             } />
//             <Route path="queuetoken" element={
//               <QueueToken
//                 onTokenGenerated={handleTokenGenerated}
//                 currentTokenNumber={getNextTokenNumber()}
//               />
//             } />
//             <Route path="tokendisplay" element={
//               <TokenDisplay tokens={tokens} />
//             } />
//             <Route path="*" element={<DrRoutes />} />
//           </Route>
//         </Route>
//         {/* Lab Dashboard */}
//         <Route element={<PrivateRoute allowedType="lab" />}>
//           <Route path="/labdashboard" element={<DashboardLayout />}>
//             <Route index element={<Dashboard />} />
//             <Route path="*" element={<LabRoutes />} />
//           </Route>
//         </Route>
//         {/* Hospital Dashboard */}
//         <Route element={<PrivateRoute allowedType="hospital" />}>
//           <Route path="/hospitaldashboard" element={<DashboardLayout />}>
//             <Route index element={<HospitalDashboard />} />
//              <Route path="dr-admin" element={<StaffManagement />} />
//               <Route path="pharmacymodule" element={<PharmacyManagement />} />
//             <Route path="frontdesk" element={
//               <QueueManagement
//                 tokens={tokens}
//                 onTokensUpdate={handleTokenUpdate}
//               />
//             } />
//             <Route path="queuetoken" element={
//               <QueueToken
//                 onTokenGenerated={handleTokenGenerated}
//                 currentTokenNumber={getNextTokenNumber()}
//               />
//             } />
//             <Route path="tokendisplay" element={
//               <TokenDisplay tokens={tokens} />
//             } />
//               <Route path="labmodule" element={<LabManagement />} />
//             <Route path="*" element={<HospitalRoutes />} />
//           </Route>
//         </Route>
//         <Route element={<PrivateRoute allowedType="superadmin" />}>
//           <Route path="/superadmindashboard" element={<DashboardLayout />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="*" element={<AdminRoutes />} />
//           </Route>
//         </Route>
//         {/* Catch All */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </Router>
//   );
// };
// export default App;



import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Public Pages
import Login from "./form/Login";
import RegisterSelect from "./form/RegisterSelect";
import Registration from "./form/Registration";
import Verification from "./form/Verification";
import Healthcard from "./components/Healthcard";
import BookApp from "./components/BookApp";
import Home from "./pages/Home";

// Layouts
import DashboardLayout from "./pages/layouts/DashboardLayout";

// Super Admin
import AdminRoutes from "./pages/layouts/menu/SuperAdminDashboard/AdminRoute";
import AdminDashboard from "./pages/layouts/menu/SuperAdminDashboard/Dashboard";

// Doctor
import DrRoutes from "./pages/layouts/menu/DoctorDashboard/DrRoutes";
import Overview from "./pages/layouts/menu/DoctorDashboard/Overview";

// Lab
import LabRoutes from "./pages/layouts/menu/LabDashboard/Ldroutes";
import LabDashboard from "./pages/layouts/menu/LabDashboard/LabDashboard";

// Hospital
import HospitalRoutes from "./pages/layouts/menu/HospitalDashboard/Hdroutes";
import HospitalDashboard from "./pages/layouts/menu/HospitalDashboard/Dashboard";

// Shared Components
import StaffManagement from "./components/AdminModule";
import PharmacyManagement from "./components/PharmacyModule";
import LabManagement from "./components/LabModule";
import QueueManagement from "./components/QueueManagaement";
import QueueToken from "./components/Queue-Token";
import Frontdesk from "./components/FrontendDesk";
import TokenDisplay from "./components/Token-Display";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ---------------------- Helpers ----------------------

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const PrivateRoute = ({ allowedType }) => {
  const user = getUser();
  if (!user) return <Navigate to="/login" />;
  if (allowedType && user.userType !== allowedType) return <Navigate to="/redirect" />;
  return <Outlet />;
};

const RoleRedirect = () => {
  const user = getUser();
  if (!user) return <Navigate to="/login" />;
  switch (user.userType) {
    case "doctor": return <Navigate to="/doctordashboard" />;
    case "lab": return <Navigate to="/labdashboard" />;
    case "hospital": return <Navigate to="/hospitaldashboard" />;
    case "freelancer": return <Navigate to="/freelancerdashboard" />;
    case "superadmin": return <Navigate to="/superadmindashboard" />;
    default: return <Navigate to="/" />;
  }
};

// ---------------------- App Component ----------------------

const App = () => {
  const [tokens, setTokens] = useState([]);

  const handleTokenGenerated = (newToken) => setTokens((prev) => [...prev, newToken]);
  const handleTokenUpdate = (updatedTokens) => setTokens(updatedTokens);
  const getNextTokenNumber = () => tokens.length + 1;

  // Shared Module Routes
  const sharedRoutes = (
    <>
      <Route path="dr-admin" element={<StaffManagement />} />
      <Route path="pharmacymodule" element={<PharmacyManagement />} />
      <Route path="labmodule" element={<LabManagement />} />
      <Route path="frontdesk" element={<Frontdesk />} />
      <Route
        path="queuemanagement"
        element={<QueueManagement tokens={tokens} onTokensUpdate={handleTokenUpdate} />}
      />
      <Route
        path="queuetoken"
        element={<QueueToken onTokenGenerated={handleTokenGenerated} currentTokenNumber={getNextTokenNumber()} />}
      />
      <Route path="tokendisplay" element={<TokenDisplay tokens={tokens} />} />
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterSelect />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/healthcard" element={<Healthcard />} />
        <Route path="/bookconsultation" element={<BookApp />} />

        {/* Redirect Based on Role */}
        <Route path="/redirect" element={<RoleRedirect />} />

        {/* Doctor Dashboard */}
        <Route element={<PrivateRoute allowedType="doctor" />}>
          <Route path="/doctordashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            {sharedRoutes}
            <Route path="*" element={<DrRoutes />} />
          </Route>
        </Route>

        {/* Hospital Dashboard */}
        <Route element={<PrivateRoute allowedType="hospital" />}>
          <Route path="/hospitaldashboard" element={<DashboardLayout />}>
            <Route index element={<HospitalDashboard />} />
            {sharedRoutes}
            <Route path="*" element={<HospitalRoutes />} />
          </Route>
        </Route>

        {/* Lab Dashboard */}
        <Route element={<PrivateRoute allowedType="lab" />}>
          <Route path="/labdashboard" element={<DashboardLayout />}>
            <Route index element={<LabDashboard />} />
            <Route path="*" element={<LabRoutes />} />
          </Route>
        </Route>

        {/* Super Admin Dashboard */}
        <Route element={<PrivateRoute allowedType="superadmin" />}>
          <Route path="/superadmindashboard" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="*" element={<AdminRoutes />} />
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
