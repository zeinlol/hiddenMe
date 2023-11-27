from django.urls import path, include

from hiddenMe.account import views

app_name = "account"
urlpatterns = [
    path("user/", views.UserView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("login/", views.LoginView.as_view()),
    path("logout/", views.LogoutView.as_view()),
    path("logout-all/", views.LogoutAllView.as_view()),
    path("dashboard/", views.UserDashboardView.as_view()),
    path(
        "<str:uid>/",
        include(
            [
                path("", views.UserGeneralInfoView.as_view()),
                path(
                    "password/",
                    include(
                        [
                            path("update/", views.UserGeneralInfoView.as_view()),
                            path("reset/", views.UserGeneralInfoView.as_view()),
                            path("confirm/", views.UserGeneralInfoView.as_view()),
                        ]
                    )
                ),
                path(
                    "qr/",
                    include(
                        [
                            path("info/", views.UserGeneralInfoView.as_view()),
                        ]
                    )
                ),
            ]
        ),
    ),
]
