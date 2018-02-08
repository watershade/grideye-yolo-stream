var ws = new WebSocket("ws://" + window.location.hostname + ":9677/");

Plotly.d3.json('https://raw.githubusercontent.com/plotly/datasets/master/custom_heatmap_colorscale.json', function (figure) {
    Plotly.plot('graph', [{
        type: 'heatmap',
        z: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        zauto: false,
        zmin: 23,
        zmax: 27
    }], { height: 700, width: 700 })
})

ws.onopen = function (e){
    ws.send(JSON.stringify({'device': 'web'}))
}

ws.onmessage = function (e) {
    Plotly.update('graph', {
        z: [
            JSON.parse(e.data)
        ]
    }, [0])
};

// bump = function () {
//     ws.send("bump");
// };


// function openSocket(url) {
//     ws = new WebSocket(url);
//     // ws.binaryType = 'arraybuffer'; // default is 'blob'

//     ws.onopen = function() {
//         sessionStorage.echoServer = url;
//     };

//     ws.onclose = function() {
//         // log('close');
//     };

//     ws.onmessage = function(e) {
//         Plotly.update('graph', {
//             z: [
//                 JSON.parse(e.data)
//             ]
//         }, [0])
//         // log(e.data);
//     };

//     ws.onerror = function() {
//         log('error');
//     };
// }

// function closeSocket() {
//     log('closing');
//     ws.close();
// }

// function sendText() {
//     var message = document.getElementById('message').value;
//     // log('sending: ' + message);
//     ws.send(message);
//     document.getElementById('message').value = '';
// }

// $(document).ready(function () {
//     openSocket('ws://' + window.location.hostname + ':9677/');
// });
