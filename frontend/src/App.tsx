import { BrowserRouter, Routes, Route } from "react-router-dom";
import NamespaceDetails from "./pages/NamespaceDetails";
import Layout from "./components/layout/Layout";
import Namespaces from "./pages/Namespaces";
import Dashboard from "./pages/Dashboard";
import Nodes from "./pages/Nodes";
import Pods from "./pages/Pods";
import Cluster from "./pages/Cluster";
import Deployments from "./pages/Deployments";
import DeploymentDetails from "./pages/DeploymentDetails";
import Services from "./pages/Services";
import PodDetails from "./pages/PodDetails";
import NodeDetails from "./pages/NodeDetails";
import ServiceDetails from "./pages/ServiceDetails";
import Metrics from "./pages/Metrics";
import PodLogs from "./pages/PodLogs";
import Incidents from "./pages/Incidents";
import Alerts from "./pages/Alerts";
import Assistant from "./pages/Assistant";
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
<Route
  path="/cluster"
  element={<Cluster />}
/>
<Route
  path="pods/:namespace/:name/logs"
  element={<PodLogs />}
/>
<Route path="metrics" element={<Metrics />} />
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
<Route
  path="incidents"
  element={<Incidents />}
/>
<Route
  path="alerts"
  element={<Alerts />}

/>
<Route
  path="assistant"
  element={<Assistant />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
