from django.urls import path
from . import views

app_name = "main"

urlpatterns = [
    path("lots/", views.get_all_lots, name="get_all_lots"),
    path("lots/time/", views.get_lots_in_time_period, name="get_lots_in_time_period"),
    path("lots/species/", views.get_lots_by_species, name="get_lots_by_species"),
    path("lots/chamber/", views.get_lots_by_chamber, name="get_lots_by_chamber"),
    path("lots/<str:lot_id>/", views.get_lot_details, name="get_lot_details"),
    path("lotdata/<str:lot_id>/", views.get_lotdata_by_lot, name="get_lotdata_by_lot"),
    path("lots/create/", views.create_lot, name="create_lot"),
    path("lotdata/create/", views.create_lotdata, name="create_lotdata"),
]
