from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import Logueado
# Create your models here.
def upload_to(instance,filename):
    return 'posts/{filename}'.format(filename=filename)
class Plataformas(models.Model):
    nombre=models.CharField(max_length=100)
    class Meta:
        verbose_name='Plataforma'
        verbose_name_plural ='Plataformas'
    def __str__(self):
        return self.nombre
    
class Genero(models.Model):
    nombre=models.CharField(max_length=100)
    class Meta:
        verbose_name='Genero'
        verbose_name_plural ='Generos'
    def __str__(self):
        return self.nombre
    
class Desarrollador(models.Model):
    nombre=models.CharField(max_length=100)
    class Meta:
        verbose_name='Desarrollador'
        verbose_name_plural ='Desarrolladores'
    def __str__(self):
        return self.nombre
class Idiomas(models.Model):
    nombre=models.CharField(max_length=100)
    class Meta:
        verbose_name='Idioma'
        verbose_name_plural ='Idiomas'
    def __str__(self):
        return self.nombre
    
# Juegos que seran para que los vendedores vean sus publicaciones
class Juegos(models.Model):
    vendedor=models.ForeignKey(Logueado,on_delete=models.CASCADE)
    url_portada=models.ImageField(null=True ,upload_to='media/' ,default='subi.png')
    nombre=models.CharField(max_length=500,null=True)
    descripcion=models.TextField(null=True)
    plataformas=models.ManyToManyField(Plataformas,)
    genero=models.ManyToManyField(Genero)
    idiomas=models.ManyToManyField(Idiomas,)
    publicacion=models.DateField(null=True,verbose_name="Fecha lanzamiento")
    num_llaves=models.IntegerField(null=True)
    publicado=models.DateField(null=True ,verbose_name="Publicacion de la venta")
    precio_venta_final=models.DecimalField(max_digits=8, decimal_places=2,null=True,verbose_name='precio final')
    precio = models.DecimalField(max_digits=8, decimal_places=2,null=True)
    class Meta:
        verbose_name='Juego'
        verbose_name_plural ='Juegos'
    def __str__(self):
        return self.nombre
class Prueba(models.Model):
    imagen=models.ImageField(_("Image"),upload_to=upload_to,default='posts/default.png')
    def __str__(self):
        return self.nombre

class Ventas(models.Model):
    id_comprador=models.ForeignKey(Logueado,on_delete=models.CASCADE,related_name='ventas_comprador')
    id_vendedor=models.ForeignKey(Logueado,on_delete=models.CASCADE,related_name='ventas_vendedor')
    # id_juego=models.ForeignKey(Juegos,on_delete=models.CASCADE)
    num_llaves_compradas=models.IntegerField()


class PriceHistory(models.Model):
    # id_juego=models.ForeignKey(Juegos,on_delete=models.CASCADE)
    precio=models.DecimalField(max_digits=8, decimal_places=2)
    Fecha=models.DateField()

# class Keys(models.Model):
#     id_juego