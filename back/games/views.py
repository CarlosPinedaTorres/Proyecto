from django.shortcuts import render
from django.http import JsonResponse
from PIL import Image
from rest_framework.permissions import AllowAny ,IsAuthenticated
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status ,viewsets,filters,generics,permissions
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.generics import CreateAPIView
from games.serializers import *
from games.models import *
from users.serizalizers import UserRegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView,TokenViewBase
from rest_framework.decorators import *
from users.models import *
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.

# class GamesPost(APIView):
#     def post(self,request):
#         serializer=GamesSerializer(data=request.data)
#         if(serializer.is_valid()):
#             serializer.save(url_portada=request.data['url_portada'])
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class TestUploadImage(APIView):
    permission_classes=[AllowAny]
    parser_classes=[MultiPartParser,FormParser]
    def post(self,request,format=None):
        print(request.data)
        serializer=PruebaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)


# Sirve para ver elementos individuales o apis enteras

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getJuegos(request):
    user= request.user
    vendedor = Vendedor.objects.get(user=user)
    print(vendedor)
    juegos=vendedor.juegos_set.all()
    serializer=GamesSerializer(juegos,many=True)
    return Response(serializer.data)

class Gameslist(generics.ListCreateAPIView):
    permission_classes=[AllowAny]
    # //SI hay problema mirar video 1
    queryset=Juegos.objects.all()
    serializer_class=GamesSerializer
   


# class GamesDetail(generics.RetrieveDestroyAPIView):
#     # //SI hay problema mirar video 1
#     queryset=Juegos.objects.all()
#     serializer_class=GamesSerializer


# class CustomUserCreate(APIView):
#     permission_classes=[AllowAny]
#     def post(self,request):
#         reg_serializer=RegisterUserSerializer(data=request.data)
#         if reg_serializer.is_valid():
#             newuser=reg_serializer.save()
#             if newuser:
#                 return Response(status=status.HTTP_201_CREATED)
#         return Response(reg_serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class UserRegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = {
            'email': user.email,
            'username': user.username,
            'password':request.data.get('password')
        }
        return Response(data, status=status.HTTP_201_CREATED)
class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        try:
            
            refresh_token = request.data["refresh_token"]
            token=RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            print("eje-mal")
            return Response(status=status.HTTP_400_BAD_REQUEST)