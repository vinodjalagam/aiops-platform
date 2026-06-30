from app.kubernetes.client import core_v1


class ServiceService:

    @staticmethod
    def get_services():

        services = core_v1.list_service_for_all_namespaces().items

        result = []

        for service in services:

            ports = []

            for port in service.spec.ports:

                ports.append(
                    {
                        "port": port.port,
                        "target_port": str(port.target_port),
                        "node_port": port.node_port,
                        "protocol": port.protocol,
                    }
                )

            result.append(
                {
                    "name": service.metadata.name,
                    "namespace": service.metadata.namespace,
                    "type": service.spec.type,
                    "cluster_ip": service.spec.cluster_ip,
                    "ports": ports,
                }
            )

        return result

    @staticmethod
    def get_service(
        namespace: str,
        name: str,
    ):

        service = core_v1.read_namespaced_service(
            name=name,
            namespace=namespace,
        )

        ports = []

        for port in service.spec.ports:

            ports.append(
                {
                    "name": port.name,
                    "port": port.port,
                    "target_port": str(port.target_port),
                    "node_port": port.node_port,
                    "protocol": port.protocol,
                }
            )

        endpoints = []

        try:

            endpoint = core_v1.read_namespaced_endpoints(
                name=name,
                namespace=namespace,
            )

            if endpoint.subsets:

                for subset in endpoint.subsets:

                    for address in (subset.addresses or []):

                        for port in (subset.ports or []):

                            endpoints.append(
                                {
                                    "ip": address.ip,
                                    "port": port.port,
                                }
                            )

        except Exception:

            pass

        external_ips = getattr(
            service.spec,
            "external_i_ps",
            [],
        )

        return {
            "name": service.metadata.name,
            "namespace": service.metadata.namespace,
            "type": service.spec.type,
            "cluster_ip": service.spec.cluster_ip,
            "external_ip": external_ips,
            "session_affinity": service.spec.session_affinity,
            "selector": service.spec.selector or {},
            "labels": service.metadata.labels or {},
            "ports": ports,
            "endpoints": endpoints,
        }
