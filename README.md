# react-candies

Useful React component making your life easier.

## Installation

Install the package like this:

    npm install --save react-candies
    
Or with Yarn:

    yarn add react-candies

## Component Reference

### If

Conditionally renders the child components:

```typescript jsx
<If condition={!window.navigator.geolocation}>
  Sorry, the Geolocation API is not supported.
</If>
```

### FileChooser

Provides a standard file selection dialog by rendering a hidden `<input type="file">` element.
The child of this component is a render prop which gets access to an `open()` function to open the dialog.
If the user selects a file, the `onSelected()` callback will be invoked.

```typescript jsx
<FileChooser onSelected={files => this.handleFileUpload( files[0] )}>
  {( { open } ) => (
    <button onClick={open}>
      Select file
    </button>
  )}
</FileChooser>
```

If the `onSelected()` callback returns a promise, the render function can detect if the promise is still pending
via the `processing` boolean provided as a parameter.

```typescript jsx
<FileChooser onSelected={files => this.handleFileUpload( files[0] )}>
  {( { open, processing } ) => (
    <button onClick={open}>
      {processing ? "Uploading" : "Select file"}
    </button>
  )}
</FileChooser>
```

### Resettable

Sometimes it is useful to force recreation of a complete subtree to trigger `componentWillUnmount()` and
`componentDidMount()` events. The `Resettable` component allows this by providing a `reset()` function
to the render prop.

```typescript jsx
<Resettable>
  {reset => (

    {/* Some stateful component */}

    <button onClick={reset}>
      Reset
    </button>
      
  )}
</Resettable>
```