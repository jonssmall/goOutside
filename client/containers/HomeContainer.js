const React = require('react');
const Bars = require('./BarsContainer.js');
const auth = require('../helpers/authHelpers');

var HomeContainer = React.createClass({
    getInitialState: function() {
        return {
            signedOn: false,
            display: 'none'      
        }
    },
    //calls twice and makes a hideous screen flicker.
    componentWillMount: function() {        
        auth.isSignedOn()
        .then(result => {            
            if(result) {
                this.setState({
                    signedOn: result.data,
                    display: 'block'
                });                
            }
        });
    },
    render: function () {
        let shellStyle = {
            display: this.state.display
        }; 
        return (
            <div style={shellStyle}>
                <p>Hello world</p>
                <p>Logged in? {this.state.signedOn.toString()}</p>
                <a href='/auth/github'>Login</a> or <a href='/logout'>Logout</a>                
                <Bars />
            </div>
        )
    }
});

module.exports = HomeContainer;