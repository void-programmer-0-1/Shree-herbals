
from random import vonmisesvariate
from unicodedata import name
from django.urls import path
from . import views

app_name = "App"

urlpatterns = [
    path("",views.homePage,name="homePage"),
    path("invoice/",views.invoicePage,name="invoicePage"),
    path("productTypes/",views.getProductTypes,name="getProductTypes"),
    path("getProduct/",views.getProducts,name="getProducts"),
    path("addProductType/",views.addProductType,name="addProduct"),
    path("addProduct/",views.addProduct,name="addProduct"),
    path("generateInvoiceData/",views.generateInvoiceData,name="generateInvoice"),
    path("generateInvoice/",views.generateInvoice,name="generateInvoice"),
    path("incrementSalesNumber/",views.incrementSalesNumber,name="incrementSalesNumber"),
]