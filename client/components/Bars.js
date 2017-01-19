const React = require('react');

//TODO: Revisit why this.props is undefined everywhere but Render and how useless that is to me
class Bars extends React.Component {
    constructor(props) {
        super(props);
		console.log(props);
        this.state = {
            barStash: props.barCollection
        }
    }
    shouldComponentUpdate(nextProps) {    
        console.log(this.state);            
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
            if(this.props.authenticated) {
                visitButton = (
                    <button onClick={this.props.handleVisit.bind(null, bar.name)}>Visit</button>
                );
            } else {
                visitButton = null;
            }             
            barArray.push(
                <p key={bar.id}>
                    <a target="_blank" href={bar.url}>{bar.name}</a>
                    <span>Patrons: {bar.patronCount}</span>
                    {visitButton}
                </p>
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