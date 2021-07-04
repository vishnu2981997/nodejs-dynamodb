let axios = require('axios');

for (let i = 1; i <= 100; i++) {
    let axios = require('axios');
    let data = JSON.stringify({
        "serviceName": `service ${i}`,
        "username": `John Doe ${i}`,
        "email": `johnDoe${i}@testMail.com`
    });

    let config = {
        method: 'post',
        url: 'http://localhost:9001/v1/super-admin/integration-tokens/create-token',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSRi1QbGFucyIsImlhdCI6MTYyNTQwMjY5NCwidHlwZSI6IkFDQ0VTU19UT0tFTiIsImlzU3VwZXJBZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJyZi1wbGFucy1zdXBlci1hZG1pbiJ9.S5rC6f4add-rCOZ9tmXeONpKaKcDaBvN5nXFhcyV008',
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