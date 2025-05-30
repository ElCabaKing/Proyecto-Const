from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Pizarra

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password","email","first_name","last_name","is_staff"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class PizarraSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source="usuario.username", read_only=True)

    class Meta:
        model = Pizarra
        fields = ['id', 'contenido', 'usuario', 'fecha_ingreso']
