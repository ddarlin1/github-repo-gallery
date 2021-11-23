const profileInfo = document.querySelector(".overview");
const username = "ddarlin1";
const displayRepos = document.querySelector(".repo-list");

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
  reposList(repoData);
};

getRepos();

// display repos
const reposList = function (repos) {
  for (const repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    displayRepos.append(listItem);
    }
};