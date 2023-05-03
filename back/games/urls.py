# from rest_framework import routers
from .api import *
from django.urls import path ,re_path,include
from games.views import *
# router=routers.DefaultRouter()
# router.register('api/games',GamesViewSet,'games')
# router.register('api/plataformas',PlataformasViewSet,'plataformas')
urlpatterns=[
    # path('<int:pk>/',GamesDetail.as_view(),name='detailcreate'),
    path('games/list/',Gameslist.as_view(),name='list-games'),
    path('games/',getJuegos,name='games-create'),
    path("api/upload/",TestUploadImage.as_view(),name='Subir'),
    path("email-verify/",VerifyEmail.as_view(),name='email-verify'),
]
# urlpatterns+=router.urls

