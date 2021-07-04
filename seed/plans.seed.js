let axios = require('axios');

for (let i = 1; i <= 10; i++) {
    let data = JSON.stringify({"name": `Plan ${i}`});

    let config = {
        method: 'post',
        url: 'http://localhost:9001/v1/plans/create-plan',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZXJ2aWNlIDEiLCJpYXQiOjE2MjU0MDMyNzksInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJpc1N1cGVyQWRtaW4iOmZhbHNlfQ.5SRIt5Keanj1V88M4NZzviJqyfRSlj_r6KhGIAajfcQ',
            'Content-Type': 'application/json',
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