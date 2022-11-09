(function getMovieById() {
    const overviewBlock = document.getElementById('overview');
    const errorBlock = document.getElementById('error');
    try {
        let queryString = window.location.search.slice(1);
        const movieId = queryString.split("=");

        const headerTitle = document.getElementById("headerTitle")
        const poster = document.getElementById("poster")
        const titleDesc = document.getElementById("titleDesc")
        const overview = document.getElementById("overviewText")
        const directorsTable = document.getElementById("dirTable") 
        const writersTable = document.getElementById("writerTable")
        const castTable = document.getElementById("castTable")

        axios.get(`http://localhost:3000/api/movie/${movieId[1]}`).then((response)=>{
            if(response.data.message !== "Success") {
                throw Error();
            } else {
                const movie = response.data.data;
                const releaseYear = movie["release_date"].split("-")[0];

                headerTitle.innerHTML = movie["title"];

                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/original${movie["poster_path"]}`;
                img.classList.add("posterImg");
                poster.appendChild(img);

                const div1 = document.createElement("div")
                div1.classList.add("div1")

                const title = document.createElement("span")
                title.innerHTML = movie["title"]
                title.classList.add("title")
                div1.appendChild(title)

                const year = document.createElement("span")
                year.innerHTML = ` (${releaseYear})`
                div1.appendChild(year)

                titleDesc.appendChild(div1)

                const div2 = document.createElement("div")
                div2.innerHTML = `${movie["certification"]} | ${movie["release_date"]} | ${movie["original_language"]}`
                div2.classList.add("div2")

                titleDesc.appendChild(div2)

                overview.innerHTML = movie["overview"]

                const trDir = document.createElement("tr")
                trDir.classList.add("row")
                movie["directors"].forEach((data) => {
                    const td = document.createElement("td")
                    td.innerHTML = `${data["name"]} <br> <span class="textMute">Director</span>`
                    td.classList.add("tdBox")
                    trDir.appendChild(td)
                });
                directorsTable.appendChild(trDir)

                const trWriter = document.createElement("tr")
                trWriter.classList.add("row")
                movie["writers"].forEach((data) => {
                    const td = document.createElement("td")
                    td.innerHTML = `${data["name"]} <br> <span class="textMute">Writer</span>`
                    td.classList.add("tdBox")
                    trWriter.appendChild(td)
                });
                writersTable.appendChild(trWriter)

                const trCast = document.createElement("tr")
                trCast.classList.add("row")
                movie["cast"].forEach((data) => {
                    const td = document.createElement("td")
                    td.innerHTML = `${data["name"]} <br> <span class="textMute">Cast</span>`
                    td.classList.add("tdBox")
                    trCast.appendChild(td)
                });
                castTable.appendChild(trCast)
            }
        })
        .catch(() => {
            overviewBlock.style.display = 'none';
            errorBlock.style.display = 'block';
        });
    } catch (error) {
        overviewBlock.style.display = 'none';
        errorBlock.style.display = 'block';
    }
})();
