from flask import Flask, render_template, request, jsonify
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms.validators import DataRequired


app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRETKEY'  # Replace with a real secret key

class UploadForm(FlaskForm):
    audio = FileField('Audio', validators=[
        DataRequired(),
        FileRequired(),
        FileAllowed(['mp3', 'wav', 'ogg'], 'Audio Files Only (.mp3, .wav, .ogg)!')
    ])


#To test if API is working
@app.route('/')
def index():
    return "Hello World"

#Checking if sending JSON works
@app.route('/json', methods=['GET'])
def jsontest():
    return jsonify(message="This is a JSON message")


@app.route('/upload', methods=['POST'])
def upload():
    form = UploadForm()
    if form.validate_on_submit():
        audio_file = form.audio.data
        print('File received: ', audio_file.filename)

        ##################################
        # Transcribe and Summarize the file here
        ##################################
        
        data = {
            "transcription": "This is the transcription", # Don't know if you want to send the raw transcription as well
            "summary": "This is the summary"
        }

        return jsonify(data)
    
    else:
        formErrors = form_errors(form)
        
        errors = {
            "errors": formErrors
        }
        return jsonify(errors)

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


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)
