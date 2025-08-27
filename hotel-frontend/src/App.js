import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HotelList from "./components/HotelList";
import RoomList from "./components/RoomList";
import BookingForm from "./components/BookingForm";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Bookings from "./components/Bookings";



function App() {
  return (
    <Router>
      
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />

      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        
        <Navbar />

        
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/bookings" element={<Bookings />} />

            <Route path="/hotel/:id" element={<RoomList />} />
            <Route path="/book/:roomId" element={<BookingForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;
