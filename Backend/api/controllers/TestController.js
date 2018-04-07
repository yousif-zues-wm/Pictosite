var vision = require('@google-cloud/vision');
var cloud = require('google-cloud')

const client = new vision.ImageAnnotatorClient();

/**
* TODO(developer): Uncomment the following line before running the sample.
*/

// Read a local image as a text document

// https://i.imgur.com/454S8h9.jpg
module.exports = {
index: function(req, res){
  res.view()
},
upload: function(req, res){
  if (!req.file) {
    return res.redirect('/test')
  }
  else{
    req.file('img').upload({
      maxBytes: 10000000
},function whenDone(err, uploadedFiles) {
  if (err) {
    return res.serverError(err);
  }
  res.redirect('/vision?file=' + uploadedFiles)

    })

  }
},
vision: function(req, res){
  var fileName = '';

  req.file('img').upload({
    maxBytes: 10000000
},function whenDone(err, uploadedFiles) {
if (err) {
  return res.serverError(err);
}
fileName = uploadedFiles

  })



      client
       .documentTextDetection(fileName)
       .then(results => {
         const fullTextAnnotation = results[0].fullTextAnnotation;
         console.log(fullTextAnnotation.text);
         res.view({text: fullTextAnnotation.text})
       })
       .catch(err => {
         console.error('ERROR:', err);
       });
}

};
