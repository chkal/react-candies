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
