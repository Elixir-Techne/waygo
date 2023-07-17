from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from main.serializers import UserSerializer


class WayGoTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['access_token'] = data['access']
        data['refresh_token'] = data['refresh']
        data['user'] = UserSerializer(instance=self.user).data
        del data['access']
        del data['refresh']
        return data


class WayGoTokenObtainPairView(TokenObtainPairView):
    serializer_class = WayGoTokenObtainPairSerializer
