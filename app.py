from flask import Flask, render_template, jsonify, request
import random
app = Flask(__name__)
templates = [
    {
        'inputs' : 6,
        'category' : 'Food',
        'word' : 'Orange'
    },
    {
        'inputs' : 7,
        'category' : 'Animals',
        'word' : 'Dolphin'
    }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-template')
def get_template():
    return jsonify({
        'status':'success',
        'word': random.choice(templates)
    })

app.run()