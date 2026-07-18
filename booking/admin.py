from django.contrib import admin
from .models import Booking, BarberBlock


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):

    list_display = (
        "customer_name",
        "barber",
        "service",
        "date",
        "start_time",
        "end_time",
        "status"
    )

    list_filter = (
        "barber",
        "date",
        "status"
    )


@admin.register(BarberBlock)
class BarberBlockAdmin(admin.ModelAdmin):

    list_display = (
        "barber",
        "date",
        "start_time",
        "end_time",
        "reason"
    )