from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from barbers.views import BarberViewSet
from services.views import ServiceViewSet
from core.views import BusinessHoursViewSet

router = DefaultRouter()

router.register(r'barbers', BarberViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'business-hours', BusinessHoursViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path("api/", include("booking.urls")),
    path("api/auth/",include("users.urls")),
]