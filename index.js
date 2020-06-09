//making invisible
// document.getElementById('loading').style.visibility = 'visible' 
// document.getElementById('mainBody').style.visibility = 'hidden' 
const per_page = 5;
let githubUrl="https://api.github.com/users/asmitbhantana"
let githubResponse="";
let githubRepoUrl="https://api.github.com/users/asmitbhantana/repos?";
function getAPIDataFromGithub(){
    fetch(githubUrl)
    .then(response => response.json())
    .then(function (data){
        githubResponse = data;
        updateUserData();
    });
}

function changeUserPersonalInfo(){
    //changing user data
    document.getElementById('fullUsername').textContent = githubResponse.name;
    document.getElementById('userBio').textContent = githubResponse.bio;
    document.getElementById('userProfileImg').src= githubResponse.avatar_url;
}
         
function changeUserProgressInfo(){
    //changing personal progess
    document.getElementById('followersItem').getElementsByTagName('a')[0].textContent = `${githubResponse.followers} Followers`;
    document.getElementById('followingItem').getElementsByTagName('a')[0].textContent = `${githubResponse.following} Following`;
    document.getElementById('publicRepos').getElementsByTagName('a')[0].textContent = `${githubResponse.public_repos} Repository`;
    document.getElementById('publicGist').getElementsByTagName('a')[0].textContent = `${githubResponse.public_gists} Public Gist`;
}

function createRepoNavigationButton(){
    let createdButtons="";
    let repoDivisor = githubResponse.public_repos/per_page;
    if (githubResponse.public_repos%per_page!=0){
        repoDivisor++;
    }
    for(let i=1;i<repoDivisor;i++){
        let button=`<button onClick="navRepoPageBtnClicked(${i})">${i}</button>`;
        createdButtons=createdButtons.concat(button);
    }
    document.getElementById('repoNavigationBar').innerHTML = createdButtons;
}

function fetchProjectsFrom(page_No){
    fetch(githubRepoUrl+`page=${page_No}`+`&per_page=${per_page}`)
    .then(response =>response.json())
    .then(data=>updateRepoInfromation(data));
}

function updateRepoInfromation(data){
    let createdItems="";
    for(let i=0;i<data.length;i++){
        let repoitem = 
            `<div class="repo_card_item card_view">
                <img id="repoTypeImg" src="images/icons/${data[i].fork}.png"/>
                <a id="repoDate">${data[i].created_at.substring(0,10)}</a>
                <a id="repoName" href="${data[i].html_url}" target="_blank" rel="nofollow" title="Open Repository">${data[i].name}</a>
                <a id="repoDescription">${
                    // data[i].description
                    (data[i].description!=null&&data[i].description.length>30)?data[i].description.substring(0,30)+"...":data[  i].description
                }</a>
                <img id="languageLogoImg" src="images/language/${
                    data[i].language?data[i].language.toLowerCase():"default"
                }.png" />
            </div>`;
            createdItems=createdItems.concat(repoitem);
    }
    document.getElementById("repoCardList").innerHTML = createdItems;
}
function navRepoPageBtnClicked(page){
    fetchProjectsFrom(page);
}            

function fetchAlData(){
    getAPIDataFromGithub();
}

function updateUserData(){
    changeUserPersonalInfo();
    changeUserProgressInfo();
    createRepoNavigationButton();
    fetchProjectsFrom(1);
}

fetchAlData();
