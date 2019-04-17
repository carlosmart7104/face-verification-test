var face_a = document.getElementById('face_a');
var face_b = document.getElementById('face_b');
var select_a = document.getElementById('select_a');
var select_b = document.getElementById('select_b');
var face_id = null;
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
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
function option_clicked(el) {
	face_id = el.target.getAttribute('name');
}
function load_options(el, options) {
	options.forEach(function (item, index) {
		var option = document.createElement('option');
		option.setAttribute('name', item.label);
		option.setAttribute('value', item.value);
		option.onclick = option_clicked;
		option.text = item.name;
		el.appendChild(option);
		index == 1 ? eventFire(option, 'click'): null;
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
function match() {
	if (face_a.src.length > 0 && face_b.src.length > 0) {
		loading(true);
		response.clear();
		fetch('/api/match', {
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
function verify() {
	if (face_a.src.length > 0) {
		loading(true);
		response.clear();
		fetch('/api/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				threshold: 0.5,
				label: face_id,
				image: face_a.src,
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
async function start() {
	loading(false);

	// load a
	await load_options(select_a, images_list);
	select_a.value = images_list[1].value;
	eventFire(select_a, 'change');

	// load b
	await load_options(select_b, images_list);
	select_b.value = images_list[1].value;
	eventFire(select_b, 'change');
}
start();