from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, AnimalViewSet, AnimalDiagnosisViewSet, AppointmentViewSet, MedicineViewSet, SaleViewSet

# router and register viewsets
router = DefaultRouter()
router.register(r'contacts', ContactViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'animal-diagnoses', AnimalDiagnosisViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'medicine', MedicineViewSet)
router.register(r'sales', SaleViewSet)
# URL patterns
urlpatterns = [
    path('api/', include(router.urls)),
    path('', include(router.urls)),  # Include router URLs for browsable API
]
