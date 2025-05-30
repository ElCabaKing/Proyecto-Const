from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import  AllowAny
from .serializers import PizarraSerializer
from datetime import date
from rest_framework.permissions import IsAuthenticated

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Adjust permissions as needed



class PizarraListCreateView(generics.ListCreateAPIView):

    from .models import Pizarra
    queryset = Pizarra.objects.all()
    serializer_class = PizarraSerializer
    permission_classes = [AllowAny]  # Adjust permissions as needed

    def perform_create(self, serializer):
        # Automatically set the user to the currently authenticated user
        serializer.save(usuario=self.request.user)
        
        
class PizarraListView(generics.ListAPIView):
    from .models import Pizarra
    queryset = Pizarra.objects.all()
    serializer_class = PizarraSerializer
    permission_classes = [AllowAny]  # O ajusta según tu necesidad

    def get_queryset(self):
        today = date.today()
        return self.queryset.filter(fecha_ingreso__date=today)