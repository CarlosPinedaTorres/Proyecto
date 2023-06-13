from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import Logueado
from django.utils import timezone
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
    vendedor=models.ForeignKey(Logueado,on_delete=models.CASCADE ,blank=True, null=True)
    url_portada=models.ImageField(upload_to='media/' ,default='subi.png',blank=True, null=True)
    nombre=models.CharField(max_length=500,blank=True, null=True)
    descripcion=models.TextField(blank=True, null=True)
    plataformas=models.ManyToManyField(Plataformas,blank=True, null=True)
    genero=models.ManyToManyField(Genero,blank=True, null=True)
    idiomas=models.ManyToManyField(Idiomas,blank=True, null=True)
    publicacion = models.DateField(verbose_name="Fecha lanzamiento", default=timezone.now().date(), blank=True, null=True)
    num_llaves=models.IntegerField(blank=True, null=True)
    publicado=models.DateField(verbose_name="Publicacion de la venta",blank=True, null=True)
    precio_venta_final=models.DecimalField(max_digits=8, decimal_places=2,verbose_name='precio final',blank=True, null=True,default=0)
    precio = models.DecimalField(max_digits=8, decimal_places=2,blank=True, null=True)
    precio_mercado=models.DecimalField(max_digits=8,decimal_places=2,blank=True,null=True,default=0)
    activar=models.BooleanField(default=False)
    vendido=models.BooleanField(default=False)
    image=models.TextField(null=True,blank=True)
    contador=models.IntegerField(default=0)
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
    id_juego=models.ForeignKey(Juegos,on_delete=models.CASCADE,null=True)
    num_llaves_compradas=models.IntegerField()
    precio_venta_user=models.DecimalField(max_digits=8,decimal_places=2,blank=True,null=True)

class PriceHistory(models.Model):
    id_juego = models.ForeignKey(Juegos, on_delete=models.CASCADE, null=True)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    fecha = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        # Si no se ha especificado una fecha, utiliza la fecha y hora actual
        if not self.fecha:
            self.fecha = timezone.now()
        super().save(*args, **kwargs)
class userPagos(models.Model):
    id_user=models.ForeignKey(Logueado,on_delete=models.CASCADE,null=True)
    id_juego = models.ForeignKey(Juegos, on_delete=models.CASCADE, null=True,blank=True)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)
    tipo=models.CharField(max_length=500,blank=True, null=True)
    visto=models.BooleanField(default=False)

# class Keys(models.Model):
#     id_juego