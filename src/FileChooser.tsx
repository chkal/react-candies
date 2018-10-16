import * as React from "react";

export type Args = {
  open: () => void;
  processing: boolean;
};

export type Props = {
  onSelected: ( files: File[] ) => Promise<any> | undefined;
  children: ( args: Args ) => React.ReactNode;
}

export type State = {
  processing: boolean;
}

export class FileChooser extends React.Component<Props, State> {

  state = {
    processing: false
  };

  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  open = () => {
    const input = this.inputRef.current;
    if( input && typeof input.click === "function" ) {
      input.click();
    }
  };

  onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {

    if( this.state.processing ) {
      return;
    }

    const input = e.target as HTMLInputElement;

    const files = input.files ? Array.from( input.files ) : null;
    if( !files ) {
      return;
    }

    input.value = "";

    const result = this.props.onSelected( files );

    if( result instanceof Promise ) {
      this.setState( { processing: true } );
      const resetProcessing = () => this.setState( { processing: false } );
      result.then( resetProcessing, resetProcessing );
    }

  };

  render(): JSX.Element | null | false {

    const args: Args = {
      open: this.open,
      processing: this.state.processing
    };

    return (
      <>
        <input type="file"
               ref={this.inputRef}
               onChange={e => this.onChange( e )}
               style={{ display: "none" }}/>
        {this.props.children( args )}
      </>
    );

  }
}
