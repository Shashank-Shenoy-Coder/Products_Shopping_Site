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

productApp.service("productOperations", function (productApi) {

    this.createNewProduct = function (productName, productUnitCost) {
        var newProduct = {
            id: 0,
            name: productName,
            unitCost: productUnitCost,
            units: 1
        }
        return newProduct;
    };

    this.addProductToServer = function (productsList, productName, productUnitCost) {
        var idx = productsList.findIndex(item => item.name === productName);
        if (idx >= 0) {
            alert(`${productName} has already been added`);
        }
        else {
            var newProduct = this.createNewProduct(productName, productUnitCost)
            productApi.saveProduct(newProduct)
                .then(function (addedProduct) {
                    console.log(addedProduct)
                    productsList.push(addedProduct)
                })
        }
    };

    this.removeProductFromServer = function (productsList, product) {
        productApi.removeProduct(product)
            .then(function () {
                var indx = productsList.indexOf(product);
                productsList.splice(indx, 1)
            })
    };

    this.addProductToCart = function (cartProducts, product) {
        if (cartProducts.includes(product))
            alert(`${product.name} Already Present In Cart`)
        else
            cartProducts.push(product)
    };

    this.removeProductFromCart = function (cartProducts, product) {
        if (cartProducts.includes(product)) {
            var index = cartProducts.indexOf(product)
            cartProducts.splice(index, 1)
        }
        else
            alert('Error In Removing Product From Cart')
    };
})

productApp.filter("cartTotalCost", function () {
    return function (cartProducts) {
        return cartProducts.reduce(function (totalCost, product) {
            return totalCost += product.units * product.unitCost;
        }, 0);
    };
})

productApp.value('productServiceEndPoint', 'http://localhost:3000/products')

productApp.factory('productApi', function ($http, productServiceEndPoint) {
    function getProducts() {
        return $http.get(productServiceEndPoint)
            .then(function (response) {
                return response.data
            });
    }

    function saveProduct(productData) {
        if (productData.id === 0) {
            return $http.post(productServiceEndPoint, productData)
                .then(function (response) {
                    return response.data;
                });
        }
        else
            return $http.post(productServiceEndPoint + '/' + productData.id, productData)
                .then(function (response) {
                    return response.data;
                });
    }

    function removeProduct(product) {
        $http.delete(productServiceEndPoint + '/' + product.id)
            .then(function (response) {
                return response.data;
            });
    }

    return {
        getProducts: getProducts,
        saveProduct: saveProduct,
        removeProduct: removeProduct
    };
})

productApp.controller("productAppController", function ($scope, productOperations, productApi) {
    $scope.products = [];
    $scope.cartProducts = [];
    $scope.search = {}
    $scope.searchBy = '$';

    productApi.getProducts()
        .then(function (products) {
            $scope.products = products;
        })

    $scope.onAddProduct = function (productName, productUnitCost) {
        productOperations.addProductToServer($scope.products, productName, productUnitCost)
    };

    $scope.removeProduct = function (product) {
        productOperations.removeProductFromServer($scope.products, product)
    };

    $scope.addToCart = function (product) {
        productOperations.addProductToCart($scope.cartProducts, product)
    };

    $scope.removeFromCart = function (product) {
        productOperations.removeProductFromCart($scope.cartProducts, product)
    }

    // $scope.changeSearchValue = function(selectedValue)
    // {
    //     if(selectedValue == 'Product Name')
    //         {
    //             if(selectedValue == 'Product Cost')
    //                 console.log(selectedValue)
    //         }
    // }

    // $scope.searchProduct = function (name, cost) {
    //     if (name == 0 && cost == 0) {
    //         $scope.searchProduct.name = 1;
    //         $scope.searchProduct.cost = 1;
    //     }
    //     else if (name == 1 && cost == 0) {
    //         $scope.searchProduct.cost = 0;
    //     }
    //     else {
    //         $scope.searchProduct.name = 0;
    //     }
    // }
})