from django.urls import path
from .views import PizarraListCreateView, PizarraListView, user_info

urlpatterns = [
    path("pizarra/", PizarraListCreateView.as_view(), name="pizarra-list-create"),
    path('pizarras/', PizarraListView.as_view(), name='pizarra-list'),
    path('user-info/', user_info, name='user-info'),
]