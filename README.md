#  E-Commerce Web Application

This project is a full-stack e-commerce web application designed to simulate a modern online shopping experience.
It includes user authentication, product browsing, cart management, order processing, and inventory tracking.

The goal of this project is to design a scalable architecture using Angular on the frontend and a backend server (Node/Express planned) with a relational database.

##  Features

 User registration & login                                                                                                                                                                                         
 Product listing & searching                                                                                                                                                                                       
 Shopping cart system                                                                                                                                                                                      
 Order placement & history                                                                                                                                                                                      
 Inventory tracking                                                                                                                                                                                      
 Database relationships (including many-to-many)

##  System Architecture
Layer	Technology	Purpose
Frontend	Angular	UI, routing, forms, components
Backend	Node.js + Express (planned)	API, authentication, business logic
Database	MySQL	Persistent storage for users, products, orders, inventory, etc.
 Database Schema

This project contains five core tables to support all major features:

Table	Purpose
users	Stores user account info
products	Catalog of items available for sale
cart	Represents a user’s active shopping cart (1 open cart per user)
cart_items	Items inside a user’s cart (many-to-many: users ⇄ products through cart)
orders	Tracks completed checkouts
order_items	Stores purchased products per order
product_categories (optional many-to-many)	Connects products to multiple category tags
 Order & Order Items Flow

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/f50104a6-5d0a-41cf-b065-de7ae8387b41" />

<img width="1918" height="876" alt="image" src="https://github.com/user-attachments/assets/2f787478-3cb9-4162-a1e6-178a8e007906" />

<img width="1919" height="877" alt="image" src="https://github.com/user-attachments/assets/71d15295-428d-4655-a880-6021a49d3368" />

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/4d731b0f-b249-4b66-9e37-ee7143930829" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/8d3f6544-ba47-4f76-9d2c-feb21f03805a" />





# 👤 Author

Shen (Netanel)
Software Engineering Student, learning Angular, databases, and full-stack development in a real project.
