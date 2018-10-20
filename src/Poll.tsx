import * as React from "react";

type Props = {
  active?: boolean;
  interval: number;
  onPoll: () => void;
}

type State = {}

export class Poll extends React.Component<Props, State> {

  static defaultProps = {
    active: true
  };

  timerId: number = -1;

  componentDidMount(): void {
    this.scheduleNextTick();
  }

  componentWillUnmount(): void {
    clearTimeout( this.timerId );
  }

  scheduleNextTick = () => {
    this.timerId = setTimeout( this.handleTick, this.props.interval );
  };

  handleTick = () => {
    this.scheduleNextTick();
    if( this.props.active ) {
      this.props.onPoll();
    }
  };

  render(): React.ReactNode {
    return this.props.children || null;
  }

}
