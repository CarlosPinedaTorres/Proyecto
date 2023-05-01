from django.contrib import admin
# from users.models import NewUser
# from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models

from django.contrib.auth.models import User
from users.models import Vendedor

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_staff', 'is_active')

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

@admin.register(Vendedor)
class VendedorAdmin(admin.ModelAdmin):
    list_display=('id','user','nombre_empresa','telefono','direccion')

