from flask import Flask, render_template, send_from_directory
from flask import request
from music_gen import MusicGen
app = Flask("__main__")
musicgen = MusicGen()

@app.route("/")
def index():
    default_z_arr_str = list(musicgen.get_z())
    print("Default Z: ", default_z_arr_str)
    return render_template("index.html", zs=default_z_arr_str)
    
@app.route('/imgs/pianorolls/<path:path>')
def send_imgs_pianorolls(path):
    return send_from_directory('cvae/imgs', path)

@app.route('/onchange', methods=["POST"])
def on_change_val():
    to_val = float(request.form["value"]);
    z_id = int(request.form["z_id"])
    print("Update: z[{}]={}".format(z_id, to_val))
    musicgen.update_z_i(z_id, to_val)
    return "TODO"

app.run(debug=True)