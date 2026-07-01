from kubernetes import client, config, async_client
import os

config.load_kube_config(
    config_file=os.path.expanduser("~/.kube/config")
)

core_v1 = client.CoreV1Api()
apps_v1 = client.AppsV1Api()

async_core_v1 = async_client.CoreV1Api()
async_apps_v1 = async_client.AppsV1Api()
