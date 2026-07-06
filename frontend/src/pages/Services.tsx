import { useServices } from "../hooks/useServices";
import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
export default function Services() {
  const { services, loading } = useServices();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filteredServices = services.filter((service) =>
  service.name.toLowerCase().includes(search.toLowerCase()) ||
  service.namespace.toLowerCase().includes(search.toLowerCase()) ||
  service.type.toLowerCase().includes(search.toLowerCase()) ||
  (service.cluster_ip ?? "")
    .toLowerCase()
    .includes(search.toLowerCase())
);


if (loading) {
    return <Loading text="Loading Services..." />;
}
  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Kubernetes Services
      </h1>

{/* Search */}

<div className="relative mb-6">

  <Search
    className="absolute left-3 top-3 text-slate-400"
    size={18}
  />

  <input
    type="text"
    placeholder="Search Services..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>  

    <div className="bg-slate-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Namespace</th>

              <th className="text-left p-4">Type</th>

              <th className="text-left p-4">Cluster IP</th>

              <th className="text-left p-4">Ports</th>

            </tr>

          </thead>

          <tbody>

{filteredServices.length > 0 ? (

  filteredServices.map((service) => (
<tr
  key={`${service.namespace}-${service.name}`}
  onClick={() =>
    navigate(
      `/services/${service.namespace}/${service.name}`
    )
  }
  className="border-t border-slate-800 hover:bg-slate-800 cursor-pointer"
>

  <td className="p-4">
    {service.name}
  </td>

  <td className="p-4">
    {service.namespace}
  </td>

  <td className="p-4">
    {service.type}
  </td>

  <td className="p-4">
    {service.cluster_ip}
  </td>

  <td className="p-4">
    {service.ports
      .map((p: any) => p.port)
      .join(", ")}
  </td>

</tr>
))

) : (

<tr>

  <td
    colSpan={5}
    className="text-center py-8 text-slate-400"
  >
    No Services Found
  </td>

</tr>

)}

</tbody>
        </table>

      </div>

    </div>
  );
}
