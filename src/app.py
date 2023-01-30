from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
cors = CORS(app,resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})


# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)



# Product Class/Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    email = db.Column(db.String(200))

    def __init__(self, account, password, email):
        self.account = account
        self.password = password
        self.email = email
    

# Product Schema
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id','account','password','email')

# Init schema
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
app.app_context().push()


@app.route('/')
def helloworld():
    return 'hello world!'

# Create a Product
@app.route('/product', methods=['POST'])
def add_product():
    account = request.json['account']
    password = request.json['password']
    email = request.json['email']
    

    new_product = Product(account, password, email)

    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)


# Get all Product
@app.route('/product', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    #print(all_products)
    return jsonify(result)


# Get single Product
@app.route('/product/<id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    return product_schema.jsonify(product)


# Update a Product
@app.route('/product/<id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)

    account = request.json['account']
    password = request.json['password']
    email = request.json['email']

    product.account = account
    product.password = password
    product.email = email
    

    db.session.commit()
    return product_schema.jsonify(product)


#Patch a Product
@app.route('/product/<id>', methods=['PATCH'])
def patch_product(id):
    product = Product.query.get(id)
    
    try:
        password = request.json['password']
        product.password = password
    
    except:
        email = request.json['email']
        product.email = email

    db.session.commit()
    return product_schema.jsonify(product)
    
    




# Delete Product
@app.route('/product/<id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return product_schema.jsonify(product)




   

# Run Server
if __name__ ==  '__main__':
    app.run(debug=True)

