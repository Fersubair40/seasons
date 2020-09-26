import React from "react";
import ReactDOM from "react-dom";
import LoadingSpinner from "./LoadingSpinner";
import SeasonDisplay from "./SeasonDisplay";

export default class App extends React.Component {
  state = {
    lat: null,
    errMessage: "",
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
        });
      },
      (error) => {
        this.setState({ errMessage: error.message });
      }
    );
  }

  componentDidUpdate() {
    console.log("component updated");
  }

  renderContent() {
    if (this.state.errMessage && !this.state.lat) {
      return <div>Error: {this.state.errMessage}</div>;
    }
    if (!this.state.errMessage && this.state.lat) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }
    return <LoadingSpinner message="Please accept Location request" />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
