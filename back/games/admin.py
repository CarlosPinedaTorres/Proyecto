from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Juegos)
class GamesAdmin(admin.ModelAdmin):
    list_display=('id','nombre',)
@admin.register(Desarrollador)
class DesarrolladorAdmin(admin.ModelAdmin):
    pass
@admin.register(Genero)
class GeneroAdmin(admin.ModelAdmin):
    pass
@admin.register(Plataformas)
class PlataformasAdmin(admin.ModelAdmin):
    pass
@admin.register(Idiomas)
class IdiomasAdmin(admin.ModelAdmin):
    pass
@admin.register(Prueba)
class PruebaAdmin(admin.ModelAdmin):
    pass

