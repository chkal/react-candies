import * as React from "react";

type Props = {
  children: ( reset: () => void ) => React.ReactNode;
}

type State = {
  seq: number;
}

export class Resettable extends React.Component<Props, State> {

  state = {
    seq: 1
  };

  reset = () => {
    this.setState( prev => ({
      seq: prev.seq + 1
    }) );
  };

  render(): JSX.Element | null | false {

    return (
      <React.Fragment key={this.state.seq}>
        {this.props.children( this.reset )}
      </React.Fragment>
    );

  }
}
