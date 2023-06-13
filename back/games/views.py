from rest_framework.views import APIView
from rest_framework.permissions import AllowAny ,IsAuthenticated
from rest_framework import generics,viewsets,permissions
from rest_framework.exceptions import PermissionDenied
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
from users.models import NewUser,Logueado,VirtualWallet
from games.utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from rest_framework.generics import CreateAPIView,RetrieveUpdateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenViewBase
import stripe
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from django.db import transaction
import time
import smtplib
from email.mime.text import MIMEText
from users.serizalizers import VirtualWalletSerializer
import random
from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
import json
from django.db import IntegrityError
from rest_framework.exceptions import APIException
from django.http import Http404
from django.contrib.auth.decorators import login_required
import os
from dotenv import load_dotenv

load_dotenv()
URL_FRONT = os.environ.get('URL_FRONT')
#REset password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_verified']=user.is_verified
        token['is_target']=user.is_target
     
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
# class UploadNewGame(APIView):
#     permission_classes=[AllowAny]
#     parser_classes=[MultiPartParser,FormParser]
#     def post(self,request,format=None):
#         print(request.data)
#         print('aqui estoy ')

#         serializer=GamesSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)
        
# @api_view(['POST'])
# def uploadNewGame(request):
    # if request.method == 'POST':

    #     print(request.data)
    #     print('aqui estoy')
    #     form_data = request.data.get('data')  # Obtener los datos adicionales
    #     if form_data:
    #         data = json.loads(form_data)
    #         porcentaje = data.get('media')  # Acceder al campo "suma"
    #         id_user=data.get('id_user')
           
    #         user=NewUser.objects.get(id=id_user)
    #         logueado=Logueado.objects.get(user=user)
    #         logueado.noVisto=True
    #         # wallet=VirtualWallet.objects.get(id=2)
    #         wallet=VirtualWallet.objects.get(id=4)
    #         logueado.noVisto=True
    #         logueado.save()
    #         wallet.balance+=Decimal(porcentaje)
    #         wallet.save()
    #         pago=userPagos(id_user=logueado,precio=porcentaje,tipo='Crear Juego',visto=False)
    #         pago.save()
    #         print(porcentaje)
    #     serializer = GamesSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CrearJuego(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        serializer = GamesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UploadPlataforma(APIView):
    permission_classes=[AllowAny]
    parser_classes=[MultiPartParser,FormParser]
    def post(self,request,format=None):
        print('aqui estoy ')
        serializer=PlataformasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            print('aqui estoy 11')
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
    
# ObtenerJUegosPropios
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getMyGames(request):
    user=request.user
    logueado = Logueado.objects.get(user=user)
    print(logueado)
    juegos=logueado.juegos_set.all()
    serializer=GamesSerializer(juegos,many=True)
    return Response(serializer.data)

# Obtener todos los juegos
@api_view(['GET'])
@permission_classes([AllowAny])
def getAllGames(request,id_user):
    order_by = request.query_params.get('order_by')  # Obtén el parámetro de consulta 'order_by'
 
    if(id_user!=0):
        user=NewUser.objects.get(id=id_user)
        logueado=Logueado.objects.get(user=user)
        juegos = Juegos.objects.exclude(vendedor=logueado)  
    else:
        juegos = Juegos.objects.all() 
    if order_by:
        if order_by == 'desc':
            juegos = juegos.order_by('-nombre')  # Ordenar de mayor a menor según el campo 'nombre'
        elif order_by == 'asc':
            juegos = juegos.order_by('nombre')  # Ordenar de menor a mayor según el campo 'nombre'
    serializer = GamesSerializer(juegos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

######

# Editar juego
 

class UpdateGameView(RetrieveUpdateAPIView):
    parser_classes = [MultiPartParser,FormParser]
    serializer_class = GamesSerializer
    lookup_field = 'id'
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
    def get_queryset(self):
        # Filtrar los juegos para mostrar solo los que pertenecen al usuario actual
        queryset = Juegos.objects.filter(vendedor=self.request.user.logueado)
        return queryset

    def perform_update(self, serializer):
        # Obtener la instancia actual del juego
        instance = serializer.save()

        # Verificar si el usuario actual es el propietario del juego
        if instance.vendedor != self.request.user.logueado:
            raise PermissionDenied("No tienes permiso para editar este juego.")
        


######


class UserRegisterView(APIView):
    serializer_class = UserRegisterSerializer
    def post(self, request):
        try:
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
            email_body = 'Hi '+user.username + ' Use the link below to verify your email \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Verify your email'}
            Util.send_email(data)
            return Response(user_data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            error_message = str(e)
            if 'email' in error_message:
                raise DuplicateEmailException()
            elif 'username' in error_message:
                raise DuplicateNameException()
            
class DuplicateNameException(APIException):
    status_code = 400
    default_detail = 'El nombre de Empresa ya esta registrado, introduce uno válido'
    default_code = 'duplicate_name'
class DuplicateEmailException(APIException):
    status_code = 400
    default_detail = 'EL correo que has introducido ya existe por favor introduzca uno valido'
    default_code = 'duplicate_email'
# register_view = RegisterView.as_view()
class VerifyEmail(generics.GenericAPIView):
    def get(self,request):
        token=request.GET.get('token')
        try:
            payload=jwt.decode(token,settings.SECRET_KEY, algorithms=["HS256"])
            
            user=NewUser.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified=True
                user.save()
                logueado=Logueado(user=user)
                logueado.save()
               
            
              
            return redirect('http://localhost:5173/login') 
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
        


# PAGOS CON STRIPE

stripe.api_key=settings.STRIPE_SECRET_KEY


########
# wallet
stripe.api_key=settings.STRIPE_SECRET_KEY
@api_view(['POST'])
@transaction.atomic

def crear_cliente_stripe(request):
    user_data = request.data.get('user')
    print('hola1', user_data)

    try:
        user = NewUser.objects.get(id=user_data['user_id'])
        logueado = Logueado.objects.get(user=user)  # Obtén el usuario de la base de datos
    except (NewUser.DoesNotExist, Logueado.DoesNotExist):
        return Response({'error': 'Usuario no encontrado.'})

    print('hola', logueado)
    print(user_data['username'], 'dadad')
    
    try:
        shipping_address = {
            'line1': request.data.get('calle'),
            'city': request.data.get('ciudad'),
            'postal_code': request.data.get('cp'),
            'country': request.data.get('pais')  # Reemplaza con el código de país deseado
        }
        # Crea un cliente en Stripe
        customer = stripe.Customer.create(
            name=user_data['username'],
            email=logueado.user.email,
            tax_exempt='exempt',
            phone='657176776',
            metadata={
                'user_id': user_data['user_id'],
                'currency': request.data.get('currency')
            },
            shipping={
                'address': shipping_address,
                'name': request.data.get('name')
            }
        )
        # Guarda el customer_id en el modelo de usuario
        logueado.customer_id = customer.id
        logueado.account = True
        logueado.wallet = True
        logueado.save()
        wallet = VirtualWallet(wallet_user=logueado)
        wallet.save()

        return Response({'success': True})

    except stripe.error.StripeError as e:
        return Response({'error': str(e)})
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
@transaction.atomic

def create_stripe_account(request):
    userName = request.data.get('user')
    logueado = Logueado.objects.get(id=userName['user_id'])
    current_timestamp=int(time.time())
    try:
        account = stripe.Account.create(
            type='custom',
            country='ES',
            email=logueado.user.email,
            business_type='individual',
            individual={
                'first_name': userName['username'],
                'last_name': 'Pineda',
                'email': logueado.user.email,
                
            },
            
            requested_capabilities=['card_payments', 'transfers'],
            tos_acceptance={
                'date':current_timestamp,'ip':'45.86.184.246'


            },
            
        )
        print(account)
        
        # Guardar el ID de la cuenta de Stripe en tu modelo Logueado
        logueado.stripe_account_id = account.id

        logueado.save()
        

        return Response({'success': True, 'account_id': account.id})

    except stripe.error.StripeError as e:
        return Response({'error': str(e)})
    
def send_email(to_email, subject, message):
    # nuhiruvlmdpnkyvg
    from_email = 'confirmemailgm@gmail.com'
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'confirmemailgm@gmail.com'
    smtp_password = 'nuhiruvlmdpnkyvg'

    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = to_email

    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(smtp_username, smtp_password)
    server.send_message(msg)
    server.quit()

# webhook_signing_secret = 'whsec_65622f40d8f0baa0821ac9e448b5b2d27f64189285fca0495757bf8b3e118b3f'
@api_view(['POST'])
def recharge_wallet(request):
    userName = request.data.get('user')
    print(userName)
    user=NewUser.objects.get(id=userName['user_id'])
    logueado = Logueado.objects.get(user=user)
    # print(logueado)
    wallet = VirtualWallet.objects.get(wallet_user=logueado)
    balance = wallet.balance
    amount = request.data.get('amount')
    payment_method_id = request.data.get('paymentMethodId')
    # print('waller',wallet)
    try:
        # Obtener la información de la tarjeta de crédito
        #REVISAR
        # payment_method = stripe.PaymentMethod.retrieve(payment_method_id)
        # card = payment_method.card
        # print(card)
        # Realizar la transacción
        customer = stripe.Customer.retrieve(logueado.customer_id)
        print('customer',customer)
        intent = stripe.PaymentIntent.create(
            amount=int(amount) * 100, 
            currency=customer['metadata']['currency'],
            payment_method=payment_method_id,
            confirmation_method='manual',
            confirm=True,
            customer=logueado.customer_id,
            description='Wallet recharge for user %s' % userName['username'],
            statement_descriptor='WALLET RECHARGE',
        )
        # print(intent)
        
        # Actualizar el balance de la billetera virtual
        wallet.balance = wallet.balance + int(amount)
        wallet.save()

  

        if intent.status == 'succeeded':
            payment_amount = intent.amount
            currency = intent.currency

            # Construir el mensaje del correo
            subject = 'Pago exitoso'
            message = f"¡Tu pago de {payment_amount/100} {currency} ha sido aceptado! Se ha ingresado el dinero a tu wallet."

            # Enviar el correo al cliente
            send_email(logueado.user.email, subject, message)
            pago=userPagos(id_user=logueado,precio=amount,tipo='Recargar Wallet' ,visto=False)
            pago.save()
            logueado.noVisto=True
            logueado.save()
        return Response({'success': True})

    except stripe.error.CardError as e:
        return Response({'error': str(e)})

    except Exception as e:
        return Response({'error': str(e)})




from django.http import HttpResponse
endpoint_secret = 'whsec_65622f40d8f0baa0821ac9e448b5b2d27f64189285fca0495757bf8b3e118b3f'
@csrf_exempt
def my_webhook_view(request):

  payload = request.body
  sig_header = request.META['HTTP_STRIPE_SIGNATURE']
  event = None

  try:
    event = stripe.Webhook.construct_event(
      payload, sig_header, endpoint_secret
    )
  except ValueError as e:
    # Invalid payload
    return HttpResponse(status=400)
  except stripe.error.SignatureVerificationError as e:
    # Invalid signature
    return HttpResponse(status=400)


  return HttpResponse(status=200)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllWallets(request):
    user1=request.user
    print('aqui',user1)
    user=NewUser.objects.get(username=user1)
    logueado=Logueado.objects.get(user=user)
    print(logueado)
    wallet=VirtualWallet.objects.get(wallet_user=logueado)
    print(wallet)
    serializer=VirtualWalletSerializer(wallet)
    print(serializer)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def updateWallet(request):
    print(request.user)
    logueado=Logueado.objects.get(user=request.user)
    num_llaves_compradas=request.data.get('llaves')
    amount = request.data.get('amount')
    print(logueado)
    id_comprador=request.data.get('id_comprador')
    id_vendedor=request.data.get('id_vendedor')
    id_juego=request.data.get('id_juego')
    precio_venta_user=request.data.get('precio_venta_user')
    vendedor=Logueado.objects.get(id=id_vendedor)
    juego=Juegos.objects.get(id=id_juego)
    juego.num_llaves=juego.num_llaves-int(num_llaves_compradas)
    # if(juego.num_llaves==0){
    #     juego.
    # }
    juego.save()
    venta=Ventas(id_comprador=logueado,id_vendedor=vendedor,id_juego=juego,num_llaves_compradas=num_llaves_compradas,precio_venta_user=precio_venta_user)
    venta.save()
    wallet = VirtualWallet.objects.get(wallet_user=logueado)
    wallet.balance =wallet.balance - amount  
    wallet.save() 
    pago1=userPagos(id_user=logueado,id_juego=juego,precio=amount,tipo='Compra de llaves',visto=False)
    pago1.save()
    pago=userPagos(id_user=vendedor,id_juego=juego,precio=amount,tipo='Venta llaves',visto=False)
    pago.save()
    logueado.noVisto=True
    logueado.save()
    serializer = VirtualWalletSerializer(wallet)
    return Response(serializer.data)



# obtener media para precio propuesto final
@api_view(['GET'])
def getAllVentas(request, id_juego):
    ventas = Ventas.objects.filter(id_juego=id_juego)
    compradores = {}
    sumaLlaves=0
    total=0
    for venta in ventas:
        id_comprador = venta.id_comprador.id
        num_llaves = venta.num_llaves_compradas
        
        if id_comprador in compradores:
            compradores[id_comprador]['num_llaves'] += num_llaves
            compradores[id_comprador]['valor_total'] = venta.precio_venta_user
        else:
            sumaLlaves += num_llaves
            print(sumaLlaves)
            compradores[id_comprador] = {
                'id_comprador': id_comprador,
                'num_llaves': num_llaves,
                'valor_total': venta.precio_venta_user
            }
        print(compradores)
    for key, value in compradores.items():
        pesoProporcional=value['num_llaves']/sumaLlaves
        precioPonderado=float(pesoProporcional)*float(value['valor_total'])
        total+=precioPonderado
    juego=Juegos.objects.get(id=id_juego)
    juego.precio_venta_final=total
    juego.activar=True
    juego.save()
    return Response(total)


# Obtener un juego
@api_view(['GET'])
def getGame(request, id_juego):
    juego =Juegos.objects.get(id=id_juego)
    serializer = GamesSerializer(juego)
    return Response(serializer.data)




#OBtener una wallet 
@api_view(['GET'])
def getWallet(request, id_user):
    user =NewUser.objects.get(id=id_user)
    logueado=Logueado.objects.get(user=user)
    wallet_user=VirtualWallet.objects.get(wallet_user=logueado)
    serializer = VirtualWalletSerializer(wallet_user)
    return Response(serializer.data)
############
# OBtener juegosActivados para venta

@api_view(['POST'])
def getJuegosActivados(request):
    if request.user.is_authenticated:
        userName = request.user.username
        print('user',userName)
    juegos_activados = Juegos.objects.filter(activar=True)
    entro=False
   
    for juego in juegos_activados:
    
        
    

        if juego.vendido!=True and float(juego.precio_mercado) >= juego.precio_venta_final:
            ventas_juego = Ventas.objects.filter(id_juego=juego)
            for venta in ventas_juego:



                comprador = venta.id_comprador
                comprador.noVisto=True
                comprador.save()
             
                # logueado=Logueado.objects.get()
                num_llaves = venta.num_llaves_compradas
                precio_mercado = juego.precio_mercado
                
                beneficio=Decimal(num_llaves)*Decimal(precio_mercado)
                wallet=VirtualWallet.objects.get(wallet_user=comprador)
                print(f"{comprador} : {beneficio}")
                print(f"{comprador} : {wallet}")
                num_llaves = venta.num_llaves_compradas
                wallet.balance+=beneficio
                wallet.save()
                juego.vendido=True
                juego.save()
                entro=True
                pago=userPagos(id_user=comprador,id_juego=juego,precio=beneficio,visto=False,tipo='Llaves vendidas')
                pago.save()
                print(f"Comprador: {comprador}, Num. de llaves: {num_llaves}")


        elif juego.vendido!=True and juego.contador>=4:
            ventas_juego = Ventas.objects.filter(id_juego=juego)
            for venta in ventas_juego:



                comprador = venta.id_comprador
                comprador.noVisto=True
                comprador.save()
               
                num_llaves = venta.num_llaves_compradas
                precio_mercado = juego.precio_mercado
                
                beneficio=Decimal(num_llaves)*Decimal(precio_mercado)
                wallet=VirtualWallet.objects.get(wallet_user=comprador)
                print(f"{comprador} : {beneficio}")
                print(f"{comprador} : {wallet}")
                num_llaves = venta.num_llaves_compradas
                wallet.balance+=beneficio
                wallet.save()
                juego.vendido=True
                juego.save()
                entro=True
                pago=userPagos(id_user=comprador,id_juego=juego,precio=beneficio,visto=False,tipo='Llaves vendidas')
                pago.save()
                print(f"Comprador: {comprador}, Num. de llaves: {num_llaves}")
        if juego.contador>=4:
            juego.contador=0
        else:
            juego.contador+=1
        juego.save()
    serializer = GamesSerializer(juegos_activados, many=True)
    if entro:
           
        return Response({
            'success': True,
            'message': 'La wallet se actualizó correctamente.',
            'data': serializer.data
        })
           
    else:
        return Response({
        'success': False,
        'message': 'No se pudo actualizar la wallet.',
        'data': serializer.data
    })
               
    
  
 

# Update precios

@api_view(['POST'])
def getUpdatePrice(request):
    juegos = Juegos.objects.all()
    
    for juego in juegos:
        print(f"anterior {juego.precio_mercado}")
        precio=round(random.uniform(0, 5), 2)
        juego.precio_mercado = precio
        juego.save()
        
       
        newPrice=PriceHistory(id_juego=juego,precio=precio)
        newPrice.save()
    serializer = GamesSerializer(juegos, many=True)
    return Response(serializer.data)


######
# Registro de precio de un juego
@api_view(['GET'])
def getHistoryPrices(request,id_juego):
    juego=Juegos.objects.get(id=id_juego)
    print(juego)
    prices = PriceHistory.objects.filter(id_juego=juego).order_by('-fecha')[:10]
    serializer=PriceHistorySerializer(prices,many=True)
    return Response(serializer.data)


#####
@api_view(['GET'])
def getPaysUser(request,id_user):
    user=NewUser.objects.get(id=id_user)
    print(user)
    logueado=Logueado.objects.get(user=user)
    pays= userPagos.objects.filter(id_user=logueado).order_by('-fecha')[:10]
    serializer=PriceHistorySerializer(pays,many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getLogueado(request, id_user):
    logueado = get_object_or_404(Logueado, id=id_user)
    nombre_usuario = logueado.user.username  # Obtener el nombre de usuario logueado
    return Response({'nombre_usuario': nombre_usuario})
@api_view(['GET'])
def getIdLogueado(request, id_user):
    user= get_object_or_404(NewUser, id=id_user)
    logueado= Logueado.objects.get(user=user) # Obtener el nombre de usuario logueado
    return Response({'id': logueado.id})
@api_view(['GET'])
def getInfoLogueado(request, id_user):
    user=NewUser.objects.get(id=id_user)
    logueado=Logueado.objects.get(user=user)
    print(logueado) # Obtener el nombre de usuario logueado
    serializer=LogueadoSerializer(logueado)
    return Response(serializer.data)


@api_view(['GET'])
def getInfoGame(request, id_juego):
    juego=Juegos.objects.get(id=id_juego)
  

    serializer=GamesSerializer(juego)
    return Response(serializer.data)

@api_view(['GET'])
def getNameVendedor(request, id_user):
    logueado=Logueado.objects.get(id=id_user)
  

    return Response({'nombre_usuario':logueado.user.username})

@api_view(['GET'])
def getMyPays(request, id_user):
    print(id_user)
    user=NewUser.objects.get(id=id_user)
    print(user)
    logueado=Logueado.objects.get(user=user)
    print(logueado)
    pays=userPagos.objects.filter(id_user=logueado)
    print(pays)
    serializer=userPaysSerializer(pays,many=True)

    return Response(serializer.data)

@api_view(['POST'])
def checkVisto(request, id_user):
    user = NewUser.objects.get(id=id_user)
    logueado = Logueado.objects.get(user=user)
 
    logueado.noVisto = False
    logueado.save()
    pays=userPagos.objects.filter(id_user=logueado)
    for pago in pays:
        pago.visto=True
        pago.save()
    return Response(status=status.HTTP_200_OK)



@api_view(['GET'])
def infoNewUser(request, id_user):
    user = NewUser.objects.get(id=id_user)
   
    
    return Response({'email':user.email,})

@api_view(['GET'])
def nameGame(request, id_juego):
    juego = Juegos.objects.get(id=id_juego)
   
    
    return Response({'nombre':juego.nombre,})



@api_view(['DELETE'])
def deleteGame(request, id_juego):
    juego = Juegos.objects.get(id=id_juego)
    if Ventas.objects.filter(id_juego=juego).exists():
        return Response({'error': 'No se puede eliminar un juego con ventas asociadas'}, status=status.HTTP_400_BAD_REQUEST)
    else: 
        nombre_juego = juego.nombre
        juego.delete()
        return Response({'nombre': nombre_juego}, status=status.HTTP_200_OK)
    

# RESET PASSWORD
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth import get_user_model
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

User = get_user_model()

@api_view(['POST'])
def reset_password_request(request):
    email = request.data.get('email')
    if email:
        user = NewUser.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            # endpoint=os.environ.get('URL_FRONT')
            # print(endpoint)
            reset_url = (f'{URL_FRONT}#/reset-password/confirm/{uid}/{token}/')
            message = f"Please click the following link to reset your password:\n\n{reset_url}"
            send_mail(
                "Password reset request",
                message,
                "noreply@example.com",
                [user.email],
                fail_silently=False,
            )
    return Response(status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
def reset_password_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        if request.method == 'POST':
            password = request.data.get('password')
            confirm_password = request.data.get('confirm_password')
            if password == confirm_password:
                user.set_password(password)
                user.save()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            # Render the password reset confirmation form
            return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
####
# @api_view(['GET'])
# def getJuegosActivados(request):
#     juegos_activados = Juego.objects.filter(activar=True)
    
#     for juego in juegos_activados:
#         juego.precio_mercado = round(random.uniform(0, 5), 2)
#         juego.save()
    
#     serializer = GamesSerializer(juegos_activados, many=True)
#     return Response(serializer.data)

#########



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

##Codigo de pruebas wallet


# def recharge_wallet(request):
#     userName=request.data.get('user')
#     print(userName)
#     logueado = Logueado.objects.get(id=userName['user_id'])
#     print(logueado)
#     wallet = logueado.virtualwallet
#     print(wallet)
#     balance = wallet.balance
#     amount = (request.data.get('amount'))
#     token = (request.data.get('stripeToken'))
   


#     try:
#         intent = stripe.Charge.create(
#             amount=int(amount) * 100, # convert to cents
#             currency='usd',
#             source=token,
#             description='Wallet recharge for user %s' % userName['username'],
           
#         )

#         wallet.balance=wallet.balance + int(amount)
#         print(wallet.balance)
#         wallet.save()
      
#         return Response({'success': True})

#     except stripe.error.CardError as e:
#         return Response({'error': str(e)})

#     except Exception as e:
#         return Response({'error': str(e)})


# @api_view(['POST'])
# @csrf_exempt
# def charge(request):
#     # Obtener el token de la tarjeta de crédito desde el cliente
#     token = request.data.get('stripeToken')
#     # Obtener el producto seleccionado por el usuario
#     product = request.data.get('product')
#     # Obtener el correo electrónico del cliente
#     email = request.data.get('email')
#     # Crear un cargo en Stripe
#     try:
#         charge = stripe.Charge.create(
#             amount=product['price'],  # Monto en centavos
#             currency=product['currency'],
#             description=product['name'],
#             source=token,
#             metadata={
#                 'customer_name': email,
#             }
#         )
#         # Guardar el pedido en la base de datos
#         # order = Order.objects.create(
#         #     product_name=product['name'],
#         #     product_price=product['price'],
#         #     customer_email=email,
#         #     stripe_charge_id=charge.id,
#         # )
#         # Enviar una respuesta exitosa al cliente
#         return Response({'success': True}, status=status.HTTP_200_OK)
#     except stripe.error.CardError as e:
#         # Enviar una respuesta de error al cliente
#         return Response({'success': False, 'error': e.error.message}, status=status.HTTP_400_BAD_REQUEST)