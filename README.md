# 🛒 E-Commerce Web Application

This project is a full-stack e-commerce web application designed to simulate a modern online shopping experience.
It includes user authentication, product browsing, cart management, order processing, and inventory tracking.

The goal of this project is to design a scalable architecture using Angular on the frontend and a backend server (Node/Express planned) with a relational database.

## 🚀 Features

✔️ User registration & login                                                                                                                                                                                         
✔️ Product listing & searching                                                                                                                                                                                       
✔️ Shopping cart system                                                                                                                                                                                      
✔️ Order placement & history                                                                                                                                                                                      
✔️ Inventory tracking                                                                                                                                                                                      
✔️ Database relationships (including many-to-many)

## 🧱 System Architecture
Layer	Technology	Purpose
Frontend	Angular	UI, routing, forms, components
Backend	Node.js + Express (planned)	API, authentication, business logic
Database	MySQL	Persistent storage for users, products, orders, inventory, etc.
📦 Database Schema

This project contains five core tables to support all major features:

Table	Purpose
users	Stores user account info
products	Catalog of items available for sale
cart	Represents a user’s active shopping cart (1 open cart per user)
cart_items	Items inside a user’s cart (many-to-many: users ⇄ products through cart)
orders	Tracks completed checkouts
order_items	Stores purchased products per order
product_categories (optional many-to-many)	Connects products to multiple category tags
🗂️ Order & Order Items Flow

🛠️ Setup Instructions

Backend setup coming soon — frontend installation available.

# Clone the repo
git clone https://github.com/<USERNAME>/<REPO-NAME>

# Install dependencies
cd project-folder
npm install

# Run the development server
ng serve


# 👤 Author

Shen (Netanel)
Software Engineering Student, learning Angular, databases, and full-stack development in a real project.
