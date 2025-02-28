from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRegistrationView, UserLoginView, ContactViewSet, AnimalViewSet, AnimalDiagnosisViewSet, AppointmentViewSet, MedicineViewSet, SaleViewSet

# router and register viewsets
router = DefaultRouter()
router.register(r'contacts', ContactViewSet)
router.register(r'patients', AnimalViewSet)
router.register(r'animal-diagnoses', AnimalDiagnosisViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'medicine', MedicineViewSet)
router.register(r'sales', SaleViewSet)
# URL patterns
urlpatterns = [
    path('api/', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('', include(router.urls)),  # Include router URLs for browsable API
]

#count urls:

# http://127.0.0.1:8000/api/sales/total-revenue/ 2540111745757
# http://127.0.0.1:8000/api/medicine/count/
# http://127.0.0.1:8000/api/appointments/count/
# http://127.0.0.1:8000/api/contacts/count/
# http://127.0.0.1:8000/api/patients/count/