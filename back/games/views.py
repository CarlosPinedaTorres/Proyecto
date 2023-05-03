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
from users.models import NewUser
from games.utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
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



class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = NewUser.objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relativeLink = reverse('email-verify')
        absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        email_body = 'Hi '+user.username + \
            ' Use the link below to verify your email \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)
    
class VerifyEmail(generics.GenericAPIView):
    def get(self,request):
        token=request.GET.get('token')
        try:
            payload=jwt.decode(token,settings.SECRET_KEY, algorithms=["HS256"])
            
            user=NewUser.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified=True
                user.save()
            return Response({'email':'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error':'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error':'INvalid token'}, status=status.HTTP_400_BAD_REQUEST)



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