let axios = require('axios');

for (let i = 1; i <= 100; i++) {
    let data = JSON.stringify({"name": "Plan " + i});

    let config = {
        method: 'post',
        url: 'http://localhost:9001/v1/plans/create-plan',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}