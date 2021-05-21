const functions = require('firebase-functions');
const path = require('path');
const fs = require('fs');
const os = require('os');
const Speech = require('@google-cloud/speech');
const Busboy = require('busboy');
const GrammarBot = require('grammarbot');

const ENCODING = 'LINEAR16';
const SAMPLE_RATE_HERTZ = 41000;
const LANGUAGE = 'en-US';
const audioConfig = {
    encoding: ENCODING,
    sampleRateHertz: SAMPLE_RATE_HERTZ,
    languageCode: LANGUAGE,
    enableWordTimeOffsets: true
};

const bot = new GrammarBot({
    api_key: 'KS9C5N3Y',
    language: 'en-US',
    base_uri: 'api.grammarbot.io'
})


const convertToText = (file, config) => {
    const audio = {
        content: fs.readFileSync(file).toString('base64'),
    };
    let request;
    request = {
        config, audio
    }
    const speech = new Speech.SpeechClient();

    return speech.recognize(request).then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        console.log('Speech error:', error);
    })


    // return speech.recognize(request, function (err, response) {
    //     if (err) {
    //         console.log('Speech error:', err);
    //         return err;
    //     } else {
    //         return response;
    //     }
    // })
}

exports.checkGrammar = functions.region('asia-east2').https.onRequest((req, res) => {
    bot.check(req.body.Ans, function (err, response) {
        console.log("loop")
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("This is workng")
            // const data = response.json();
            // console.log("test1")
            // let offset = 0;
            // let length = 0;
            // let newText = "";
            // let cursor = 0;
            // let repls = [];
            // data["matches"].forEach(item => {
            //     offset = item["offset"];
            //     length = item["length"];
            //     if (cursor < offset) {
            //         newText = newText + ans.substring(cursor, offset);
            //         repls = item["replacements"];
            //         if (repls && Object.keys(repls).length > 0) {
            //             console.log(repls[0]['value']);
            //             incorrect++;
            //             newText = newText + repls[0]['value'];
            //         }
            //         cursor = offset + length;
            //     }
            // })
            // if (cursor < ans.length) {
            //     newText += ans.substring(cursor, ans.length);
            // }
            res.send(response);
        }
    });
})

exports.convertSpeechToText = functions.region('asia-east2').https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
    }

    const busboy = new Busboy({ headers: req.headers });
    const tmpdir = os.tmpdir();

    let tmpFilePath;
    let fileWritePromise;

    busboy.on('file', (fieldname, file, filename) => {
        const filepath = path.join(tmpdir, filename);
        tmpFilePath = filepath;

        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

        const promise = new Promise((resolve, reject) => {
            file.on('end', () => {
                writeStream.end();
            })
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
        fileWritePromise = promise;
    });

    busboy.on('finish', () => {
        fileWritePromise.then((value) => {
            convertToText(tmpFilePath, audioConfig).then((response) => {
                console.log(response);
                res.send(response);
                return response;
                // const transcript = response.result.results?.map(result =>
                //     result.alternatives[0].transcript).join('\n');
                // res.send({ transcript });
            }).catch(err => {
                console.log('error1:', err);
            })
            fs.unlinkSync(tmpFilePath);
            return value;
        }).catch(err => {
            console.log('Filwrite error:', err);
        });
    });
    busboy.end(req.rawBody);
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
