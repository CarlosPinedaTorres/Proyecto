from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, username, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, username,password, **other_fields)

    def create_user(self, email, username, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                           **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_verified=models.BooleanField(default=False)
    is_target=models.BooleanField(default=False,null=True,blank=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username



class Logueado(models.Model):
    user=models.OneToOneField(NewUser,on_delete=models.CASCADE)
    telefono=models.CharField(max_length=100 ,null=True,blank=True)
    pais=models.CharField(max_length=100, null=True,blank=True)
    customer_id=models.CharField(null=True,blank=True,max_length=100)
    stripe_account_id =models.CharField(null=True,blank=True,max_length=100)
    account=models.BooleanField(default=False,null=True,blank=True)
    wallet=models.BooleanField(default=False,null=True,blank=True)
    noVisto=models.BooleanField(default=False,null=True,blank=True)
    class Meta:
        verbose_name='Logueado'
        verbose_name_plural ='Logueado'
    def __str__(self):
        return self.user.username
class VirtualWallet(models.Model):
    wallet_user=models.OneToOneField(Logueado,on_delete=models.CASCADE)
    balance=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    def __str__(self):
        return f"{self.wallet_user.user.username}'s wallet with balance ${self.balance}"
