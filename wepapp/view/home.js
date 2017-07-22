const findUser = '	   https://api.github.com/users/'
/*
Repositórios de um usuário: https://api.github.com/users/{username}/repos
Detalhes de um repositório: https://api.github.com/repos/{full_name}
'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';*/

let userName = null;
const searchInput = document.querySelector('.search');

function displayMatches() {
	let search = findUser + searchInput.value
fetch( search )
	.then(blob => blob.json())
  	.then(data => createProfile(data))
}

function createProfile( data ){
	if(data.message !== "Not Found"){
		userName= data.login
		var html = 
		`
			<img src=${data.avatar_url}></img>
			<label>name :
				<span>${data.name}</span>
			</label>
			<label>email :
				<span>${data.email}</span>
			</label>
			<label>folowers :
				<span>${data.bio}</span>
			</label>
			<label>bio :
				<span>${data.bio}</span>
			</label>
		`
		profile.innerHTML = html;
	}
	else
		alert('usuário não encontrado, tente novamente')
}


const profile = document.querySelector('.profile');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);