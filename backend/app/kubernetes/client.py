from kubernetes import client, config
import os

config.load_kube_config(
    config_file=os.path.expanduser("~/.kube/config")
)

core_v1 = client.CoreV1Api()
