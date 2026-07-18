from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Barber
from .serializers import BarberSerializer


@api_view(["GET"])
def barber_list(request):

    barbers = Barber.objects.all()

    serializer = BarberSerializer(barbers, many=True)

    return Response(serializer.data)


from rest_framework import viewsets
from .models import Barber
from .serializers import BarberSerializer


class BarberViewSet(viewsets.ModelViewSet):

    queryset = Barber.objects.all()

    serializer_class = BarberSerializer