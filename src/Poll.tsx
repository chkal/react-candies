import * as React from "react";

type Props = {
  active?: boolean;
  interval?: number;
  onPoll: () => void;
}

type State = {}

export class Poll extends React.Component<Props, State> {

  static defaultProps = {
    active: true,
    interval: 1000
  };

  timerId: number = -1;

  componentDidMount(): void {
    this.timerId = setInterval( this.handleTick, this.props.interval );
  }

  componentWillUnmount(): void {
    clearInterval( this.timerId );
  }

  handleTick = () => {
    if( this.props.active ) {
      this.props.onPoll();
    }
  };

  render(): React.ReactNode {
    return this.props.children || null;
  }

}
