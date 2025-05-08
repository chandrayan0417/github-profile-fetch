

document.querySelector(".btn").addEventListener("click", (event) => {
    event.preventDefault();
    const username = document.querySelector(".userinput").value;
    fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                console.warn(`${username} Not Found`);
                alert(`${username} Not Found`)
            } else {
                fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
                    .then(res => res.json())
                    .then(repos => {
                        document.querySelector("form").style.display = "none"
                        document.querySelector(".name").innerHTML = data.name
                        document.querySelector(".username").innerHTML = `<a href="${data.html_url}" target = "_blank" >${"@" + username} <i class="ri-external-link-line"></i></a> `
                        document.querySelector(".profileImg").src = data.avatar_url
                        document.querySelector(".location").innerHTML = data.location
                        document.querySelector(".followersCount").innerHTML = data.followers
                        document.querySelector(".followingCount").innerHTML = data.following
                        document.querySelector(".followers").href = `https://github.com/${username}?tab=followers`
                        document.querySelector(".following").href = `https://github.com/${username}?tab=following`
                        document.querySelector(".repoCount").innerHTML = "Total  repositories : " + data.public_repos
                        document.querySelector(".userInfo").style.display = "flex"
                        repos.forEach(repo => {
                            const created_at = repo.created_at
                            const updated_at = repo.updated_at
                            const div = document.createElement("div");
                            if(repo.language == null){
                                div.innerHTML = `<a href="${repo.html_url}" target = "_blank" > <h3>${repo.name}</h3> <i class="ri-external-link-line"></i></a> <p>Created at : ${created_at.split('T')[0]}</p>
                            <p>Updated at : ${updated_at.split('T')[0]}</p>`;
                            }else{
                                div.innerHTML = `<a href="${repo.html_url}" target = "_blank" > <h3>${repo.name}</h3> <i class="ri-external-link-line"></i></a> <p>Created at : ${created_at.split('T')[0]}</p>
                            <p>Updated at : ${updated_at.split('T')[0]}</p>
                            <p> Language : ${repo.language}</p>`;
                            }
                            div.classList.add("repo")
                            document.querySelector(".repos").appendChild(div);
                        });
                    })
            }
        })
        .catch(error => {
            console.error("Error fetching GitHub user:", error);
        });
});
