from threading import Thread

from app.watchers.pod_watcher import PodWatcher
from app.incidents.detector import IncidentDetector


class WatchManager:

    @staticmethod
    def start():

        Thread(
            target=PodWatcher.watch,
            daemon=True,
        ).start()

        Thread(
            target=IncidentDetector.process,
            daemon=True,
        ).start()

        print("Watch Manager Started")
