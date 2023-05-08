from rest_framework import serializers
from .models import *

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
