import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Nodes from "./pages/Nodes";
import Pods from "./pages/Pods";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
	  <Route path="pods" element={<Pods />} />
          
	  <Route path="nodes" element={<Nodes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
