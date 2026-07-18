from django.db import models

# Create your models here.
class BusinessHours(models.Model):

    DAY_CHOICES = (
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday"),
    )

    day_of_week = models.IntegerField(choices=DAY_CHOICES)

    open_time = models.TimeField()

    close_time = models.TimeField()

    is_closed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.get_day_of_week_display())