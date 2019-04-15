from flask import Flask, render_template, send_from_directory
app = Flask(__name__) #root_path="templates/"

@app.route("/")
def index():
    return render_template("index.html", name="TODO")


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080)