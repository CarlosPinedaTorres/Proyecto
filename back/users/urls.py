from django.urls import path
from games.views import *

app_name='users'

urlpatterns=[
    path('register/', UserRegisterView.as_view(), name='register'),
    path('logout/blacklist/',BlacklistTokenView.as_view(),name='blacklist')
]