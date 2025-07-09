from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import  AllowAny
from .serializers import PizarraSerializer
from datetime import date
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

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
    

        
class UserView(APIView):
    permission_classes = [AllowAny]  # O usa IsAuthenticated si quieres restringirlo

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({'id': user.id, 'username': user.username})
        else:
            return Response({'detail': 'No autenticado'}, status=401)

@api_view(['GET'])
def user_info(request):
    username = request.GET.get('username')
    if not username:
        return Response({'detail': 'Username requerido'}, status=400)
    try:
        user = User.objects.get(username=username)
        return Response({
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'is_staff': user.is_staff,
        })
    except User.DoesNotExist:
        return Response({'detail': 'Usuario no encontrado'}, status=404)
