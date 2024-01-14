from channels.routing import URLRouter, ProtocolTypeRouter

import hiddenMe.chat.routing
from hiddenMe.chat import consumers

application = ProtocolTypeRouter({
    "websocket": URLRouter(hiddenMe.chat.routing.websocket_urlpatterns)
})
