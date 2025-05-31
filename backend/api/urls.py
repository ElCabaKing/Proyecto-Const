from django.urls import path
from .views import PizarraListCreateView, PizarraListView,RoomChatListCreateView,ChatMessagesListCreateView

urlpatterns = [
    path("pizarra/", PizarraListCreateView.as_view(), name="pizarra-list-create"),
    path('pizarras/', PizarraListView.as_view(), name='pizarra-list'),
    path('roomChats/', RoomChatListCreateView.as_view(), name='roomChats-list-create'),
    path('messageChats/', ChatMessagesListCreateView.as_view(), name='messageChats-list-create'),
]