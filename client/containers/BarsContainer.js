const React = require('react');
const Bar = require('../components/BarCard.js');
const api = require('../helpers/barHelpers.js');

var BarsContainer = React.createClass({
    getInitialState: function() {
        return {
            bars: []            
        }
    },    
    getBars: function(location) {                 
        api.getBars(location)
        .then(result => {            
            if(result.data) {
                console.log(result.data);
                // this.setState({
                //     bars: result.data
                // });
            }
        });
    },
    render: function () {
        return (
            <div>
                <p>Hello Bars {this.state.bars.length}</p>
                <button onClick={this.getBars.bind(null, 'norfolk')}>Click here.</button>
            </div>
        )
    }
});

module.exports = BarsContainer;