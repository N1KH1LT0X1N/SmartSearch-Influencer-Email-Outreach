from flask import Flask, render_template, session, flash, request

app = Flask(__name__, template_folder='templates')


@app.route('/')
def index():
    return render_template('hero.html') # this will be hero next

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == 'admin' and password == 'admin':
            flash("Logged in Successfully")
            return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)