from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, CharField

from main.models import Lot, LotData, StatusReport


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class LotSerializer(ModelSerializer):

    class Meta:
        model = Lot
        fields = '__all__'


class LotDataSerializer(ModelSerializer):

    class Meta:
        model = LotData
        fields = '__all__'


class StatusReportSerializer(ModelSerializer):

    class Meta:
        model = StatusReport
        fields = '__all__'
