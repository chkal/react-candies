import * as React from "react";

type Props = {
  condition: boolean;
  children: React.ReactNode;
}

// Not a SFC because the typings are messed up
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23422
export class If extends React.Component<Props, {}> {
  render(): React.ReactNode {
    return this.props.condition ? this.props.children : null;
  }
}
