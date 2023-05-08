from rest_framework.views import APIView
from rest_framework.permissions import AllowAny ,IsAuthenticated
from rest_framework import generics,viewsets,permissions

from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.parsers import MultiPartParser,FormParser
from games.serializers import *
from games.models import *
from users.serizalizers import UserRegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework.decorators import *
from users.models import NewUser
from games.utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from rest_framework.generics import CreateAPIView,RetrieveUpdateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenViewBase

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_verified']=user.is_verified
        # ...

        return token
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        if not user.is_verified:
            raise serializers.ValidationError("La cuenta de usuario no está verificada.")

        return data

class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer

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
# CrearJuego
class UploadNewGame(APIView):
    permission_classes=[AllowAny]
    parser_classes=[MultiPartParser,FormParser]
    def post(self,request,format=None):
        print(request.data)
        serializer=GamesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)
        

class UploadPlataforma(APIView):
    permission_classes=[AllowAny]
    parser_classes=[MultiPartParser,FormParser]
    def post(self,request,format=None):
        print(request.data)
        serializer=PlataformasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)



class PlataformasView(APIView):
    permission_classes = [AllowAny]
    serializer_class = PlataformasSerializer
    def get(self, request):
        plataformas = Plataformas.objects.all()
        serializer = self.serializer_class(plataformas, many=True)
        return Response(serializer.data)
class GenerosView(APIView):
    permission_classes = [AllowAny]
    serializer_class = GeneroSerializer
    def get(self, request):
        generos = Genero.objects.all()
        serializer = self.serializer_class(generos, many=True)
        return Response(serializer.data)
    
class IdiomasView(APIView):
    permission_classes = [AllowAny]
    serializer_class = IdiomaSerializer
    def get(self, request):
        idiomas = Idiomas.objects.all()
        serializer = self.serializer_class(idiomas, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getMyGames(request):
    user=request.user
    logueado = Logueado.objects.get(user=user)
    print(logueado)
    juegos=logueado.juegos_set.all()
    serializer=GamesSerializer(juegos,many=True)
    return Response(serializer.data)



######

# Editar juego


class UpdateGameView(RetrieveUpdateAPIView):
    permission_classes=[AllowAny]
    parser_classes=[MultiPartParser,FormParser]
    serializer_class=GamesSerializer
    queryset=Juegos.objects.all()
    lookup_field='id'
    partial = True
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        # Actualiza las relaciones ManyToMany
        instance.plataformas.set(serializer.validated_data.get('plataformas', instance.plataformas.all()))
        instance.genero.set(serializer.validated_data.get('genero', instance.genero.all()))
        instance.idiomas.set(serializer.validated_data.get('idiomas', instance.idiomas.all()))
        return Response(serializer.data)


######


class UserRegisterView(APIView):
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
# register_view = RegisterView.as_view()
class VerifyEmail(generics.GenericAPIView):
    def get(self,request):
        token=request.GET.get('token')
        # print(request)
        try:
            payload=jwt.decode(token,settings.SECRET_KEY, algorithms=["HS256"])
            
            user=NewUser.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified=True
                user.save()
            return Response({'email':'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            payload = jwt.decode(token, options={"verify_signature": False})
            user_id = payload['user_id']
            user1 = NewUser.objects.get(id=user_id)
            user=NewUser.objects.get(email=user1.email)
            token = RefreshToken.for_user(user).access_token
            current_site = get_current_site(request).domain
            relativeLink = reverse('email-verify')
            absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
            email_body = 'Hi '+user.username + \
            ' Use the link below to verify your email \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

            Util.send_email(data)
            print('hola',data)
            # print('hola',user_id)
            #  return RedirectView.as_view(url='./')(request,request(RefreshToken.for_user(user).access_token))
        # //LLAMAR OTRA FUNCION DONDE LO MANDES CON LOS DATOS Y UN TOKEN Y YA
            return Response({'error':'Token expired '}, status=status.HTTP_400_BAD_REQUEST)
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
        
        # Sirve para ver elementos individuales o apis enteras

# @api_view(['GET'])
# @permission_classes([IsAuthenticated]) 
# def getJuegos(request):
#     user= request.user
#     vendedor = Vendedor.objects.get(user=user)
#     print(vendedor)
#     juegos=vendedor.juegos_set.all()
#     serializer=GamesSerializer(juegos,many=True)
#     return Response(serializer.data)


# Esto es para visualizar los juegos en el backend
# class GamesViewSet(viewsets.ModelViewSet):
#     queryset=Juegos.objects.all()
#     serializer_class=GamesSerializer
#     permission_classes=[AllowAny]