# AI_Voice-to-Text_Summarization

<h1>Instructions</h1>


<h2>
  <i>Backend Side</i>
</h2>

<p>IMPORTANT! Navigate to API directory before installing backend dependencies</p>

```bash 
$ cd api
```

<p>Set up virtual environment (OPTIONAL)</p>

```bash 
$ python -m venv venv (you may need to use python3 instead)
$ source venv/bin/activate (or .\venv\Scripts\activate on Windows)
```
<p>Install dependencies</p>

```bash 
$ pip install -r requirements.txt
```
<p>Run app</p>

```bash
$ flask --app app --debug run (running python app.py can also work)
```
#### The back-end server will run on `http://localhost:4000`

<h2>
  <i>Frontend Side</i>
</h2>

<p>If you are currently in the api directory</p>

```bash 
$ cd ..
```
<p>Navigate to frontend</p>

```bash 
$ cd frontend
```

<p>Install package.json dependencies</p>

```bash 
$ npm i
```

<p>Run React App</p>

```bash 
$ npm start
```

#### The front-end will be accessible in your web browser at `http://localhost:3000`
