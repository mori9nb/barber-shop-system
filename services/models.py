from django.db import models

# Create your models here.
from django.db import models


class Service(models.Model):

    name = models.CharField(max_length=100)

    duration_minutes = models.IntegerField()

    price = models.DecimalField(max_digits=10, decimal_places=2)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name