-- INSERTS IN ROLE TABLE --
INSERT INTO delilah.roles (name, created_at, updated_at)
VALUES ("admin", NOW(), NOW());

INSERT INTO delilah.roles (name, created_at, updated_at)
VALUES ("user", NOW(), NOW());

-- INSERTS IN PAYMENT_METHOD TABLE --
INSERT INTO delilah.payment_methods (name, available, created_at, updated_at)
VALUES ("cash", 1, NOW(), NOW());

INSERT INTO delilah.payment_methods (name, available, created_at, updated_at)
VALUES ("credit card", 1, NOW(), NOW());

INSERT INTO delilah.payment_methods (name, available, created_at, updated_at)
VALUES ("wire transfer", 1, NOW(), NOW());

-- INSERTS IN USER TABLE --
INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("hmfarias", "Marcelo Farias","hmfarias7@gmail.com","+44 7777777777","Star Wars Attraction, Walt Disney World Resort, FL","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",1, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("queen_freddie", "Freddie Mercury","freddiemercury@gmail.com","+44 7712345678","Logan PIKensington, London W8 6DE, UK","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("jSmith", "John Smith","jsmith@gmail.com","+44 8812345678","TARDIST ST, 4242, Space 453, Gallifrey","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("brianM", "Brian May","brian47@gmail.com","+44 442345678","8236 Bohemian Street, Paddington, London","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("malin_quist", "Malin Quist","quistmalin@gmail.com","+44 332345678","246 Jeffrey Gateway","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("jordanna7", "Jordanna Kitchener","jordannak@gmail.com","+44 222345678","5157 Grady Ridge","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("sanders_best", "Ivan Sanders","ivan77@gmail.com","+44 112345678","81 Conrad Plain","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("magical_monica", "Monica Ribeiro","mribeiro@gmail.com","+44 992345678","98 Brendon Streets Suite 314","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("katie44", "Katie Love","lovek@gmail.com","+44 882345678","245 Turner Spring Apt. 010","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("ilya3", "Ilya Vasin","ilyav@gmail.com","+44 88865432","3955 Dejon Green Apt. 553","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("annaF", "Anna Fali","ianafali@gmail.com","+44 998765432","593 Dessie Manors","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("hashim55", "Hashim Briscam","briscamh@gmail.com","+44 778765432","4672 Davis Green","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("anton", "Anton Brownstein","brownanton@gmail.com","+44 668765432","6254 McDermott Trafficway","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("dayachi", "Daya Chitanis","chitanisdaya@gmail.com","+44 558765432","9178 Reinhold Island","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("cotimariano", "Constanza Mariano","cotim@gmail.com","+44 448765432","026 Harber Port","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

INSERT INTO delilah.users (username, name, email, phone, address, password, role_id, created_at, updated_at)
VALUES ("debiebarb", "Débora Barbosa","cotim@gmail.com","+44 338765432","713 Howe Crossing","$2a$10$2BJWazbfjw5lD9iFC7FJj.MF0BSOUlWvre8T7kOOVHjcJpFYoK5je",2, NOW(), NOW());

-- INSERTS IN PRODUCT TABLE --
INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Hamburguesa Clásica", 350, 1, "https://thumbs.dreamstime.com/b/big-grilled-chicken-burger-double-cutlet-cheese-wooden-background-side-view-close-up-208658240.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Sandwich Veggie", 310, 1, "https://cdn.veeg.co/app/uploads/2019/03/01221458/Veggie_Sandwich_WIth_Cashew_Parm_07_web_square.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Bagel de Salmon", 425, 1, "https://www.hola.com/imagenes/cocina/recetas/20200212160481/receta-bagel-semillas-salmon-queso-pepino/0-782-560/bagel-adobe-m.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Focaccia", 300, 1, "https://www.hola.com/imagenes/cocina/recetas/20210217184564/focaccia-casera-tomates-cherry/0-920-968/focaccia-m.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Sandwich Focaccia", 440, 1, "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/exps32635_SD1115060D49A_RMS.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Veggie Avocado", 340, 1, "https://www.thegardengrazer.com/wp-content/uploads/2017/05/avocado-sandwich-plate-75-500x500.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Cerveza Lata Stella Artois x 269cc", 70, 1, "https://d2r9epyceweg5n.cloudfront.net/stores/001/472/190/products/diseno-sin-titulo-2021-01-15t100952-6061-79ceaefef381389d3916107162507620-1024-1024.png", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Verde Veggie", 320, 1, "https://thumbs.dreamstime.com/z/bandeja-de-presentaci%C3%B3n-comida-vegana-vietnamita-pasteles-jud%C3%ADas-verdes-con-ensalada-vistas-la-tomate-y-salsa-plato-salado-para-159999085.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Coca Cola Classic 2L", 180, 1, "https://images.heb.com/is/image/HEBGrocery/001397056?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Sandwich de Queso", 268, 1, "https://bimbo-com-ar-assets.s3.amazonaws.com/s3fs-public/recetas/18.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Hamburguesa Especial", 251, 1, "https://drburgerny.com/wp-content/uploads/2019/10/gallery_image1-min.jpg", NOW(), NOW());

INSERT INTO delilah.products (name, price, available, image, created_at, updated_at)
VALUES ("Agua Mineral sin Gas 750 cc", 100, 1, "https://tusuper.com.ar/image/cache/catalog/P2020/Bebidas/Villavicencio-Aventura-min%20(1)-800x800.jpg", NOW(), NOW());

-- INSERTS IN ORDER and ORDER_HAS_PRODUCT TABLES --

-- Order 1
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 5 MINUTE), 1540, "delivered", 16, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (1, 4, 4, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (1, 6, 1, NOW(), NOW());

-- Order 2
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 7 MINUTE), 753, "delivered", 15, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (2, 11, 3, NOW(), NOW());

-- Order 3
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 8 MINUTE), 660, "cancelled", 14, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (3, 1, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (3, 2, 1, NOW(), NOW());

-- Order 4
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 10 MINUTE), 650, "sending", 13, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (4, 4, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (4, 1, 1, NOW(), NOW());

-- Order 5
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 13 MINUTE), 268, "sending", 12, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (5, 10, 1, NOW(), NOW());

-- Order 6
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 15 MINUTE), 1580, "sending", 11, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (6, 1, 4, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (6, 9, 1, NOW(), NOW());

-- Order 7
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 17 MINUTE), 1300, "preparing", 10, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (7, 1, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (7, 4, 2, NOW(), NOW());

-- Order 8
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 19 MINUTE), 735, "preparing", 9, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (8, 2, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (8,3, 1, NOW(), NOW());

-- Order 9
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 20 MINUTE), 600, "preparing", 8, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (9, 4, 2, NOW(), NOW());

-- Order 10
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 22 MINUTE), 660, "preparing", 7, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (10, 1, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (10, 2, 1, NOW(), NOW());

-- Order 11
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 24 MINUTE), 1085, "confirmed", 6, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (5, 1, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (11, 2, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (11, 3, 1, NOW(), NOW());

-- Order 12
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 25 MINUTE), 2500, "confirmed", 5, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (12, 1, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (12, 3, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (12, 8, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (12, 2, 1, NOW(), NOW());

-- Order 13
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 27 MINUTE), 320, "new", 4, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (13, 8, 1, NOW(), NOW());

-- Order 14
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 28 MINUTE), 2520, "new", 3, 2, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (14, 1, 6, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (14, 7, 6, NOW(), NOW());

-- Order 15
INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
VALUES (DATE_ADD(NOW(),INTERVAL 30 MINUTE), 660,"new", 2, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (15, 1, 1, NOW(), NOW());
INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
VALUES (15, 2, 1, NOW(), NOW());


-- Order 16 Para pruebas
-- INSERT INTO delilah.orders (date, total_price, status, user_id, payment_method_id, created_at, updated_at)
-- VALUES (DATE_ADD(NOW(),INTERVAL 3 MINUTE), 1500, "entregado", 17, 1, NOW(), NOW());
-- INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
-- VALUES (16, 1, 2, NOW(), NOW());
-- INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
-- VALUES (16, 4, 2, NOW(), NOW());
-- INSERT INTO delilah.orders_has_products (order_id, product_id, quantity, created_at, updated_at)
-- VALUES (16, 12, 2, NOW(), NOW());



