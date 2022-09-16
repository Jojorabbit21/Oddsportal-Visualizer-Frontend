const button = document.querySelector("#button");
let wip = false;

button.addEventListener("click", () => {
  if (!wip) {
    wip = true;

    let url = document.querySelector("#url").value;
    let type = document.querySelector("#type").value;

    let package = new Object();
    package.url = url;
    package.type = type;

    let dataObject;

    fetch('http://127.0.0.1:8000/api/get/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://127.0.0.1'
      },
      body: JSON.stringify({
        url: url,
        type: type,
      }),
    })
    .then((response) => { return response.json() })
    .then((data) => {
      let i = JSON.parse(data);
      let labels = [];
      let datas = [[],[]];

      for (let j in i[0]) {
        labels.push(i[0][j]['timestamp']);
        datas[0].push(i[0][j]['value']);
      }
      for (let j in i[1]) {
        datas[1].push(i[1][j]['value']);
      }

      let myChart = new Chart(  
        document.querySelector("#chart"), {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                data: datas[0],
                label: "Home",
                borderColor: 'rgb(152, 25, 78)',
                fill: true,
              },
            ]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Odds data"
            }
          }
        });
        let myChart2 = new Chart(  
        document.querySelector("#chart2"), {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                data: datas[1],
                label: "Away",
                borderColor: 'rgb(75, 142, 231)',
                fill: true,
              },
            ]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Odds data"
            }
          }
        });
            
      wip = false;
    })
    .catch(err => {
      console.log("Fetch Error ",err);
    });
  }
});
