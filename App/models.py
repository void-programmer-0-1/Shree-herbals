
from statistics import mode
from django.db import models


class ProductType(models.Model):

    productType = models.TextField(max_length=120)

    def __str__(self):
        return self.productType


class Product(models.Model):
   
    productName = models.TextField(max_length=200)
    prize = models.FloatField()
    productType = models.ForeignKey(ProductType,on_delete=models.CASCADE)

    def __str__(self):
        return self.productName


class Sales(models.Model):

    saleNumber = models.IntegerField()

    def __str__(self):
        return str(self.saleNumber)
