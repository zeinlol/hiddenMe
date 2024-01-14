import os
import sys

from channels.routing import URLRouter, ProtocolTypeRouter
from django.core.asgi import get_asgi_application

app_path = os.path.dirname(__file__).replace("/config", "")
sys.path.append(os.path.join(app_path, "hiddenMe"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.base")
asgi_application = get_asgi_application()

import hiddenMe.chat.routing

application = ProtocolTypeRouter({
    "http": asgi_application,
    "websocket": URLRouter(hiddenMe.chat.routing.websocket_urlpatterns)
})
