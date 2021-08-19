'use strict';

const e = React.createElement;

const Leaderboards = () => {
    const [isLoading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch('http://dreamlo.com/lb/611e7abc8f40bb6e989fbd57/json')
            .then(response => response.json())
            .then(data => {
                console.log(data.dreamlo.leaderboard.entry);
                setLoading(false);
                setData(data.dreamlo.leaderboard.entry);
            });
    }, [])

    if(isLoading) {
        return e(
            'span',
            {},
            'Loading...'
        );
    }

    return data.map(row => React.createElement(
           "div",
           { className: "row" },
           React.createElement(
              "div",
              { className: "item" },
              `${new Date(row.date).toLocaleDateString()} - ${row.name} - ${row.score}`
           ),
        ));
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Leaderboards), domContainer);
