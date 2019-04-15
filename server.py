from flask import Flask, render_template, send_from_directory
from flask import request
from music_gen import MusicGen

app = Flask(__name__) #root_path="templates/"
musicgen = MusicGen()

@app.route("/")
def index():
    return render_template("index.html", z0=musicgen.get_z()[0][0])

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/imgs/pianorolls/<path:path>')
def send_imgs_pianorolls(path):
    return send_from_directory('cvae/imgs', path)

# @app.route('/models/cvae.graybin_bce-imgs_2297-epch_60-100')
# def send_models(path):
#     return send_file('cvae/models/cvae.graybin_bce-imgs_2297-epch_60-100')

@app.route('/onchange', methods=["POST"])
def on_change_val():
    to_val = float(request.form["value"])
    print(request.form["value"], to_val)
    musicgen.update_z_i(0, to_val)
    return "TODO"

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080)