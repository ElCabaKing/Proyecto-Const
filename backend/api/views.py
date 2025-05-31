from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import  AllowAny
from .serializers import PizarraSerializer, RoomChatSerializer, ChatMessagesSerializer
from datetime import date
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.response import Response
from rest_framework.views import APIView

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Adjust permissions as needed



class PizarraListCreateView(generics.ListCreateAPIView):

    
    queryset = Pizarra.objects.all()
    serializer_class = PizarraSerializer
    permission_classes = [AllowAny]  # Adjust permissions as needed

    def perform_create(self, serializer):
        # Automatically set the user to the currently authenticated user
        serializer.save(usuario=self.request.user)
        
        
class PizarraListView(generics.ListAPIView):
    
    queryset = Pizarra.objects.all()
    serializer_class = PizarraSerializer
    permission_classes = [AllowAny]  # O ajusta según tu necesidad

    def get_queryset(self):
        today = date.today()
        return self.queryset.filter(fecha_ingreso__date=today)
    

class RoomChatListCreateView(generics.ListCreateAPIView):
    queryset = RoomChat.objects.all()
    serializer_class = RoomChatSerializer
    permission_classes = [AllowAny]  # Adjust permissions as needed
    
    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(Q(usuario_sender=user) | Q(usuario_receiver=user))

    def perform_create(self, serializer):
        serializer.save(usuario_sender=self.request.user)
        
class ChatMessagesListCreateView(generics.ListCreateAPIView):
    queryset = ChatMessanges.objects.all()
    serializer_class = ChatMessagesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Filtra los mensajes para que solo muestre los del usuario autenticado
        user = self.request.user
        return self.queryset.filter(usuario=user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
        
        
class UserView(APIView):
    permission_classes = [AllowAny]  # O usa IsAuthenticated si quieres restringirlo

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({'id': user.id, 'username': user.username})
        else:
            return Response({'detail': 'No autenticado'}, status=401)
