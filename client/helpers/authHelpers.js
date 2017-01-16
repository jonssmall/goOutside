let axios = require('axios');

module.exports = {
    isSignedOn: () => {
        return axios.get('/signedOn')
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });    
    }
};