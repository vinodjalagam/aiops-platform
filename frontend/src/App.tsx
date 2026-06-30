import { BrowserRouter, Routes, Route } from "react-router-dom";
import NamespaceDetails from "./pages/NamespaceDetails";
import Layout from "./components/layout/Layout";
import Namespaces from "./pages/Namespaces";
import Dashboard from "./pages/Dashboard";
import Nodes from "./pages/Nodes";
import Pods from "./pages/Pods";
import Deployments from "./pages/Deployments";
import DeploymentDetails from "./pages/DeploymentDetails";
import Services from "./pages/Services";
import PodDetails from "./pages/PodDetails";
import NodeDetails from "./pages/NodeDetails";
import ServiceDetails from "./pages/ServiceDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="namespaces"element={<Namespaces />} />
          <Route path="nodes" element={<Nodes />} />
          <Route path="nodes/:name" element={<NodeDetails />} />
	  <Route path="namespaces/:name" element={<NamespaceDetails />} />

          <Route path="pods" element={<Pods />} />
	  <Route path="pods/:namespace/:name" element={<PodDetails />} />

          <Route path="deployments" element={<Deployments />} />

          <Route
            path="deployments/:namespace/:name"
            element={<DeploymentDetails />}
          />

          <Route path="services" element={<Services />} />

	<Route
  path="services/:namespace/:name"
  element={<ServiceDetails />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
