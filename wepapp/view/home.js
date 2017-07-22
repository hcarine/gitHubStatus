const findUser = '	   https://api.github.com/users/'
/*
Repositórios de um usuário: https://api.github.com/users/{username}/repos
Detalhes de um repositório: https://api.github.com/repos/{full_name}
'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';*/

let user = {};
const searchInput = document.querySelector('.search');

function displayMatches() {
	let search = findUser + searchInput.value
fetch( search )
	.then(blob => blob.json())
  	.then(function(data){
			createProfile(data)})
	.catch(err =>
	console.error('Failed retrieving information', err)
)
}

function createProfile( data ){
	user = data

	console.log(user)
	//DocumentcreateElement
	var html = 
		`
			<img src=${user.avatar_url}></img>
			<label>name :
				<span>${user.name}</span>
			</label>
			<label>email :
				<span>${user.email}</span>
			</label>
			<label>folowers :
				<span>${user.bio}</span>
			</label>
			<label>bio :
				<span>${user.bio}</span>
			</label>

		`
		
	
profile.innerHTML = html;
}


const profile = document.querySelector('.profile');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);