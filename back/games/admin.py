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
@admin.register(Ventas)
class VentasAdmin(admin.ModelAdmin):
    list_display=('id_comprador','id_vendedor','id_juego',)

@admin.register(PriceHistory)
class PriceHistoryAdmin(admin.ModelAdmin):
    list_display=('id_juego','precio','fecha',)

@admin.register(userPagos)
class userPagosAdmin(admin.ModelAdmin):
    list_display=('id_juego','precio','fecha','id_user')



