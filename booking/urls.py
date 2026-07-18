from django.urls import path
from .views import available_slots, create_booking, block_time, my_bookings, barber_bookings, delete_block
from django.urls import path
from .views import calendar_view
from .views import create_booking, cancel_booking, available_slots
urlpatterns = [
    path("block-time/", block_time),

    path(
        "available-slots/",
        available_slots
    ),

    path(
        "bookings/",
        create_booking
    ),
    path("bookings/", create_booking),


    path("bookings/<int:booking_id>/cancel/", cancel_booking),

    path("available-slots/", available_slots),
    path("calendar/", calendar_view),
    path("my-bookings/", my_bookings),
    path("barber-bookings/", barber_bookings),
    path("block/<int:block_id>/", delete_block),




]


