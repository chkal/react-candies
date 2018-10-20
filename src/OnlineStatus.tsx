import * as React from "react";

type Props = {
  children: ( online: boolean ) => React.ReactNode;
}

type State = {
  online: boolean;
}

const EVENT_ONLINE = "online";
const EVENT_OFFLINE = "offline";

export class OnlineStatus extends React.Component<Props, State> {

  state = {
    online: window.navigator.onLine !== false
  };

  componentDidMount(): void {
    window.addEventListener( EVENT_ONLINE, this.handleOnlineEvent );
    window.addEventListener( EVENT_OFFLINE, this.handleOfflineEvent );
  }

  componentWillUnmount(): void {
    window.removeEventListener( EVENT_ONLINE, this.handleOnlineEvent );
    window.removeEventListener( EVENT_OFFLINE, this.handleOfflineEvent );
  }

  handleOnlineEvent = () => {
    this.setState( {
      online: true
    } );
  };

  handleOfflineEvent = () => {
    this.setState( {
      online: false
    } );
  };

  render(): React.ReactNode {
    return this.props.children( this.state.online );
  }

}
