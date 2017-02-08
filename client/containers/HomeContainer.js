const React = require('react');
const BarsContainer = require('./BarsContainer.js');
const auth = require('../helpers/authHelpers');

var HomeContainer = React.createClass({
    getInitialState: function() {
        return {
            signedOn: false,
            display: 'none',
            user: null      
        }
    },
    //calls twice and makes a hideous screen flicker.
    componentWillMount: function() {        
        auth.isSignedOn()
        .then(result => {                        
            if(result) {
                this.setState({
                    signedOn: !!result.data,
                    display: 'block',
                    user: result.data ? result.data : null
                });                
            }
        });
    },
    updateUser: function(location) {        
        let newUser = this.state.user;
        newUser.location = location;
        this.setState({
            user: newUser
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
                <UserPanel user={this.state.user}/>
                <a href='/auth/github'>Login</a> or <a href='/logout'>Logout</a>                
                <BarsContainer locationHandler={this.updateUser} authenticated={this.state.signedOn} />
            </div>
        )
    }
});

function UserPanel(props) {
    if (!props.user) return null;
    return (
        <div>
            <p>Welcome {props.user.github.displayName}</p>
            <p>Current location: {props.user.location}</p>
        </div>
    )
}

module.exports = HomeContainer;