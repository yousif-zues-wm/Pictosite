/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



var gcloud = require('gcloud');

// Authorizing on a per-API-basis. You don't need to do this if you auth on a
// global basis (see Authorization section above).

var vision = gcloud.vision({
  projectId: 'my-project',
  keyFilename: 'api/controllers/My Project-973f05b1c66a.json'
});


// https://i.imgur.com/454S8h9.jpg

module.exports = {
	index: function(req, res){
		vision.detectText('https://i.imgur.com/454S8h9.jpg', function(err, text, apiResponse) {
			if (err) {
				return console.log(err);
			}
			console.log({ text: text, apiResponse: apiResponse });
});
	}
};
