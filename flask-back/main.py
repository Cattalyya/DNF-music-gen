from flask import Flask, render_template, send_from_directory
from flask import request
from music_gen import MusicGen
app = Flask("__main__")
musicgen = MusicGen()

@app.route("/")
def my_index():
    return render_template("index.html", z0="0.4")
    
@app.route('/imgs/pianorolls/<path:path>')
def send_imgs_pianorolls(path):
    return send_from_directory('cvae/imgs', path)

@app.route('/onchange', methods=["POST"])
def on_change_val():
    to_val = float(request.form["value"])
    print(request.form["value"], to_val)
    musicgen.update_z_i(0, to_val)
    return "TODO"

app.run(debug=True)