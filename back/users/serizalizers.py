from rest_framework import serializers
from django.contrib.auth.models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    username=serializers.CharField(max_length=150)
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=('id','email','username','password')
    def create(self, validated_data):
        user=User.objects.create_user(
            email=validated_data["email"],
            username=validated_data['username'],
            password=validated_data['password']
        )
        user.is_staff=True
        user.save()
        return user
# from users.models import NewUser
# class RegisterUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=NewUser
#         fields=('email','user_name','password')
#         extra_kwargs={'password':{'write_only':True}}
#     def create(self,validated_data):
#         password=validated_data.pop('password',None)
#         instance=self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance