
from django.shortcuts import render,redirect
from django.http import JsonResponse
from num2words import num2words
from .models import ProductType,Product,Sales
from .forms import AddProductTypeForm,AddProductForm
import json

# sandy456

def homePage(request):
    return render(request,"homePage.html",None)

def invoicePage(request):
    return render(request,"invoicePage.html",None)

def  getProductTypes(request):
    productTypes = ProductType.objects.all()
    data = [i.productType for i in productTypes]
    return JsonResponse({"productTypes":data})

def getProducts(request):
    if request.method == "POST":
        selectedProductType = request.POST.get("value")
        print(selectedProductType)
        productId = ProductType.objects.get(productType=selectedProductType)
        query = Product.objects.filter(productType=productId)
        data = [i.productName for i in query]
        return JsonResponse({"product":data})
    
def addProductType(request):

    form = AddProductTypeForm()

    if request.method == "POST":
        form = AddProductTypeForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")

    return render(request,"addProductTypeform.html",{"form":form})

def addProduct(request):

    form = AddProductForm()

    if request.method == "POST":
        form = AddProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")
    
    return render(request,"addProductform.html",{"form":form})


def discountCalculator(MRP,discount):
    deduced_amt = discount * MRP/100
    return MRP - deduced_amt


def generateInvoiceData(request):

    final_data = []

    if request.method == "POST":

        dataset = request.POST.get("value")[1:-1].split("},")
        lastProduct = dataset[len(dataset) - 1]
        dataset = [json.loads(dataset[d] + "}") for d in range(len(dataset)) if d != len(dataset) -1]
        dataset.append(json.loads(lastProduct))
       
        name = request.POST.get("name")
        address = request.POST.get("address")
        shipping = request.POST.get("shipping")
        address = address.replace("\n"," ")

        final_data = [name,address,shipping]
        
        intercom = []
        total = 0

        for i in range(len(dataset)):
            productType,productName,quantity,discount = dataset[i]["productType"],dataset[i]["productName"],dataset[i]["quantity"],dataset[i]["discount"]
            productId = ProductType.objects.get(productType=productType)
            data = Product.objects.get(productType=productId,productName=productName)
            ptotal = float(data.prize) * float(quantity)            
            total += discountCalculator(ptotal,float(discount))
            intercom.append([i+1,productType,productName,quantity,data.prize,discountCalculator(ptotal,float(discount)),discount,ptotal])

        """
            itercom struct :-
                [
                    0 -> SN no.
                    1 - > productType
                    2 -> productName
                    3 -> quantity
                    4 -> prize
                    5 -> amount after discount
                    6 -> discount percentage
                    7 -> particular product's total cost
                ],
        """

        final_data.append(intercom)
        print(final_data)

        request.session["data"] = final_data
        request.session["total"] = total
        request.session["num_in_words"] = num2words(total,lang="en_IN")

        return JsonResponse({"data":final_data}) # this is of no use

   
def  generateInvoice(request):
    
    sales = Sales.objects.get(id=1)

    return render(request,"bill.html",
                                {"data":request.session["data"],
                                "total":request.session["total"],
                                "num_in_words":request.session["num_in_words"],
                                "saleNumber":sales.saleNumber})

def incrementSalesNumber(request):

    if request.method == "POST":
        if request.POST.get("code") == "200":
            sales = Sales.objects.get(id=1)
            sales.saleNumber = int(sales.saleNumber) + 1
            sales.save()
        
        return JsonResponse({"url":"/"})





