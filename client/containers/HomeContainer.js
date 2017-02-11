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
        let currentLocation = this.state.user ? this.state.user.location : null;
        return (
            <div style={shellStyle} id="layout" className="pure-g" >                     
                <UserPanel user={this.state.user} />
                <div className="content pure-u-1 pure-u-md-3-4">
                    <div>            
                        <div className="posts">
                            <h1 className="content-subhead">Enter a city name to get started.</h1>
                            <BarsContainer 
                                locationHandler={this.updateUser}
                                currentLocation={currentLocation}
                                authenticated={this.state.signedOn} />
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
});

function UserPanel(props) {
    let userInfo;
    if (props.user) {
        userInfo = (
            <div className="nav-item">
                <p>
                    Welcome {props.user.github.displayName}                    
                </p>                
                <p>Current location: {props.user.location}</p>
                <a className="pure-button" href='/logout'>Logout</a>
            </div>
        );
    } else {
        userInfo = (
            <div className="nav-item">
                <a className="pure-button" href='/auth/github'>Login with Github</a>
            </div>
        );
    }
    return (
        <div className="sidebar pure-u-1 pure-u-md-1-4">
            <div className="header">
                <h1 className="brand-title">goOutside</h1>
                <h2 className="brand-tagline">See who's visiting bars in your area.</h2>
                {userInfo}
            </div>
        </div>
    )
}

module.exports = HomeContainer;