from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Service
from .serializers import ServiceSerializer


@api_view(["GET"])
def service_list(request):

    services = Service.objects.all()

    serializer = ServiceSerializer(services, many=True)

    return Response(serializer.data)

from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):

    queryset = Service.objects.all()

    serializer_class = ServiceSerializer