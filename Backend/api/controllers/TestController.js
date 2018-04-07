var vision = require('@google-cloud/vision');
var cloud = require('google-cloud')

const client = new vision.ImageAnnotatorClient();

/**
* TODO(developer): Uncomment the following line before running the sample.
*/
const fileName = 'https://i.imgur.com/454S8h9.jpg';

// Read a local image as a text document

// https://i.imgur.com/454S8h9.jpg
module.exports = {
index: function(req, res){
    client
     .documentTextDetection(fileName)
     .then(results => {
       const fullTextAnnotation = results[0].fullTextAnnotation;
       console.log(fullTextAnnotation.text);
     })
     .catch(err => {
       console.error('ERROR:', err);
     });
}
};
