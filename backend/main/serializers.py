from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, CharField

from main.models import Lot, LotData, StatusReport, AppUser, Company


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class CompanySerializer(ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'


class AppUserSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    company = CompanySerializer(read_only=True)

    class Meta:
        model = AppUser
        fields = ('user', 'company', 'fullname')


class LotSerializer(ModelSerializer):

    class Meta:
        model = Lot
        fields = '__all__'


class LotDataSerializer(ModelSerializer):

    class Meta:
        model = LotData
        fields = '__all__'


class StatusReportSerializer(ModelSerializer):
    lot = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = StatusReport
        fields = '__all__'

    def get_lot(self, instance):
        lot = None
        if instance.lot_id:
            lot_instance = Lot.objects.get(id=instance.lot_id)
            lot = LotSerializer(instance=lot_instance, many=False).data
        return lot
