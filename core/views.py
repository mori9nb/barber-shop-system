from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import BusinessHours


@api_view(["GET"])
def business_hours(request):

    hours = BusinessHours.objects.all()

    data = []

    for h in hours:
        data.append({
            "day": h.day_of_week,
            "open_time": h.open_time,
            "close_time": h.close_time,
            "is_closed": h.is_closed
        })

    return Response(data)


@api_view(["POST"])
def update_business_hours(request):

    day = request.data.get("day")

    open_time = request.data.get("open_time")

    close_time = request.data.get("close_time")

    is_closed = request.data.get("is_closed", False)

    obj, created = BusinessHours.objects.update_or_create(
        day_of_week=day,
        defaults={
            "open_time": open_time,
            "close_time": close_time,
            "is_closed": is_closed
        }
    )

    return Response({"message": "updated"})


from rest_framework import viewsets
from .models import BusinessHours
from .serializers import BusinessHoursSerializer


class BusinessHoursViewSet(viewsets.ModelViewSet):

    queryset = BusinessHours.objects.all()

    serializer_class = BusinessHoursSerializer