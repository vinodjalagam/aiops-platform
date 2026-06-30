from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.kubernetes.client import core_v1

import asyncio

router = APIRouter()


@router.websocket("/ws/logs/{namespace}/{pod}")
async def stream_logs(
    websocket: WebSocket,
    namespace: str,
    pod: str,
):

    await websocket.accept()

    try:

        stream = core_v1.read_namespaced_pod_log(
            name=pod,
            namespace=namespace,
            follow=True,
            timestamps=True,
            tail_lines=100,
            _preload_content=False,
        )

        while True:

            line = stream.readline()

            if not line:

                await asyncio.sleep(0.1)
                continue

            await websocket.send_text(
                line.decode("utf-8")
            )

    except WebSocketDisconnect:

        print("Client disconnected")

    except Exception as e:

        print(e)

    finally:

        try:
            stream.close()
        except:
            pass
