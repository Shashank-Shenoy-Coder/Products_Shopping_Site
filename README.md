# Products_Shopping_Site
This repository contains all the relevant code to run the Products Shopping Site

# Setup 
- Clone the repository by using the command: git clone url (Url can be obtained by clicking on Code, and under the HTTPS section select copy url to clipboard).
- Once the repository is cloned, you can open that folder in an editor and view or modify the code.
- You would also require to install json-server. First go to the folder in which you cloned the repository and type the command npm install -g json-server@version_number
- If you don't have npm installed, do install it before running the above command.
- While installing json-server, I have mentioned the version number because there are some problems in auto incrementing id values. Its better to install 0.17.4 version which is a stable version.
- To check whether json-server has installed correctly or if you want to check the version, type this command: json-server --version
- Once everything has been setup properly, you can run the server by typing the command: json-server --watch filename.json 
- In our case the filename is db.json
- This will give us a link in the form: http://localhost:3000/products
- Then you will see a list of products that are stored in the server
- To run and see the website, make sure to install the live server or live preview extension if you are using Visual Studio Code Editor.

# Basic Information
- As soon as you load up the website, the stored products list will be visible under products information section.
- You can add your own product information by adding the prdouct details from the form where you can enter the name and unit cost of the product.
- Once added, the product will be added to the server and then fetched from the server and rendered on your screen.
- You can also remove the product that you have added by clicking the button of that respective product card. This will also update it in the server and get rendered on your screen.
- You can add products to the shopping cart and also change the units to see the total cost of all the products that are added to the cart.
- You can also remove the products from the cart.
- Finally you can perform searching of the products and also search by either the name or cost of the product.

# Languages Used
- HTML and CSS to give the structure and styling to the page
- Javascript and AngularJS to handle the user interactions and page behaviour
