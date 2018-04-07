var vision = require('@google-cloud/vision');
var cloud = require('google-cloud')
var fs = require('fs')
var formidable = require('formidable');
var path = require('path');

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


  var form = new formidable.IncomingForm();

   // specify that we want to allow the user to upload multiple files in a single request
   form.multiples = true;

   // store all uploads in the /uploads directory
   form.uploadDir = path.join(__dirname, '/uploads');

   // every time a file has been uploaded successfully,
   // rename it to it's orignal name
   form.on('file', function(field, file) {
     fs.rename(file.path, path.join(form.uploadDir, file.name));
   });

   // log any errors that occur
   form.on('error', function(err) {
     console.log('An error has occured: \n' + err);
   });

   // once all the files have been uploaded, send a response to the client
   form.on('end', function(file) {
     res.send({'success': file});
   });

   // parse the incoming request containing the form data
   console.log(form.parse(req).data);



  //
  //
  //
  //
  // console.log(req.body);
  // if (!req.files) {
  //   return res.serverError('Error')
  // }
  // else{
  //   Image.create(req.body).exec(function(err, file){
  //     if (err) {
  //       return res.serverError(err)
  //     }
  //     res.send({file: file})
  //   })
  // }
},
vision: function(req, res){

  Image.findOne({'id': req.param('id')}).exec(function(err, img){
    if (err) {
      return res.serverError(err)
    }
    console.log(img);
    var fileName = img;

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
  })





},
test: function(req, res){
  res.send(req.params.all())
}

};
