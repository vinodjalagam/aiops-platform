from kubernetes import client, config
import os

config.load_kube_config(
    config_file=os.path.expanduser("~/.kube/config")
)


def get_core_v1():
    return client.CoreV1Api()


def get_apps_v1():
    return client.AppsV1Api()


def get_version_api():
    return client.VersionApi()


def get_custom_objects_api():
    return client.CustomObjectsApi()
