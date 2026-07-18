from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(["POST"])
def register(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():

        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })

    return Response(serializer.errors)


@api_view(["POST"])
def login(request):

    phone = request.data.get("phone")
    password = request.data.get("password")

    user = authenticate(phone=phone,password=password)

    if not user:
        return Response({"error":"invalid credentials"},status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })