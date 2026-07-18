from django.db import models
from django.conf import settings
from services.models import Service


class Barber(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)

    services = models.ManyToManyField(
        Service,
        related_name="barbers",
        blank=True
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name