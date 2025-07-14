import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    console.log("Component Mounting: Cons");
    super(props);
    this.state = {
        date: new Date(),
        time: new Date().toLocaleTimeString()
        };
  }

    componentDidMount() {
        console.log("Component DidMount:After Cons");
        this.timerRef = setInterval(() => this.setTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerRef);
    }

    setTime() {
        this.setState((state, props) => {
            console.log(state.date);
            return {
                date: new Date(),
                time: new Date().toLocaleTimeString()
            };
        });
    }

    render () {
        return (
            <div> 
                <p> The current time is {this.state.date.toString()}. </p>
                <p> The current time is {this.state.time}. </p>
            </div>
        );
    }
}

export default Clock;