from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator

# Contacts Model
class Contact(models.Model):
    contact_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name


# Animal (Patient) Model
class Animal(models.Model):
    animal_id = models.AutoField(primary_key=True)
    owner_name = models.CharField(max_length=100)
    owner_contact = models.CharField(max_length=15)
    species = models.CharField(max_length=50)  # e.g., Dog, Cat, Horse
    breed = models.CharField(max_length=50, blank=True, null=True)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} ({self.species})"


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
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"Appointment for {self.animal.name} on {self.date}"


# Medicine Model
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


# Sales Model
class Sale(models.Model):
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name="sales")
    quantity_sold = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    sale_date = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        """Automatically calculate total price & update medicine stock."""
        if self.medicine and self.quantity_sold:
            self.total_price = self.quantity_sold * self.medicine.price  # Calculate total price
            
            # Update medicine stock
            if self.medicine.quantity >= self.quantity_sold:
                self.medicine.quantity -= self.quantity_sold
                self.medicine.save()
            else:
                raise ValueError("Not enough stock available")
        
        super().save(*args, **kwargs)  # Save the sale record

    def __str__(self):
        return f"Sale of {self.quantity_sold} {self.medicine.name} on {self.sale_date}"
