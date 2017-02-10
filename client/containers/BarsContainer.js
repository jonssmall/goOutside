const React = require('react');
const Bars = require('../components/Bars.js');
const api = require('../helpers/barHelpers.js');

let BarsContainer = React.createClass({
    getInitialState: function() {
        return {
            city: '',
            bars: [],
            isLoading: false  
        }
    },    
    getBars: function(location) {
        if (this.state.bars.length == 0) this.setState({isLoading: true });                 
        api.getBars(location)
        .then(result => {            
            if(result.data) {    
                sessionStorage.setItem('lastSearch', location);            
                this.setState({
                    bars: result.data.businesses,
                    isLoading: false
                });                
            }
        });
    },
    componentDidMount: function() {
        var lastSearch = sessionStorage.getItem('lastSearch');
        if(lastSearch) {
            this.setState({
                city: lastSearch
            });
            this.getBars(lastSearch);
        }
    },
    updateInput: function(e) {        
        this.setState({
            city: e.target.value
        })
    },
    setPatronLocation: function(barName) {
        api.setBar(barName)
        .then(result => {
            //TODO: compare performance of manual client state change vs. repeat query
            this.getBars(this.state.city);            
            this.props.locationHandler.call(null, barName);
        })
    },
    leaveLocation: function() {
        this.setPatronLocation("Nowhere yet");
    },
    render: function () {
        return (
            <div>
                <p>Hello Bars {this.state.bars.length}</p>
                <SearchForm 
                    handleClick={this.getBars.bind(null, this.state.city)}
                    handleUpdate={this.updateInput}
                    city={this.state.city} />
                <Loading isLoading={this.state.isLoading}/>
                <Bars barCollection={this.state.bars} 
                    authenticated={this.props.authenticated}
                    currentLocation={this.props.currentLocation}
                    handleVisit={this.setPatronLocation}
                    handleLeave={this.leaveLocation}/>                 
            </div>
        )
    }
});

function Loading(props) {
    let message = props.isLoading ? <p>Loading...</p> : null;
    return message;
}

function SearchForm(props) {
    return (
        <div>
            <input onChange={props.handleUpdate}
                value={props.city}        
                type="text" />
            <button onClick={props.handleClick}>Search Location</button>
        </div>
    )    
}

module.exports = BarsContainer;