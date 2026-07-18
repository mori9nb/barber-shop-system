# from rest_framework import serializers
# from .models import Service
#
#
# class ServiceSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Service
#         fields = [
#             "id",
#             "name",
#             "duration_minutes",
#             "price",
#             "is_active"
#         ]
#


from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = "__all__"