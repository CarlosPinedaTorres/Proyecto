from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
class Vendedor(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    nombre_empresa=models.CharField(max_length=100)
    telefono=models.CharField(max_length=100 ,null=True)
    direccion=models.CharField(max_length=100, null=True)
    class Meta:
        verbose_name='Vendedor'
        verbose_name_plural = 'Vendedores'