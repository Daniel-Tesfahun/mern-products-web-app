import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";

function App() {
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Hide the Navbar on any non-matching route
    const allowedPaths = ["/", "/create"];
    if (allowedPaths.includes(location.pathname)) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [location]);

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Box>
  );
}

export default App;
