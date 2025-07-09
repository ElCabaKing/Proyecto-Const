from django.db import models
from django.contrib.auth.models import User

class Pizarra(models.Model):
    contenido = models.TextField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blogs")
    fecha_ingreso = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Blog de {self.usuario.username} - {self.fecha_ingreso}"


