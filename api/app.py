from flask import Flask, render_template, request
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
@app.route('/hello', methods=['GET'])
def hello():
    return "Hello World"

@app.route('/upload', methods=['POST'])
def upload():
    form = UploadForm()
    if form.validate_on_submit():
        audio_file = form.audio.data
        print('File received: ', audio_file.filename)

        ##################################
        # Transcribe and Summarize the file here
        ##################################
        
        return 'File Uploaded Successfully'
    return render_template('upload.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)
