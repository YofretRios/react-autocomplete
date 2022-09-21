## 1. What is the difference between Component and PureComponent? give an example where it might break my app.
The Main difference between a Component and a PureComponent is that a PureComponent will implement `shouldComponentUpdate` implicitly with shallow comparison, while a regular Component does not.

React PureComponent only performas a shallow prop comparison if we pass a complex data structure as prop, it might produce false-negatives and causing it to not re-render even though the props has changed.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
A context is used to share data between components, it could be from the root of the application or a sub-tree, `shouldComponent` might prevent the re-rendering of a component sub-tree, this might block context propagation.

## 3. Describe 3 ways to pass information from a component to its PARENT.
 - using the hook `useImperativeHandle`, we could expose a value or a function from within a component to its parent.
 - In class component we could expose value to the parent by using a `ref`.
 - Another way to pass information to the parent is by using prop a handler, for example: `onChange` passing it from the parent to the child component, and send the value as function argument on that handler.

## 4. Give 2 ways to prevent components from re-rendering.
 - For class component we could use `shouldComponentUpdate` and return false based on the props validations, this will prevent the component from re-render.
 - For functional component we could use `memo` higher order component, if the specific props of a component yields the same result, react will skip rendering the component.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
A Fragment is a react syntax that lets you return multiple elements without the need of adding an extra wrapper DOM node, fragments can be problematic if a parent component iterates over its `children` explicitely, for example, in container components this may cause the container to apply styles to the Fragment instead of the child components.

## 6. Give 3 examples of the HOC pattern.
Higher Order Components is a component that take a component as an argument an returns a new enhance component, for example if we would like to implement a `SearchField` that requires a debounce onChange, we can add this logic within an HOC like so:

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
The `Profile` component now will have access to all router props.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
When handling execeptions with `async await` errors can be catch with a `try {} catch {}`, and for promises errors can be catch with the `catch()` callback, the main difference is that `catch()` has it own execution contexts.

## 8. How many arguments does setState take and why is it async.
`setState` takes 2 arguments, the first argument is the updater object, and the second argument is a callback that is triggered when the update has been completed, internally `setState` tells react that the component needs to be re-rendered thus enqueueing the state change with the update changes, that's why the operation is asynchronous.

## 9. List the steps needed to migrate a Class to Function Component.
In order to migrate a Class to a functional component there a few steps that can be follow:
 - Remove all class syntax and create a new function that will return the JSX markup.
 - Remove the constructor and any state or bind logic that might be inside of it
 - refactor the state to use its hook counterpart `useState` and initialize its value if necessary by passing it as function parameter, like so: `const [name, setName] = useState(initValue)`
 - Remove all lifecycle methods `componentDidMount`, `componentDidUpdate`, and so forth, and move the logic to the use `useEffect` hook, based on the dependency array we are going to be able to replicate their behavior, for example, an empty `[]` array will behave as a `componentDidMount`, adding a dependency `[date]` will re-run the effect if the dependencies changes
 - if there is a `componentWillUnmount` method, we can refactor it by returning a function within an `useEffect` hook, this is known a *clean up* function, and will run when the component is unmounted.
 - Remove the `render` function and instead return the `JSX` markup. 

## 10. List a few ways styles can be used with components.
Styles can be used in various within react components, the most common ones are CSS/SASS modules, like so:

```jsx
import styles from './myStyleSheet.module.css';
```

or importing the style sheets directly into the component
```jsx
import './App.css';
```

Another common approach is by using CSS-in-JS, that allows generating CSS from JS modules, there are many libraries with different features, a common one is `styled-components`

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
