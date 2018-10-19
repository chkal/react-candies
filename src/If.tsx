import * as React from "react";

type Props = {
  condition: boolean;
  then?: React.ReactNode;
  else?: React.ReactNode;
  children?: React.ReactNode;
}

// Not a SFC because the typings are messed up
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23422
export class If extends React.Component<Props, {}> {
  render(): React.ReactNode {
    if( this.props.condition ) {
      if( this.props.then ) {
        return this.props.then;
      }
      if( this.props.children ) {
        return this.props.children;
      }
    }
    else {
      if( this.props.else ) {
        return this.props.else;
      }
    }
    return null;
  }
}
