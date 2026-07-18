from django.db import models
from barbers.models import Barber
from services.models import Service


class Booking(models.Model):

    STATUS_CHOICES = [
        ("booked", "Booked"),
        ("cancelled", "Cancelled"),
    ]

    barber = models.ForeignKey(
        Barber,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE
    )

    customer_name = models.CharField(max_length=100)

    customer_phone = models.CharField(max_length=20)

    date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="booked"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - {self.date} {self.start_time}"


class BarberBlock(models.Model):

    barber = models.ForeignKey(
        Barber,
        on_delete=models.CASCADE,
        related_name="blocks"
    )

    date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    reason = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.barber.name} blocked {self.start_time}-{self.end_time}"