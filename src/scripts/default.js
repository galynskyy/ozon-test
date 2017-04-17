var PostModule = (function() {
	var _init = function() {
		_loadPosts();
	}

	var _eventListeners = function() {
		var checkboxes = document.querySelectorAll(".like__checkbox");
		checkboxes.forEach(function(item, i, arr) {
			item.addEventListener("click", _handleCheckbox);
		});
	}

	var _handleCheckbox = function(event) {
		alert(event.target.id);
	}

	var _getData = function() {
		var xhr = new XMLHttpRequest();

      	xhr.open("GET", "data/instagram.json", false);
      	xhr.send();

      	if (xhr.status != 200) {
        	alert("Ошибка " + xhr.status + ": " + xhr.statusText);
      	} else {
        	return JSON.parse(xhr.responseText);
      	}
	}

	var _loadPosts = function() {
		var dataPosts = _getData();
		var templateContainer = document.getElementById("templatePost");

		for(var i = 0; i < dataPosts.data.length; i++) {
			var newPost = templateContainer.content.querySelector(".post").cloneNode(true);
			newPost.querySelector(".post__image").setAttribute("src", dataPosts.data[i].images.standard_resolution.url);
			newPost.querySelector(".user__ava").setAttribute("src", dataPosts.data[i].user.profile_picture);
			newPost.querySelector(".user__login").innerText = dataPosts.data[i].user.username;
			if(dataPosts.data[i].location) {
				newPost.querySelector(".post__location").innerText = dataPosts.data[i].location.name;
			}
			var date = new Date(dataPosts.data[i].created_time * 1000);
			newPost.querySelector(".post__time").innerText = date.getHours() + "h";
			newPost.querySelector(".like__label").innerText = dataPosts.data[i].likes.count;
			newPost.querySelector(".like__label").setAttribute("for", dataPosts.data[i].id);
			newPost.querySelector(".like__checkbox").setAttribute("id", dataPosts.data[i].id);
			if(dataPosts.data[i].caption) {
				newPost.querySelector(".post__text").innerText = dataPosts.data[i].caption.text;
			}

			templateContainer.appendChild(newPost);
		}
		_eventListeners();
	}

	return {
		init: _init
	};

})();

PostModule.init();