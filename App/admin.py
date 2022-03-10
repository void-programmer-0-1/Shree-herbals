from django.contrib import admin
from .models import Product
from .models import ProductType
from .models import Sales

# Register your models here.
admin.site.register(Product)
admin.site.register(ProductType)
admin.site.register(Sales)