## 1. What is the difference between Component and PureComponent? give an example where it might break my app.
The Main difference between a Component and a PureComponent is that a PureComponent will implement `shouldComponentUpdate` implicitly with shallow comparison, while a regular Component does not

React PureComponent only performances a shallow prop comparison if we pass a complex data structure as prop, it might produce false-negatives and causing it to not re-render even though the props has changed

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
A context is used to communicate specific component from the root of the application or a sub-tree, shouldComponent might prevent the re-rendering of component sub-tree, this might block context propagation.

## 3. Describe 3 ways to pass information from a component to its PARENT.
 - using the hook useImperativeHandle, we could expose a value or a function from within a component to its parent
 - In class component we could expose value to the parent by using a ref
 - By use a Context or a state management library e.g: redux, mobx

## 4. Give 2 ways to prevent components from re-rendering.
 - For class component we could use `shouldComponentUpdate` and returning false based on the props validate, this will prevent the component from re-render
 - For functional component we could use `memo` higher order component, if the specific props of a component yields the same result, react will skip rendering the component 

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
A fragment Lets you return multiple Element without the need of adding an extra wrapper node

## 6. Give 3 examples of the HOC pattern.
Higher Order Components is a component that take a component as an argument an returns a new enhance component, for example if we would like to implement an `SearchField` that requires a debounce onChange, we can add this logic within an HOC like so:

```jsx
const DebounceSearchField = withDebounce(SearchField);
```

Another example is the `connect` HOC from redux, that will subscribe the component to the store

```javascript
mapStateToProps = (state) => ({ name: state.user.name});

const ConnectedComponent = connect(mapStateToProps)(Component);
```

Another example for some routing libraries is the `withRoute` that will inject all the necessary location information through the HOC

```javascript
const Profile = withRouter(MyProfile)
```
The `MyProfile` component now will have access to all router props.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

## 8. How many arguments does setState take and why is it async.
setState takes 2 arguments, the first argument is the updater object, and the second argument is a callback that is triggered when the update has been completed, internally setState tells react that the component needs to be re-rendered thus enqueueing the state change with the update changes that's why the operation is asynchronous

## 9. List the steps needed to migrate a Class to Function Component.
In order to migrate a Class to a function component there a few steps that can be follow:
 - Remove the constructor and any state or bind logic that might be inside of it
 - refactor the state to it hook counter part `useState` and initially its value if necessary passing it as function parameter like so: `useState(initValue)`
 - Remove all lifecycle methods `componentDidMount`, `componentDidUpdate`, and so forth, and move the logic to the use `useEffect` hook, base on the dependency array we are able to replicate the behavior, and `[]` array will behave as a `componentDidMount`, adding a dependency `[date]` will re-run the effect if the dependencies changes
 - Remove the `render` function and return the `JSX` markup. 

## 10. List a few ways styles can be used with components.
Styles can be used in various within react components, the most common ones are CSS/SASS modules, like so:

```jsx
import styles from './myStyleSheet.module.css';
```

or importing the style sheets directly into the component
```jsx
import './App.css';
```

Another common approach is by using CSS-in-JS, that enhance css by using JS module, there are many libraries with different features, a common one is `styled-components`
```jsx
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

render(
  <Wrapper>
    Hello World!
  </Wrapper>
);
```
each approach has its props/cons.

## 11. How to render an HTML string coming from the server.
React provides an special attribute `dangerouslySetInnerHTML` that takes an special object structure and will render an HTML string into the browser DOM, however this operation is risky as it opens the possibility  for cross-site scripting.
