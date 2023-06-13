from rest_framework import serializers
from .models import *
from users.models import *

class UpdateGamesSerializer(serializers.ModelSerializer):
    plataformas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    genero = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    idiomas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Juegos
        fields = '__all__'
class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Juegos
        fields=('id','vendedor','nombre','descripcion','plataformas','genero','idiomas','num_llaves','precio', 'precio_venta_final','precio_mercado','image','publicacion')

class UpdateGamesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Juegos
        fields=('id','vendedor','nombre','descripcion','plataformas','genero','idiomas','image')
              
class PlataformasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Plataformas
        fields='__all__'


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model=Genero
        fields='__all__'
class IdiomaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Idiomas
        fields='__all__'

class PruebaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Prueba
        fields=('imagen',)
class LogueadoSerializer(serializers.ModelSerializer):
    class Meta:
        model=VirtualWallet
        fields='__all__'

class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ventas
        fields='__all__'

class PriceHistorySerializer(serializers.ModelSerializer):
    hora = serializers.SerializerMethodField()

    def get_hora(self, obj):
        return obj.fecha.strftime('%H:%M:%S')
    class Meta:
        model = PriceHistory
        fields = ('precio', 'hora')

class UserPagosSerializer(serializers.ModelSerializer):
    class Meta:
        model=userPagos
        fields='__all__'
class LogueadoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Logueado
        fields='__all__'


class userPaysSerializer(serializers.ModelSerializer):
    class Meta:
        model=userPagos
        fields='__all__'
   