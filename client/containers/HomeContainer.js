const React = require('react');
const Bars = require('./BarsContainer.js');

var HomeContainer = React.createClass({
    render: function () {
        return (
            <div>
                <p>Hello world</p>
                <Bars />
            </div>
        )
    }
});

module.exports = HomeContainer;