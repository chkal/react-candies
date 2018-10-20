import * as React from "react";
import { debounce } from "./util/debounce";

type OnResizeCallback = ( width: number, height: number ) => void;
type ChildrenRenderProp = ( width: number, height: number ) => React.ReactNode;

type Props = {
  delay?: number;
  onResize?: OnResizeCallback;
  children?: React.ReactNode | ChildrenRenderProp;
}

type State = {
  width: number;
  height: number;
}

const EVENT_RESIZE = "resize";

export class WindowSize extends React.Component<Props, State> {

  static defaultProps = {
    delay: 100
  };

  state = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  componentDidMount(): void {
    window.addEventListener( EVENT_RESIZE, this.handleWindowResize );
  }

  componentWillUnmount(): void {
    window.removeEventListener( EVENT_RESIZE, this.handleWindowResize );
  }

  handleWindowResize = debounce( () => {

    if( this.props.onResize ) {
      this.props.onResize( window.innerWidth, window.innerHeight );
    }

    this.setState( {
      width: window.innerWidth,
      height: window.innerHeight
    } );

  }, () => this.props.delay as number );

  render(): React.ReactNode {
    if( typeof this.props.children === "function" ) {
      return (this.props.children as ChildrenRenderProp)( this.state.width, this.state.height );
    }
    return this.props.children || null;
  }

}
