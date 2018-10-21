# react-candies

Useful React component making your life easier.

## Installation

Install the package like this:

    npm install --save react-candies
    
Or with Yarn:

    yarn add react-candies

## Component Reference

### If

Conditionally renders the child components. If you don't want to handle the *else*-case, you can use the
simple form:

```jsx
<If condition={new Date().getDay() === 0}>
  <span>It's Sunday!</span>
</If>
```

But you can also use the full form, which allows you to specify the *then* and *else* blocks.

```jsx
<If condition={new Date().getDay() === 0}
    then={
      <span>It's Sunday!</span>
    }
    else={
      <span>It's not Sunday! Go back to work!</span>
    }/>
```

### FileChooser

Provides a standard file selection dialog by rendering a hidden `<input type="file">` element.
The child of this component is a render prop which gets access to an `open()` function to open the dialog.
If the user selects a file, the `onSelected()` callback will be invoked.

```jsx
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

```jsx
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

```jsx
<Resettable>
  {reset => (

    {/* Some stateful component */}

    <button onClick={reset}>
      Reset
    </button>
      
  )}
</Resettable>
```

### OnlineStatus

This component detects whether the browser is online. This can be useful to warn
the user if the connection was lost.

```jsx
<OnlineStatus>
  {online => (
    <div>
      {online ? "You are online!" : "You are offline!"}
    </div>
  )}
</OnlineStatus>
```

### WindowSize

This component allows to access and track change of the current window size. There are different ways
to use this component.

You can set the `onResize` prop to get notified in case of changes:

```jsx
<WindowSize onResize={( w, h ) => console.log( `width=${w}, height=${h}` )}/>
```

As `resize` events are fired VERY often, the component automatically debounces them with a delay
of 100ms. You can change this value if you like:

```jsx
<WindowSize onResize={( w, h ) => console.log( `width=${w}, height=${h}` )}
            delay={500} />
```

If you just need the width or height for doing layout, you can also use a render prop to access the
current values:

```jsx
<WindowSize>
  {( width, height ) => (
    <div>
      {width} x {height}
    </div>
  )}
</WindowSize>
```

### Poll

This component provides a simple way to perform polling based on some interval.

```jsx
<Poll interval={1000} 
      onPoll={() => console.log( "Ping" )}/>
```

You can dynamically enable/disable the polling using the `active` prop:

```jsx
<Poll interval={1000}
      active={this.state.updateStatus} 
      onPoll={() => this.fetchStatus()}/>
```
