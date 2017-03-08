import flask
import json
import librosa as lr
import os
import sys

from flask import request

app = flask.Flask(__name__)

files = lr.util.find_files('./static/data')
for i, file in enumerate(files):
    files[i] = os.path.basename(file)

labels = [
    'accordion',
    'bassoon',
    'clarinet',
    'guitar',
    'perc',
    'piano',
    'saxophone',
    'violin',
    'vocals',
    'whistle',
    'inaudible'
]

if len(sys.argv) > 1:
    current = sys.argv[1]
else:
    current = 0


@app.route('/')
def hello():
    return flask.render_template('index.html',
                                 files=json.dumps(files),
                                 labels=json.dumps(labels),
                                 current=current)


@app.route('/filenames')
def get_filenames():
    return flask.jsonify(files)


@app.route('/labels')
def get_labels():
    return flask.jsonify(labels)


@app.route('/newlabel', methods=['POST'])
def handle_new_label():
    r = request.get_json(force=True)
    with open('./result.csv', 'a') as f:
        f.write(f"{r['filename']}, {r['label']}\n")
    global current
    current += 1
    return json.dumps({'current': current}), 200


if __name__ == '__main__':
    app.run()

