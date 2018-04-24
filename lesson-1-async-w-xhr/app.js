(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    // let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    const searchedForText = 'hippos';
		const unsplashRequest = new XMLHttpRequest();

		unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		unsplashRequest.onload = addImage;
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID edda38f84c5e15ebc855483a29401646a0e3cfd12a9472f2ab050a705da8a4c7');
		unsplashRequest.send();

		function addImage(){
			let htmlContent = '';
			const data = JSON.parse(this.responseText);

			if(data && data.results && data.results[0]){
				const firstImg = data.results[0];
				htmlContent = `<figure>
				<img src='${firstImg.urls.regular}'>
				<figcaption>'${searchedForText}' by '${firstImg.user.name}'</figcaption>
				<figure>
				`;

			}else {
				htmlContent = '<div class="error-no-image"> NO images available </div>';
			}
			responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		}

})();
