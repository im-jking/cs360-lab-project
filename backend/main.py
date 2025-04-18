#***cs360-lab fastapi***
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="labuser",
    password="CS360_Project",
    database="shopdb"
)

cursor = db.cursor(dictionary=True)

def add_user(email, password, funds=0, is_admin=False):
    cursor.execute("""
        INSERT INTO users (email, password, funds, is_admin)
        VALUES (%s, %s, %s, %s)
    """, (email, password, funds, is_admin))
    db.commit()

def add_product(product):

    cursor.execute("""
        INSERT INTO products (title, description, price, in_stock, imageURL)
        VALUES (%s, %s, %s, %s)
    """, (product.title, product.description, product.price, product.in_stock, product.imageURL))
    db.commit()

def place_order(email, product_id):
    cursor.execute("""
        INSERT INTO orders (purchaser_email, product_id)
        VALUES (%s, %s)
    """, (email, product_id))
    db.commit()

def list_users():
    cursor.execute("SELECT * FROM users")
    return cursor.fetchall()

def list_products():
    cursor.execute("SELECT * FROM products")
    return cursor.fetchall()

def list_orders():
    cursor.execute("SELECT * FROM orders")
    return cursor.fetchall()

class User(BaseModel):
    email: str
    password: str
    funds: int = 0
    is_admin: bool = False

class Product(BaseModel):
    title: str
    description: str
    price: int
    in_stock: int
    id: int | None
    imageURL: str | None

class Order(BaseModel):
    purchaser_email: str
    product_id: int

# FastAPI routes
@app.post("/users")
def create_user(user: User):
    try:
        add_user(user.email, user.password, user.funds, user.is_admin)
        return {"message": "User created"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/users")
def get_users():
    return list_users()

@app.post("/products")
def create_product(product: Product):
    try:
        add_product(product)
        return {"message": "Product created"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/products")
def get_products():
    return list_products()

@app.post("/orders")
def create_order(order: Order):
    try:
        place_order(order.purchaser_email, order.product_id)
        return {"message": "Order placed"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/orders")
def get_orders():
    return list_orders()

@app.post("/one_user")
def login(user: User):
    cursor.execute("SELECT * FROM users WHERE users.email=%s AND users.password=%s", (user.email, user.password))
    result = cursor.fetchall()
    if len(result) == 1:
        return result
    else:
        return None