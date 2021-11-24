const profileInfo = document.querySelector(".overview");
const username = "ddarlin1";
const repoList = document.querySelector(".repo-list");
const repoContainer = document.querySelector(".repos");
const repoDataDisplay = document.querySelector(".repo-data");

// fetch data
const getUser = async function () {
    const user = await fetch(`https://api.github.com/users/${username}`);
    const data = await user.json();
    userDisplay(data);
};

getUser();


const userDisplay = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> 
  `;
  profileInfo.append(div);
  getRepos();
};

// fetch repos
const getRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();
  // console.log(repoData);
  displayRepos(repoData);
};

// display repos
const displayRepos = function (repos) {
  for (const repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(listItem);
    }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // console.log(repoName);
    getRepoInfo(repoName);
  }
});

// fetch specific repo info
const getRepoInfo = async function (repoName) {
  const repository = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await repository.json();
  console.log(repoInfo);
  // grab languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json(); // object
  // console.log(languageData);

  // make list of languages
  const languages = [];
  for (const language in languageData) { // use for...in to loop through an object
    languages.push(language);
  } 
  displayRepoInfo(repoInfo, languages);
};

// display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
  repoDataDisplay.innerHTML = "";
  repoDataDisplay.classList.remove("hide");
  repoContainer.classList.add("hide");
  const repoDiv = document.createElement("div");
  repoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoDataDisplay.append(repoDiv);
};