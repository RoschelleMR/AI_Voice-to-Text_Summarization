from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms.validators import DataRequired

import os
import whisper

from transformers import PegasusForConditionalGeneration, PegasusTokenizer
import torch

app = Flask(__name__)

CORS(app)

class UploadForm(FlaskForm):
    class Meta:
        csrf = False
        
    audio = FileField('audio', validators=[
        DataRequired(),
        FileRequired(),
        FileAllowed(['mp3', 'wav', 'ogg', 'm4a'], 'Audio Files Only (.mp3, .wav, .ogg, .m4a)!')
    ])


#To test if API is working
@app.route('/')
def index():
    return "Hello World"

#Checking if sending JSON works
@app.route('/api/json', methods=['GET'])
def jsontest():
    return jsonify(message="This is a JSON message")


@app.route('/api/upload', methods=['POST'])
@cross_origin()
def upload():
    form = UploadForm()
    if form.validate_on_submit():
        audio_file = form.audio.data
        print('File received: ', audio_file.filename)
        
        # Save audio file to folder
        audio_file.save(audio_file.filename)

        ### TRANSCRIBE CODE
        
        ### Load whisper model to transcribe file
        
        model = whisper.load_model('base')
        result = model.transcribe(audio_file.filename, fp16=False)
        print('This is the transciption: ',result['text'])

        ###
        ### Generate transcription text file
        ###
        
        with open('transcription.txt', 'w') as f:
            f.write(result['text'])
        
        data = {
            "transcription": result['text']
        }

        return jsonify(data)
    
    else:
        formErrors = form_errors(form)
        
        errors = {
            "errors": formErrors
        }
        return jsonify(errors), 400
    
# Code ot summarize data
@app.route('/api/summary', methods=['POST'])
def summarize():
    
    if request.method == 'POST':
        
        ### Receive json from request
        transcription_ = request.get_json()

        transcription_data = transcription_.get('transcription')
        print('transcription: ',transcription_data)
    
        ### Using pegasus model to summarize data
        
        model_name = "google/pegasus-cnn_dailymail"
        tokenizer = PegasusTokenizer.from_pretrained(model_name)

        device = "cuda" if torch.cuda.is_available() else "cpu"
        model = PegasusForConditionalGeneration.from_pretrained(model_name).to(device)
        
        ### Tokenizing text
        tokenized_text = tokenizer.encode(transcription_data, truncation=True, return_tensors='pt', max_length=512).to(device)
        summary_parsed = model.generate(tokenized_text, min_length = 30, max_length = 300)
        summary = tokenizer.decode(summary_parsed[0], skip_special_tokens=True)
        
        print('Summary: ',summary)
        
        # Generate summarization.txt file
        with open('summarization.txt', 'w') as f:
            f.write(summary)
        
        return jsonify(summary)


### Gets files to download
@app.route('/api/uploads/<filename>')
def getFile(filename):
    root_dir = os.getcwd()
    return send_from_directory(root_dir, filename, as_attachment=True)


# Function to collect form errors from Flask-WTF
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


# @app.errorhandler(404)
# def page_not_found(error):
#     """Custom 404 page."""
#     return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)
