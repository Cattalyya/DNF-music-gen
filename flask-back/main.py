from flask import Flask, render_template, send_from_directory
from flask import request
# from music_gen import MusicGen
app = Flask("__main__")

@app.route("/")
def my_index():
    return render_template("index.html", token="Hello Flask")


@app.route('/imgs/pianorolls/<path:path>')
def send_imgs_pianorolls(path):
    return send_from_directory('../cvae/imgs', path)

app.run(debug=True)