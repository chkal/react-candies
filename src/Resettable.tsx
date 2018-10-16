import * as React from "react";

type Args = {
  reset: () => void;
};

type Props = {
  onSelected: ( files: File[] ) => Promise<any> | undefined;
  children: ( args: Args ) => React.ReactNode;
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

    const args: Args = {
      reset: this.reset
    };

    return (
      <React.Fragment key={this.state.seq}>
        {this.props.children( args )}
      </React.Fragment>
    );

  }
}
