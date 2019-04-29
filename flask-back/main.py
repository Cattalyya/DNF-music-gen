from flask import Flask, render_template, send_from_directory, jsonify
from flask import request
from music_gen import MusicGen
app = Flask("__main__")
musicgen = MusicGen()

@app.route("/")
def index():
    default_z_arr_str = list(musicgen.get_z())
    print("Default Z: ", default_z_arr_str)
    return render_template("index.html", zs=default_z_arr_str, z_dim=musicgen.z_dim)

# obtain static pianoroll image
@app.route('/imgs/pianorolls/<path:path>')
def send_imgs_pianorolls(path):
    return send_from_directory('cvae/imgs', path)


'''
Listener of Interactive Input 

Whenever z, p, or t changes, call these POST requests to update value in musicgen
currently music gen will update value and predict new piano roll to imgs/current.png

Z is latent space vector in CVAE model
P, T are variables of Hilbert curve model
'''

@app.route('/onchangeZ', methods=["POST"])
def on_change_z():
    to_val = float(request.form["value"]);
    z_id = int(request.form["z_id"])
    print("Update: z[{}]={}".format(z_id, to_val))
    musicgen.update_z_i(z_id, to_val)

    return jsonify()

@app.route('/onchangeP', methods=["POST"])
def on_change_p():
    # Suggested TODO: handle bad value of P such as P < 0
    to_val = int(request.form["value"]);
    stepsize = musicgen.update_p(to_val)
    print("Update: p={}, stepsize={}".format(to_val, stepsize))

    data = jsonify(
        stepsize=stepsize,
    )
    return data

@app.route('/onchangeT', methods=["POST"])
def on_change_t():
    # Suggested TODO: handle bad value of T
    to_val = float(request.form["value"]);
    print("Update: t={}".format(to_val))
    musicgen.update_t(to_val)
    return jsonify()


app.run(debug=True)