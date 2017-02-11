const React = require('react');

//TODO: Revisit why this.props is undefined everywhere but Render and how useless that is to me
class Bars extends React.Component {
    constructor(props) {
        super(props);		
        this.state = {
            barStash: props.barCollection
        }
    }
    shouldComponentUpdate(nextProps) {                   
        //return this.barStash != null && !this.barCollectionsEqual(this.barStash, nextProps.barCollection);
        return true;
    }
    barCollectionsEqual(bars1, bars2) {
        if (bars1.length !== bars2.length) return false;
        for (var i = 0; i < bars1.length; i++) {
            if (bars1[i].name !== bars2[i].name) return false;
        }
        return true;
    }
    render() {        
        let barArray = [];    
        this.props.barCollection.map((bar) => {
            let visitButton; 
            if(this.props.authenticated && bar.name != this.props.currentLocation) {
                visitButton = (
                    //<button className="button-success pure-button" onClick={this.props.handleVisit.bind(null, bar.name)}>Visit</button>
                    <input readOnly checked={bar.name == this.props.currentLocation} type="radio" onClick={this.props.handleVisit.bind(null, bar.name)} />
                );
            } else if (this.props.authenticated && bar.name == this.props.currentLocation) {
                visitButton = (
                    //<button className="button-warning pure-button" onClick={this.props.handleLeave.bind(null, null)}>Leave</button>
                    <input readOnly checked={bar.name == this.props.currentLocation} type="radio" onClick={this.props.handleLeave.bind(null, null)} />
                );
            } else {
                visitButton = null;
            }            
            barArray.push(
                <div key={bar.id}>
                    {visitButton}
                    <h2 style={{display: "inline-block"}}><a target="_blank" href={bar.url}>{bar.name}</a></h2>
                    <span>&nbsp; Patrons: {bar.patronCount}</span>                    
                </div>
            )
        });
        return (
            <div>
                {barArray}
            </div>
        );
    }
};

module.exports = Bars;