from django_filters import rest_framework as django_filter,  DateTimeFromToRangeFilter

from main.models import Lot


class LotFilterSet(django_filter.FilterSet):
    start_time = DateTimeFromToRangeFilter(field_name='start_time')

    class Meta:
        model = Lot
        fields = {
            'species': ['in'],
            'chamber': ['exact']
        }
