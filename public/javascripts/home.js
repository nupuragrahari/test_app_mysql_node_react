
class showLocations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            locations: [],
            count:null,
            most_active_attacker_king:null,
            most_active_defender_king:null,
            most_active_region:null,numberOfWins:null,
            numberOfLosses:null,
            name:null,
            battle_types:null,
            min_defender_size:null,
            max_defender_size:null
        };
    }
    componentDidMount() {
        fetch("/list")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        locations: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        fetch("/count")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        count: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        fetch("/stats")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result.most_active.attacker_king,
                        most_active_attacker_king:result.most_active.attacker_king,
                        most_active_defender_king:result.most_active.defender_king,
                        most_active_region:result.most_active.region,
                        numberOfWins:result.attacker_outcome.win,
                        numberOfLosses:result.attacker_outcome.loss,
                        name:result.most_active.name,
                        battle_types:result.battle_type,
                        min_defender_size:result.defender_size.min,
                        max_defender_size:result.defender_size.min
                    });
                    console.log(result.most_active.attacker_king);
                    console.log(this.state.data);
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {

        return React.createElement('div', {},
            React.createElement('h1', {}, "Game of Thrones Results"),
            React.createElement('h3', {}, "List of Locations of Battles"),
            React.createElement('h5', {}, `${this.state.locations}`),
            React.createElement('h3', {}, `Total number of Battles: ${this.state.count}`),
            React.createElement('h3', {}, "Statistics "),
            React.createElement('h4', {}, "Most active attacker King: "+`${this.state.most_active_attacker_king}`),
            React.createElement('h4', {}, "Most active defender King: "+`${this.state.most_active_defender_king}`),
            React.createElement('h4', {}, "Most active region: "+`${this.state.most_active_region}`),
            React.createElement('h4', {}, "Total number of Wins: "+`${this.state.numberOfWins}`),
            React.createElement('h4', {}, "Total number of Losses: "+`${this.state.numberOfLosses}`),
            React.createElement('h4', {}, "All battle types: "+`${this.state.battle_types}`),
            React.createElement('h4', {}, "Minimum defender size: "+`${this.state.min_defender_size}`),
            React.createElement('h4', {}, "Maximum defender size: "+`${this.state.max_defender_size}`),
        );
    }
}

ReactDOM.render(
    React.createElement(showLocations, {}, null),
    document.getElementById('root')
);
