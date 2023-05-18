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
from users.models import NewUser
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
    permission_classes = [IsAuthenticated]
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
        


# PAGOS CON STRIPE

stripe.api_key=settings.STRIPE_SECRET_KEY
@api_view(['POST'])
@csrf_exempt
def charge(request):
    # Obtener el token de la tarjeta de crédito desde el cliente
    token = request.data.get('stripeToken')
    # Obtener el producto seleccionado por el usuario
    product = request.data.get('product')
    # Obtener el correo electrónico del cliente
    email = request.data.get('email')
    # Crear un cargo en Stripe
    try:
        charge = stripe.Charge.create(
            amount=product['price'],  # Monto en centavos
            currency=product['currency'],
            description=product['name'],
            source=token,
            metadata={
                'customer_name': email,
            }
        )
        # Guardar el pedido en la base de datos
        # order = Order.objects.create(
        #     product_name=product['name'],
        #     product_price=product['price'],
        #     customer_email=email,
        #     stripe_charge_id=charge.id,
        # )
        # Enviar una respuesta exitosa al cliente
        return Response({'success': True}, status=status.HTTP_200_OK)
    except stripe.error.CardError as e:
        # Enviar una respuesta de error al cliente
        return Response({'success': False, 'error': e.error.message}, status=status.HTTP_400_BAD_REQUEST)

########
# wallet
stripe.api_key=settings.STRIPE_SECRET_KEY
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
@transaction.atomic
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
    logueado = Logueado.objects.get(id=userName['user_id'])
    wallet = logueado.virtualwallet
    balance = wallet.balance
    amount = request.data.get('amount')
    payment_method_id = request.data.get('paymentMethodId')

    try:
        # Obtener la información de la tarjeta de crédito
        #REVISAR
        # payment_method = stripe.PaymentMethod.retrieve(payment_method_id)
        # card = payment_method.card
        # print(card)
        # Realizar la transacción
        intent = stripe.PaymentIntent.create(
            amount=int(amount) * 100, 
            currency='usd',
            payment_method=payment_method_id,
            confirmation_method='manual',
            confirm=True,
            customer=logueado.customer_id,
            description='Wallet recharge for user %s' % userName['username'],
            statement_descriptor='WALLET RECHARGE',
        )
        print(intent)
        
        # Actualizar el balance de la billetera virtual
        wallet.balance = wallet.balance + int(amount)
        wallet.save()
        if intent.status == 'succeeded':
            payment_amount = intent.amount
            currency = intent.currency

            # Construir el mensaje del correo
            subject = 'Pago exitoso'
            message = f"¡Tu pago de {payment_amount} {currency} ha sido aceptado! Se ha ingresado el dinero a tu wallet."

            # Enviar el correo al cliente
            send_email(logueado.user.email, subject, message)
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






def crear_cliente_stripe(request):
    userName = request.data.get('user')
    print(userName)
    logueado = Logueado.objects.get(id=userName['user_id'])  # Obtén el usuario de la base de datos
    print(logueado.user.email)
    try:
        # Crea un cliente en Stripe
        customer = stripe.Customer.create(
            name=userName['username'],
            email=logueado.user.email,
            metadata={
                'user_id': userName['user_id'],
            },
            # invoice_settings={
            #     'default_payment_method':'card',
            # },
        )
        print(customer)
        # Guarda el customer_id en el modelo de usuario
        logueado.customer_id = customer.id
        logueado.save()

        return Response({'success': True})

    except stripe.error.StripeError as e:
        return Response({'error': str(e)})

    except userName.DoesNotExist:
        return Response({'error': 'Usuario no encontrado.'})
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