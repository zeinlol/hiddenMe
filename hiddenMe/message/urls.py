from django.urls import path

from hiddenMe.message import views

app_name = "messages"
urlpatterns = [
    path("<uuid:chat_uid>/", views.GetMessageInstanceView.as_view(), ),
]
