from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, CharField


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')