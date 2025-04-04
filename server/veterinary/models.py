from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        
        # Automatically set username to email if not provided
        if 'username' not in extra_fields:
            extra_fields['username'] = email
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
        
# Contacts Model
class Contact(models.Model):
    contact_id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name


# Animal (Patient) Model
class Animal(models.Model):
    STATUS_CHOICES = [
        ("admitted", "Admitted"),
        ("discharged", "Discharged"),
    ]
    
    animal_id = models.AutoField(primary_key=True)
    owner_name = models.CharField(max_length=100)
    owner_contact = models.CharField(max_length=15)
    species = models.CharField(max_length=50)  # e.g., Dog, Cat, Horse
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="admitted")

    def __str__(self):
        return f"{self.species} ({self.status})"


# Animal Diagnosis Model
class AnimalDiagnosis(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    diagnosis = models.TextField()
    prescribed_medicine = models.TextField()
    dosage = models.CharField(max_length=50)
    next_checkup = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"Diagnosis for {self.animal.name}"


# Appointments Model
class Appointment(models.Model):
    owner_name = models.CharField(max_length=100)
    owner_contact = models.CharField(max_length=15)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"Appointment for {self.animal.name} on {self.date}"

class Medicine(models.Model):
    CATEGORY_CHOICES = [
        ('antibiotic', 'Antibiotic'),
        ('painkiller', 'Painkiller'),
        ('supplement', 'Supplement'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    expiry_date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.get_category_display()}"

    def stock_value(self):
        return self.quantity * self.price



class Sale(models.Model):
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name="sales")
    quantity_sold = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    sale_date = models.DateTimeField(default=timezone.now)
    
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .serializers import SaleSerializer
from django.http import JsonResponse

@api_view(['POST'])
def create_sale(request):
    try:
        with transaction.atomic():
            sale_serializer = SaleSerializer(data=request.data)
            if sale_serializer.is_valid():
                medicine_id = request.data.get('medicine')
                quantity_sold = int(request.data.get('quantity_sold', 0))

                medicine = Medicine.objects.get(id=medicine_id)

                if medicine.quantity < quantity_sold:
                    return Response({"error": "Not enough stock"}, status=status.HTTP_400_BAD_REQUEST)

                total_price = quantity_sold * medicine.price  # Calculate total price

                # Deduct stock
                medicine.quantity -= quantity_sold
                medicine.save(update_fields=["quantity"])

                # Save sale with total price
                sale = sale_serializer.save(total_price=total_price)

                return Response(SaleSerializer(sale).data, status=status.HTTP_201_CREATED)
            
            return Response(sale_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def save(self, *args, **kwargs):
        """Automatically calculate total price & update medicine stock."""
        if self.medicine and self.quantity_sold:
            self.total_price = self.quantity_sold * self.medicine.price  # Calculate total price

            # Check if enough stock is available before modifying
            if self.medicine.quantity < self.quantity_sold:
                raise ValueError("Not enough stock available")

            # Deduct stock
            self.medicine.quantity -= self.quantity_sold
            self.medicine.save(update_fields=["quantity"])  # Save only the quantity field
        
        super().save(*args, **kwargs)  # Save the sale record

    def __str__(self):
        return f"Sale of {self.quantity_sold} {self.medicine.name} on {self.sale_date}"


def get_total_revenue(request):
    total_revenue = Sale.objects.aggregate(sum('price'))['total_price__sum'] or 0
    return JsonResponse({'total_revenue': total_revenue})

def get_medicine_count():
    count=Medicine.objects.count()
    return Response({"total_medicines": count})

def get_appointment_count():
    count=Appointment.objects.count()
    return Response({"total_appointments": count})

def get_contact_count():
    count=Contact.objects.count()
    return Response({"total_contacts": count})

def get_patient_count():
    count=Animal.objects.count()
    return Response({"total_patients": count})

def get_user_count():
    count=CustomUser.objects.count()
    return Response({"total_users": count})
    