from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Pizarra, RoomChat,ChatMessanges

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


class RoomChatSerializer(serializers.ModelSerializer):
    usuario_sender = serializers.CharField(source="usuario_sender.username", read_only=True)
    usuario_receiver = serializers.CharField(source="usuario_receiver.username", read_only=True)
    usuario_creator = serializers.CharField(source="usuario_sender.username", read_only=True)

    class Meta:
        model = RoomChat
        fields = ['id', 'usuario_sender', 'usuario_receiver', 'usuario_creator']
        
class ChatMessagesSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source="usuario.username", read_only=True)
    
    class Meta:
        model = ChatMessanges
        fields = ['id', 'usuario', 'mensaje', 'fecha_envio']