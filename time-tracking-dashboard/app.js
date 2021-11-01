const container = document.querySelector(".traking-container");
const frequency = document.querySelectorAll(".frequency span");

async function getData() {

    const resp = await fetch("./data.json");
    const data = await resp.json();
    
    firstRender(data);

    frequency.forEach((time) => {
        
        time.addEventListener('click',(e) => {

            frequency.forEach(t => {
                t.classList.remove("active");
            })

            container.innerHTML = "";
            
            let y = e.target.textContent.toLowerCase();

            e.target.classList.add("active");

            firstRender(data,y);
        })
    })
}

function firstRender(data, y = "daily") {

    data.map((item) => {

        let x = item.title.toLowerCase().replace(" ", "-");
        
        const div = document.createElement("div");

        div.classList.add(`${x}`);
        div.innerHTML = `
            <div class="${x}-bg">
                <img src="./images/icon-${x}.svg" alt="${x}" />
                <div class="${x}-tracking">
                    <div class="${x}-today">
                        <h3>${item.title}</h3>
                        <img src="./images/icon-ellipsis.svg" alt="dots" />
                    </div>
                    <div class="${x}-previous">
                        <span>${item.timeframes[y].current}hrs</span>
                        <h4>Last Week - ${item.timeframes[y].previous}hrs</h4>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    })
}

getData();