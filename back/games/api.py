from .models import *
from rest_framework import viewsets,permissions
from .serializers import *

# class GamesViewSet(viewsets.ModelViewSet):
#     queryset=Juegos.objects.all()
#     permission_classes=[permissions.AllowAny]
#     serializer_class=GamesSerializer
# class PlataformasViewSet(viewsets.ModelViewSet):
#     queryset=Plataformas.objects.all()
#     permission_classes=[permissions.AllowAny]
#     serializer_class=PlataformasSerializer
