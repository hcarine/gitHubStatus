const findUser = 'https://api.github.com/users/'
const findToRepo = 'https://api.github.com/repos/'
let userName = null;
const searchInput = document.querySelector('.search');
const profile = document.querySelector('.profile');
const repositories = document.querySelector('.repositories');
const repoInfo = document.querySelector('.repoInfo')
const submitButton = document.querySelector('.search-form button')
const searchRepo = document.querySelector('.searchRepo')

submitButton.addEventListener('click', displayMatches)


/*teste*/
var repos = Array.from(document.querySelectorAll(".repo"))
repos.forEach(repo => repo.addEventListener('click', findRepo));

function displayMatches() {
	if(searchInput.value){
		let searchProfile = findUser + searchInput.value
		let searchRepositories = searchProfile + '/repos'
		fetch( searchProfile )
			.then(blob => blob.json())
			.then(data => createProfile(data))
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
			<img class="user_image" src=${data.avatar_url}></img>
			<ul class="list-group">
				<li class="list-group-item">
					Nome:
					<span>${data.name}</span>
				</li>
				<li class="list-group-item">
					Email:
					<span>${data.email}</span>
				</li>	
				<li class="list-group-item">
					Seguidores:
					<span>${data.followers}</span>
				</li>	
				<li class="list-group-item">
					bio:
					<span>${data.bio}</span>
				</li>
			</ul>
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
			`  <li class="list-group-item active">Repositorios
			  </li>
			`+
			data.map(repo => {
			return `
			  <li class="repo list-group-item">
				<span class="name">${repo.name}, ${repo.stargazers_count}</span>
				<button type="button" data-key=${repo.full_name} class="btn btn-sm btn-primary searchRepo">Buscar</button>
				</span>
			  </li>
			`;
		  }).join('');
		searchRepo.innerHTML = html;
		createListenerButtons()

	}else
		alert('usuário não encontrado, tente novamente')
}

function createListenerButtons(){
	var repos = document.querySelectorAll(".repo")
	repos.forEach(repo => repo.addEventListener('click', findRepo));	
}


function findRepo(){
	var button = this.querySelector("button[data-key]")
	var buttonKey = button.getAttribute('data-key')
	
	let searchRepositories = findToRepo	 + buttonKey
	fetch( searchRepositories )
		.then(blob => blob.json())
		.then(data => createRepoInfo(data))
}

function createRepoInfo(data){	
	var html = 
		`
		<li class="list-group-item">
			Nome:
			<span>${data.name}</span>
		</li>
  		<li class="list-group-item">
			Descrição:
			<span>${data.description}</span>
		</li>
  		<li class="list-group-item">
			Estrelas:
			<span>${data.stargazers_count}</span>
		</li>
  		<li class="list-group-item">
			Linguagem:
			<span>${data.language}</span>
		</li>
 		<a href="${data.html_url}" class="list-group-item">Veja Repositorio</a>
		`	
	repoInfo.innerHTML = html;
	window.scrollTo(0,document.body.scrollHeight);
}