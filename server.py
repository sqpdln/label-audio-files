import flask
import json
import librosa as lr
import os

from flask import request

app = flask.Flask(__name__)

files = lr.util.find_files('./static/data')
for i, file in enumerate(files):
    files[i] = os.path.basename(file)

labels = [
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

result = []


@app.route('/')
def hello():
    return flask.render_template('index.html',
                                 files=json.dumps(files),
                                 labels=json.dumps(labels))


@app.route('/filenames')
def get_filenames():
    return flask.jsonify(files)


@app.route('/labels')
def get_labels():
    return flask.jsonify(labels)


@app.route('/newlabel', methods=['POST'])
def handle_new_label():
    r = request.get_json(force=True)
    result.append((r['filename'], r['label']))
    return json.dumps({'success': True}), 200


if __name__ == '__main__':
    app.run()

