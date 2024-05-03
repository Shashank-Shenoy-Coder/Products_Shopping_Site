// Modal Code
const dialog = document.querySelector('dialog')
const showButton = document.querySelector('dialog + button')
const closeButton = document.querySelector('dialog i')

showButton.addEventListener("click", () => {
    dialog.showModal()
})

closeButton.addEventListener("click", () => {
    dialog.close()
})

// Angular JS 
var productApp = angular.module("productApp", [])

productApp.service("productAppService", function () {
    this.createNewProduct = function (productName, productCost) {
        var productId = 0;
        var newProduct = {
            id: ++productId,
            name: productName,
            cost: productCost,
            units: 1
        }
        return newProduct;
    };
})

productApp.filter("cartTotalCost", function (productAppService) 
{
    return function (cartProducts) 
    {
            return cartProducts.reduce(function (totalCost, product) {
                return totalCost+=product.units*product.cost;
            },0);
    };
})

productApp.controller("productAppController", function ($scope, productAppService) {
    $scope.products = [];
    $scope.cartProducts = [];

    $scope.onAddProduct = function (productName, productCost) {
        var idx = $scope.products.findIndex(item => item.name === productName);
        if (idx >= 0)
            alert(`${productName} has already been added`);
        else {
            var newProduct = productAppService.createNewProduct(productName, productCost)
            $scope.products.push(newProduct);
        }
    };

    $scope.addToCart = function (product) {
        if ($scope.cartProducts.includes(product))
            alert(`${product.name} Already Present In Cart`)
        else
            $scope.cartProducts.push(product)
    };

    $scope.removeFromCart = function (product) {
        if ($scope.cartProducts.includes(product)) {
            var index = $scope.cartProducts.indexOf(product)
            $scope.cartProducts.splice(index, 1)
        }
        else
            alert('Error In Removing Product From Cart')
    }
})