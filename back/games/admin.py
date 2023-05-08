from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Juegos)
class GamesAdmin(admin.ModelAdmin):
    list_display=('id','vendedor')
@admin.register(Desarrollador)
class DesarrolladorAdmin(admin.ModelAdmin):
    list_display=('id','nombre',)
@admin.register(Genero)
class GeneroAdmin(admin.ModelAdmin):
    list_display=('id','nombre',)
@admin.register(Plataformas)
class PlataformasAdmin(admin.ModelAdmin):
    list_display=('id','nombre',)
@admin.register(Idiomas)
class IdiomasAdmin(admin.ModelAdmin):
    list_display=('id','nombre',)
@admin.register(Prueba)
class PruebaAdmin(admin.ModelAdmin):
    pass

