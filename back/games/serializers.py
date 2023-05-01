from rest_framework import serializers
from .models import *
class GamesSerializer(serializers.ModelSerializer):
    url_portada = serializers.ImageField()
    class Meta:
        model=Juegos
        fields='__all__'
class PlataformasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Plataformas
        fields='__all__'
class PruebaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Prueba
        fields=('imagen',)