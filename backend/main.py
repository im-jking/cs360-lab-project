#***cs360-lab fastapi***
from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import os
import shutil

app = FastAPI()

origins = [
    # "http://localhost:5173",
    # "https://localhost:5173",
    # "http://127.0.0.1:5173", 
    # "https://127.0.0.1:5173"
    # "http://localhost:80",
    # "https://localhost:80",
    # "http://127.0.0.1:80", 
    # "https://127.0.0.1:80"
    # "http://cs360-lab-project:80"
    # "https://cs360-lab-project:80"
    "http://cs360-lab-project-production.up.railway.app"
    "https://cs360-lab-project-production.up.railway.app"
    "http://cs360-lab-project-production.up.railway.app:*"
    "https://cs360-lab-project-production.up.railway.app:*"
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
    host="mysql.railway.internal",
    user="root",
    password="wNHVevLzAKAKXOVbxHFHDhgrDfIXVwTA",
    # user="root",
    # password="360classproj",
    database="railway"
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
        INSERT INTO products (title, description, price, in_stock, imageURL, category)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (product.title, product.description, product.price, product.in_stock, product.imageURL, product.category))
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

def list_orders(user_email: str | None = None):
    if user_email is None:
        cursor.execute("SELECT * FROM orders")
    else:
        cursor.execute(f"SELECT * FROM orders WHERE orders.purchaser_email=\"{user_email}\"")
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
    category: str | None

class Order(BaseModel):
    order_id: int | None = None
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

@app.options("/products")
def handle_options(request: Request):
    # response = Response()
    # response.headers["Access-Control-Allow-Origin"] = "*"
    # response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    # response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    # response.status_code = 200
    # return response
    return {"message": "Options handled"}

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

@app.get("/orders/{user_email}")
def get_orders_user(user_email: str):
    return list_orders(user_email)

@app.post("/one_user")
def login(user: User):
    cursor.execute("SELECT * FROM users WHERE users.email=%s AND users.password=%s", (user.email, user.password))
    result = cursor.fetchall()
    if len(result) == 1:
        return result
    else:
        return None

UPLOAD_DIR = "uploaded_images"  # Directory to save uploaded files
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Create the directory if it doesn't exist

@app.post("/add_image")
def add_image(file: UploadFile = File(...)):
    try:
        # Define the file path where the file will be saved
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save the file to the specified directory
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {"message": "File uploaded successfully", "file_path": file_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")
    
@app.get("/get_image/{image}")
def get_image(image: str):
    try:
        file_path = os.path.join(UPLOAD_DIR, image)

        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        
        return FileResponse(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving file: {str(e)}")
