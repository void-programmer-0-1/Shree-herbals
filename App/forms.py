
from django import forms
from django.forms import ModelForm
from .models import Product, ProductType
from django.forms.widgets import TextInput,NumberInput,Select

class AddProductTypeForm(ModelForm):
    class Meta:
        model = ProductType
        fields = ["productType"]

    def __init__(self,*args,**kwargs):
        super(AddProductTypeForm,self).__init__(*args,**kwargs)

        self.fields["productType"].widget = TextInput(
            attrs={
                "id":"productType",
                "class":"form-control",
                "placeholder":"Enter a product"
            }
        )

class AddProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ["productName","prize","productType"]

    def __init__(self,*args,**kwargs):
        super(AddProductForm,self).__init__(*args,**kwargs)

        self.fields["productName"].widget = TextInput(
            attrs={
                "id":"product-name",
                "class":"form-control",
                "placeholder":"Enter a product name",
            }
        )

        self.fields["prize"].widget = NumberInput(
            attrs={
                "id":"product-prize",
                "class":"form-control",
                "placeholder":"Enter the prize",
            }
        )

  