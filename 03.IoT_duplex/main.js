"use strict";
import v4 from 'aws-signature-v4';
import crypto from 'crypto';
import mqtt from 'mqtt';
import websocket from 'websocket-stream';

const AWS_ACCESS_KEY = 'AKIAJUKMUZELL6S4MMIA';
const AWS_SECRET_ACCESS_KEY = '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';
const AWS_IOT_ENDPOINT_HOST = 'a8jqdmlu0olhw.iot.us-east-2.amazonaws.com';
const MQTT_TOPIC = '/test/iot-pubsub-demo';

let client = null;;
addLogEntry('Hello World!');

document.getElementById('connect').addEventListener('click', () => {
    client = mqtt.connect(signed)
    
    
    
    new MqttClient(() => {
        var url = v4.createPresignedURL(
            'GET',
            AWS_IOT_ENDPOINT_HOST.toLowerCase(),
            '/mqtt',
            'iotdevicegateway',
            crypto.createHash('sha256').update('', 'utf8').digest('hex'),
            {
                'key': AWS_ACCESS_KEY,
                'secret': AWS_SECRET_ACCESS_KEY,
                'protocol': 'wss',
                'expires': 15
            }
        );

        addLogEntry('Connecting to URL: ' + url);
        return websocket(url, [ 'mqttv3.1' ]);
    });

    client.on('connect', () => {
        addLogEntry('Successfully connected to AWS IoT Broker!  :-)');
        client.subscribe(MQTT_TOPIC);
    });

    client.on('close', () => {
        addLogEntry('Failed to connect :-(');
        client.end();  // don't reconnect
        client = undefined;
    });

    client.on('message', (topic, message) => {
        addLogEntry('Incoming message: ' + message.toString());
    });
});

document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    addLogEntry('Outgoing message: ' + message);
    client.publish(MQTT_TOPIC, message);
});

function addLogEntry(info) {
    const newLogEntry = document.createElement('li');
    newLogEntry.textContent = '[' + (new Date()).toTimeString().slice(0, 8) + '] ' + info;

    const theLog = document.getElementById('the-log');
    theLog.insertBefore(newLogEntry, theLog.firstChild);
}