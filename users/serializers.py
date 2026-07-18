from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source="first_name")

    class Meta:
        model = User
        fields = ["phone", "password", "name"]

    def create(self, validated_data):

        first_name = validated_data.pop("first_name")

        user = User.objects.create_user(
            phone=validated_data["phone"],
            password=validated_data["password"],
            first_name=first_name
        )

        return user


import phonenumbers
from rest_framework import serializers


def validate_phone(value):

    try:
        number = phonenumbers.parse(value, "IT")

        if not phonenumbers.is_valid_number(number):
            raise serializers.ValidationError("Invalid phone number")

    except:
        raise serializers.ValidationError("Invalid phone number")

    return phonenumbers.format_number(
        number,
        phonenumbers.PhoneNumberFormat.E164
    )