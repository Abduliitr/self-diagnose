import flask
from flask import Flask, render_template, Response, request, jsonify
from final_code import result
from flask_cors import CORS
app = flask.Flask(__name__)
app.config["DEBUG"] = True

CORS(app)
@app.route('/api/v1/symptoms', methods = ['POST'])
def english_to_isl():
    content = request.json['symptoms']
    #print(content)
    if content is None:
        return jsonify("Text not received")
    else:
        diseases = result(content)
        return jsonify(diseases)


app.run()
