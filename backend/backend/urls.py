from django.contrib import admin
from django.urls import path, include
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
    path("api/pizarra/", PizarraListCreateView.as_view(), name="pizarra-list-create"),
    path("api/pizarras", PizarraListView.as_view(), name="pizarra-lis-view"),
    path('api/getUser/',UserView.as_view(), name='get_user'),
]

 