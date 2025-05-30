from django.urls import path
from .views import PizarraListCreateView, PizarraListView

urlpatterns = [
    path("pizarra/", PizarraListCreateView.as_view(), name="pizarra-list-create"),
    path('pizarras/', PizarraListView.as_view(), name='pizarra-list'),
]