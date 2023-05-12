# from rest_framework import routers
from .api import *
from django.urls import path ,re_path,include
from games.views import *
# router=routers.DefaultRouter()
# router.register('api/games',GamesViewSet,'games')
# router.register('api/plataformas',PlataformasViewSet,'plataformas')
urlpatterns=[
    path("plataforma/upload/",UploadPlataforma.as_view(),name='plataforma-upload'),
    path("game/upload/",UploadNewGame.as_view(),name='game-upload'),
    path("api/upload/",TestUploadImage.as_view(),name='Subir'),
    path("email-verify/",VerifyEmail.as_view(),name='email-verify'),
    path("plataformas/",PlataformasView.as_view(),name='plataformas'),
    path("generos/",GenerosView.as_view(),name='generos'),
    path("idiomas/",IdiomasView.as_view(),name='idiomas'),
    path("myGames/",getMyGames,name='mygames'),
    path('games/<int:id>/', UpdateGameView.as_view(), name='game-update'),
    path('api/charge/', charge, name='api-charge'),
    path('api/recharge_wallet/',recharge_wallet,name="recharge-wallet")
]
# urlpatterns+=router.urls

