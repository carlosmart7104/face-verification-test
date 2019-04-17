var path = require('path');
var canvas = require('canvas');
var faceapi = require('face-api.js');
var db = require('./db');

console.log('People in db: ' + db.length);

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

function findItemsByLabel(label) {
	// search item by label
	return db.filter((item) => {
		return item.label == label;
	});
}

module.exports = {
	verify: function({ label, image, threshold }) {
		console.log('verify()');
		console.log(`label: ${label}`);
		return new Promise(function (resolve, reject) {
			const items = findItemsByLabel(label);
			const a = image;
			let b = null;
			if (items.length) {
				console.log(`label "${label}" exist`);
				b = items[0].value;
			} else {
				console.log('label not found');
				reject({
					message: 'label not found'
				});
			}
			if (!(typeof a === String && typeof b === String)) {
				canvas.loadImage(a)
					.then(function (image_a) {
						console.log('canvas.loadImage(a) success');
						canvas.loadImage(b)
							.then(function (image_b) {
								console.log('canvas.loadImage(b) success');
								faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, '/models'))
									.then(function () {
										console.log('loadModels success');
										faceapi.computeFaceDescriptor(image_a, new faceapi.TinyFaceDetectorOptions())
											.then(function (descriptor_a) {
												console.log('computeFaceDescriptor(a) success');
												faceapi.computeFaceDescriptor(image_b, new faceapi.TinyFaceDetectorOptions())
													.then(function (descriptor_b) {
														console.log('computeFaceDescriptor(b) success');
														var distance = faceapi.round(faceapi.euclideanDistance(descriptor_a, descriptor_b));
														var response = {
															threshold,
															distance,
															match: distance < threshold
														};
														console.log('response:');
														console.log(response);
														resolve(response);
														// resolve({ descriptor_a, descriptor_b });
													})
													.catch(function (error) {
														console.log('computeFaceDescriptor(b) error');
														console.log(error);
														reject(error);
													});
											})
											.catch(function (error) {
												console.log('computeFaceDescriptor(a) error');
												console.log(error);
												reject(error);
											});
									})
									.catch(function (error) {
										console.log('loadModels error');
										reject(error);
									});
							})
							.catch(function (error) {
								console.log('canvas.loadImage(b) error');
								reject(error);
							});
					})
					.catch(function (error) {
						console.log('canvas.loadImage(a) error');
						reject(error);
					});
			} else {
				reject({
					message: 'Null value'
				});
			}
		});
	},
	match: function({ a, b, threshold }) {
		console.log('match()');
		return new Promise(function (resolve, reject) {
			if (!(typeof a === String && typeof b === String)) {
				canvas.loadImage(a)
					.then(function (image_a) {
						console.log('canvas.loadImage(a) success');
						canvas.loadImage(b)
							.then(function (image_b) {
								console.log('canvas.loadImage(b) success');
								faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, '/models'))
									.then(function () {
										console.log('loadModels success');
										faceapi.computeFaceDescriptor(image_a, new faceapi.TinyFaceDetectorOptions())
											.then(function (descriptor_a) {
												console.log('computeFaceDescriptor(a) success');
												faceapi.computeFaceDescriptor(image_b, new faceapi.TinyFaceDetectorOptions())
													.then(function (descriptor_b) {
														console.log('computeFaceDescriptor(b) success');
														var distance = faceapi.round(faceapi.euclideanDistance(descriptor_a, descriptor_b));
														var response = {
															threshold,
															distance,
															match: distance < threshold
														};
														console.log('response:');
														console.log(response);
														resolve(response);
														// resolve({ descriptor_a, descriptor_b });
													})
													.catch(function (error) {
														console.log('computeFaceDescriptor(b) error');
														console.log(error);
														reject(error);
													});
											})
											.catch(function (error) {
												console.log('computeFaceDescriptor(a) error');
												console.log(error);
												reject(error);
											});
									})
									.catch(function (error) {
										console.log('loadModels error');
										reject(error);
									});
							})
							.catch(function (error) {
								console.log('canvas.loadImage(b) error');
								reject(error);
							});
					})
					.catch(function (error) {
						console.log('canvas.loadImage(a) error');
						reject(error);
					});
			} else {
				reject({
					message: 'Null value'
				});
			}
		});
	}
};