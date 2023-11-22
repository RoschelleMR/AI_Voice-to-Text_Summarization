import whisper

model = whisper.load_model('base')
result = model.transcribe('marques.m4a', fp16=False)

with open('transcription.txt', 'w') as f:
    f.write(result['text'])
    
print('transcipt complete')