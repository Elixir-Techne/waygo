from django_filters import rest_framework as django_filter, DateTimeFilter

from main.models import Lot


class LotFilterSet(django_filter.FilterSet):

    class Meta:
        model = Lot
        fields = {
            'species': ['in'],
            'chamber': ['exact']
        }
