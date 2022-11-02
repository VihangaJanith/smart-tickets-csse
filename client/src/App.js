import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Tempory from "./components/TemporyCard/Tempory";
import AddJourney from "./components/Journeys/AddJourney";
import ViewJourney from "./components/Journeys/ViewJourneys";
import PayforCard from "./components/Payements/PayforCard";
import RechargePay from "./components/Payements/RechargePay";
import PreviousPayments from "./components/Payements/PreviousPayments";
import CardDelivery from "./components/Delivery/CardDelivery";
import AdminDash from "./components/Admin/AdminDash";
import AllJourneys from "./components/Admin/AllJourneys";
import AllCardRequests from "./components/Admin/AllCardRequests";
import AllUsers from "./components/Admin/AllUsers";
import AdminLogin from "./components/Admin/AdminLogin";
import Qrscan from "./components/TemporyCard/Qrscan";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="">
      <Navbar />
      <Router>
        <Routes>  
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/tempory" element={<Tempory />} />
          <Route path="/addjourney" element={<AddJourney />} />
          <Route path="/viewjourney" element={<ViewJourney />} />
          <Route path="/payforcard" element={<PayforCard />} />
          <Route path="/rechargepay" element={<RechargePay />} />
          <Route path="/previouspayments" element={<PreviousPayments />} />
          <Route path="/carddelivery" element={<CardDelivery />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/alljourneys" element={<AllJourneys />} />
          <Route path="/allcardrequests" element={<AllCardRequests />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/qr" element={<Qrscan />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
