var face_a = document.getElementById('face_a');
var face_b = document.getElementById('face_b');
var select_a = document.getElementById('select_a');
var select_b = document.getElementById('select_b');
var button = document.getElementById('verify');
var loadLabel = document.getElementById('loading');
var res = document.getElementById('response');
function imgTobase64(img) {
	var canvas = document.createElement('canvas');
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL();
}
function load_options(el, options) {
	options.forEach(function (item, index) {
		var option = document.createElement('option');
		index === 1 ? option.setAttribute('selected', true) : null;
		option.setAttribute('value', item.value);
		option.text = item.name;
		el.appendChild(option);
	});
}
function select(el, val) {
	if (el.id.includes('_a')) {
		face_a.src = val;
	}
	if (el.id.includes('_b')) {
		face_b.src = val;
	}
}
function loading(isLoading) {
	var display = isLoading ? 'block' : 'none';
	loadLabel.style.display = display;
}
var response = {
	log: function(data) {
		res.innerHTML = JSON.stringify(data, undefined, 2);
	},
	clear: function () {
		res.innerHTML = null;
	}
};
function verify() {
	if (face_a.src.length > 0 && face_b.src.length > 0) {
		loading(true);
		response.clear();
		fetch('/api/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				threshold: 0.5,
				a: face_a.src,
				b: face_b.src
			})
		})
			.then(function (res) {
				res.json()
					.then(function (data) {
						loading(false);
						response.log(data);
					})
					.catch(function (err) {
						loading(false);
						console.log(err);
					});
			})
			.catch(function (err) {
				loading(false);
				console.log(err);
			});
	}
}
function start() {
	loading(false);
	load_options(select_a, images_list);
	load_options(select_b, images_list);
}
start();