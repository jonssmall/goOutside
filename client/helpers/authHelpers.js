let axios = require('axios');

module.exports = {
    isSignedOn: () => {
        return axios.get('/user')
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });    
    }
};