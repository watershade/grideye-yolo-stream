import csv
import json
import time

import numpy as np
from flask import Flask, render_template

from flask_sockets import Sockets

app = Flask(__name__, static_url_path='')
app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True
sockets = Sockets(app)


data_frames = []
inital_frame = [
0, 0, 0, 35, 35, 0, 0, 0,
0, 0, 35, 0, 0, 35, 0, 0,
0, 0, 0, 0, 0, 35, 0, 0,
0, 0, 0, 0, 35, 0, 0, 0,
0, 0, 0, 35, 0, 0, 0, 0,
0, 0, 0, 35, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 35, 0, 0, 0, 0
];

@sockets.route('/recv_data')
def data_socket(ws):
    while not ws.closed:
        data_frames.append(ws.receive())

@sockets.route('/serve_data')
def qa_socket(ws):
    ws.send(json.dumps(inital_frame))
    while not ws.closed:
        with open('training-Thermal.csv') as f:
            for frame in csv.reader(f):
                ws.send(json.dumps(list(map(float, np.reshape(frame, (8,8))))))
                time.sleep(0.5)


@app.route('/')
def hello():
    return render_template('bvn.html')


if __name__ == "__main__":
    # TODO understand where gevent fits into the whole picture
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    port = 8585
    server = pywsgi.WSGIServer(('', port), app, handler_class=WebSocketHandler)
    # server = pywsgi.WSGIServer(('', 8585), app, handler_class=WebSocketHandler, keyfile='./server.key', certfile='./server.crt')
    print("serving on http://localhost:{}".format(port))
    server.serve_forever()
