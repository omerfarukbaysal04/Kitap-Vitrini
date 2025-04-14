import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import BookCategoryPage from "./pages/bookcategorypage";
import BookList from "./pages/booklist";
import Login from "./pages/login";
import Register from "./pages/register";
import { AuthProvider } from "./context/AuthContext";
import Viewbook from "./pages/viewbook";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookcategory" element={<BookCategoryPage />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/booklist/:bookId" element={<Viewbook />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
