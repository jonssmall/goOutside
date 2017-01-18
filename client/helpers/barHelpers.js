let axios = require('axios');

module.exports = {
    getBars: (location) => {
        return axios.get(`/bars/${location}`)
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });  
    },
    setBar: (barName) => {
        return axios.put('/user', {barName: barName})
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });          
    }
}