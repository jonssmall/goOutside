const React = require('react');
const Bars = require('../components/Bars.js');
const api = require('../helpers/barHelpers.js');

let BarsContainer = React.createClass({
    getInitialState: function() {
        return {
            city: '',
            bars: []      
        }
    },    
    getBars: function(location) {                 
        api.getBars(location)
        .then(result => {            
            if(result.data) {                
                this.setState({
                    bars: result.data.businesses
                });                
            }
        });
    },
    updateInput: function(e) {        
        this.setState({
            city: e.target.value
        })
    },
    setPatronLocation: function(barName) {
        api.setBar(barName)
        .then(result => {
            this.getBars(this.state.city);
        })
    },
    render: function () {
        return (
            <div>
                <p>Hello Bars {this.state.bars.length}</p>
                <SearchForm 
                    handleClick={this.getBars.bind(null, this.state.city)}
                    handleUpdate={this.updateInput}
                    city={this.state.city} />
                <Bars barCollection={this.state.bars} 
                    authenticated={this.props.authenticated} 
                    handleVisit={this.setPatronLocation}/>                 
            </div>
        )
    }
});

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