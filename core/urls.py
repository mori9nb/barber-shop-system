from rest_framework.routers import DefaultRouter
from .views import BusinessHoursViewSet

router = DefaultRouter()

router.register(r"business-hours", BusinessHoursViewSet)

urlpatterns = router.urls