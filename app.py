from flask import Flask, render_template, session, flash, request, url_for, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_bcrypt import Bcrypt
from flask_cors import CORS


app = Flask(__name__, template_folder='templates')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///login-database.db'
app.config['SECRET_KEY'] = 'SOME KEY'

db = SQLAlchemy(app)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

@app.route('/')
def hero():
    return render_template('hero.html') # this will be hero next

@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template("login.html")
    elif request.method == 'POST':

        username = request.form.get('username')
        password = request.form.get('password')

        if username == 'admin' and password == "admin":  
            return redirect(url_for("dashboard"))
        else:
            return redirect(url_for('login'))



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)