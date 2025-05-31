from django.db import models
from django.contrib.auth.models import User

class Pizarra(models.Model):
    contenido = models.TextField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blogs")
    fecha_ingreso = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Blog de {self.usuario.username} - {self.fecha_ingreso}"


class RoomChat(models.Model):
    usuario_sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chats")
    usuario_receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chats_recibidos")
    usuario_creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creador_del_roomchat")
    def __str__(self):
        return f"Chat de {self.usuario_receiver} - {self.usuario_sender} "

class ChatMessanges(models.Model):
    code_chat = models.ForeignKey(RoomChat, on_delete=models.CASCADE, related_name="mensajes")
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="usuario_principal")
    mensaje = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)