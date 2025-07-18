// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "./Dashboard";
// import MedicalRecord from "./MedicalRecord";
// import PatientAppointments from "./Settings";
// import Settings from "./Settings";
// import AppointmentList from "./AppointmentList";

// const PdashboardRoutes = () => {
//   return (
//     <Routes>
//       <Route index element={<Dashboard />} />
//       <Route path="medical-record" element={<MedicalRecord />} />
//       <Route path="calendar" element={<PatientAppointments />} />
//       <Route path="settings" element={<Settings />} />
//       <Route path="app" element={<AppointmentList/>} />

//       {/* Catch-all 404 Page */}
//       <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//     </Routes>
//   );
// };

// export default PdashboardRoutes;



// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Pages inside the patient dashboard
// import Dashboard from "./Dashboard";
// import MedicalRecord from "./MedicalRecord";

// import Settings from "./Settings";
// import AppointmentList from "./AppointmentList";
// import MultiStepForm from "./MultiStepForm";

// const PdashboardRoutes = () => {
//   return (
//     <Routes>
//       <Route index element={<Dashboard />} />
//       <Route path="medical-record" element={<MedicalRecord />} />

//       <Route path="settings" element={<Settings />} />
//       <Route path="app" element={<AppointmentList />} />
//       <Route path="book-appointment" element={<MultiStepForm/>} />
//       {/* Optional extra routes */}
//       <Route path="insurance" element={<h1>Insurance Page</h1>} />
//       <Route path="shopping" element={<h1>Online Shopping</h1>} />
//       <Route path="emergency" element={<h1>Emergency Info</h1>} />
//       <Route path="lab-tests" element={<h1>Lab Tests Booking</h1>} />
//       <Route path="ambulance" element={<h1>Ambulance Booking</h1>} />
//       <Route path="pharmacy" element={<h1>Nearby Pharmacy</h1>} />

//       {/* Fallback */}
//       <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//     </Routes>
//   );
// };

// export default PdashboardRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages inside the patient dashboard
import Dashboard from "./Dashboard";
import MedicalRecord from "./MedicalRecord";
import Settings from "./Settings";
import AppointmentList from "./AppointmentList";
import MultiStepForm from "./MultiStepForm";
import Insurance from "./Insurance";
import Billing from "./Billing";
import NearbyPharmacies from "./NearbyPharmacy"
import PatientNotifications from './Notifications';
import PaymentForm from './PaymentForm';
import LabHome from './LabHome';
import TestDetail from './TestDetail';
import CartPage from './CartPage';
import AvailableLabs from "./AvailableLab";
import LabBooking from "./LabBooking";
import BookApp from "./BookApp";
import PaymentLab from "./PaymentLab";
import TrackAppointment from "./TrackApp";
import Emergency from "./Emergency";
import Tabs from './Tabs'
const PdashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="medical-record" element={<Tabs/>} />
      <Route path="settings" element={<Settings />} />
      <Route path="app" element={<AppointmentList />} />
      <Route path="book-appointment" element={<MultiStepForm />} />

      {/* Optional extra routes */}
      <Route path="insurance" element={<Insurance/>} />
      <Route path="billing" element={<Billing/>} />
      <Route path="notifications" element={<PatientNotifications/>} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="shopping" element={<h1>Online Shopping</h1>} />
      <Route path="emergency" element={<h1>Emergency Info</h1>} />
      <Route path="lab-tests" element={<LabHome />} />
      <Route path="lab-tests/test/:id" element={<TestDetail />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="available-labs/:id" element={<AvailableLabs />} />
      <Route path="lab-booking/:id" element={<LabBooking />} />
      <Route path="book-app/:id" element={<BookApp />} />
      <Route path="payment1" element={<PaymentLab />} />
      <Route path="track-appointment/:bookingId" element={<TrackAppointment />} />
      
      <Route path="ambulance" element={<Emergency/>} />
      <Route path="pharmacy" element={<NearbyPharmacies/>} />

      {/* Fallback route */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default PdashboardRoutes;
