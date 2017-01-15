const React = require('react');

function Bars(props) {
    let barArray = [];
    props.bars.map((bar) => {                    
        barArray.push(
            <p key={bar.id}>
                <a target="_blank" href={bar.url}>{bar.name}</a>
                <span>Patrons: </span>
                <button>Visit</button>
            </p>
        )
    });

    return (
        <div>
            {barArray}
        </div>
    )    
}

module.exports = Bars;