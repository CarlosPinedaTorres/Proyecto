from rest_framework import serializers
from .models import *
class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Juegos
        fields='__all__'
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
