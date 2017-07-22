const findUser = 'https://api.github.com/users/'
const findToRepo = 'https://api.github.com/repos/'
/*
Repositórios de um usuário: https://api.github.com/users/{username}/repos
Detalhes de um repositório: https://api.github.com/repos/{full_name}
'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';*/

let userName = null;
const searchInput = document.querySelector('.search');

function displayMatches() {
	if(searchInput.value){
		let searchProfile = findUser + searchInput.value
		let searchRepositories =searchProfile + '/repos'
		/*fetch( searchProfile )
			.then(blob => blob.json())
			.then(data => createProfile(data))
*/
		fetch( searchRepositories )
			.then(blob => blob.json())
			.then(data => createRepos(data))
	}
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
function createRepos( data ){
	if(data.message !== "Not Found"){
		userName= data.login
		
		var html = 
			data.map(repo => {
  
    return `
      <li class="repo">
        <span class="name">${repo.name}, ${repo.stargazers_count}</span>
		<button type="button" data-key=${repo.full_name} class="btn btn-lg btn-success searchRepo">Buscar</button>
        </span>
      </li>
    `;
  }).join('');
		searchRepo.innerHTML = html;
		var repos = document.querySelectorAll(".repo")
		repos.forEach(repo => repo.addEventListener('click', findRepo));
	}
	else
		alert('usuário não encontrado, tente novamente')
}
function findRepo(){
	var button = this.querySelector("button[data-key]")
	var buttonKey = button.getAttribute('data-key')
	
	let searchRepositories = findToRepo	 + buttonKey
		fetch( searchRepositories )
			.then(blob => blob.json())
			.then(data => createRepoInfo(data))
	
	console.log(searchRepo)
}

function createRepoInfo(data){
	
	var html = 
		`
			<label>name :
				<span>${data.name}</span>
			</label>
			<label>descriçao :
				<span>${data.description}</span>
			</label>
			<label>Estrelas :
				<span>${data.stargazers_count}</span>
			</label>
			<label>linguagem :
				<span>${data.language}</span>
			</label>
			<a href=${data.url}></a>
		`	
	repoInfo.innerHTML = html;

console.log(data)
}

	
const profile = document.querySelector('.profile');
const repositories = document.querySelector('.repositories');
const repoInfo = document.querySelector('.repoInfo')
const submitButton = document.querySelector('.search-form button')
const searchRepo = document.querySelector('.searchRepo')

submitButton.addEventListener('click', displayMatches)


/*teste*/
var repos = Array.from(document.querySelectorAll(".repo"))
repos.forEach(repo => repo.addEventListener('click', findRepo));