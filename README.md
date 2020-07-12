# Cookie Detail

## Discussion

**Topics to discuss:**

- State to switch rendered UI

In today's class we will add a cookie detail page using the concepts that we already know.

## Step 1: Detail Component

1. Create a new file for our component called `CookieDetail.js` and set up the component.

```javascript
import React from "react";

const CookieDetail = () => {
  return <h1>I'm the detail component</h1>;
};

export default CookieDetail;
```

2. Import `CookieDetail` in `App` and render it under `CookieList`

```javascript
// Components
import CookieDetail from "./components/CookieDetail";
```

```jsx
<CookieList />
<CookieDetail />

```

3. Our detail component is rendering. Now, what do we want to display in it? A bigger image of a cookie, the price and name, and maybe a description of our cookie. So let's add a `description` field in `cookies.js`.

```javascript
  {
    id: 1,
    name: "Chocolate Chip Cookie",
    price: 10,
    description: "some cookie.. sold by dozens",
    image:
      "https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1.jpg"
  },
```

4. But where will `CookieDetail` receive its details from? Let's pass any cookie from our `cookies` array as a prop:

```javascript
function App(){
  const cookie = cookies[0]
```

```jsx
<CookieDetail cookie={cookie} />
```

5. In `CookieDetail`, let's render our fields:

```javascript
const CookieDetail = (props) => {
  const cookie = props.cookie;
  return (
    <div>
      <h1>{cookie.name}</h1>
      <img src={cookie.image} alt={cookie.name} />
      <p>{cookie.description}</p>
      <p>{cookie.price} KD</p>
    </div>
  );
};
```

6. Let's style our elements, in `styles`:

```javascript
const DetailWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;

  img {
    width: 40%;
    float: left;
  }

  p {
    vertical-align: middle;
  }
`;
```

7. Looks much better! Don't worry if it's not perfect, we will work on fixing our styling later on.

```javascript
// Styling
import { DetailWrapper } from "../styles";

const CookieDetail = (props) => {
  const cookie = props.cookie;
  return (
    <DetailWrapper>
      <h1>{cookie.name}</h1>
      <img src={cookie.image} alt={cookie.name} />
      <p>{cookie.description}</p>
      <p>{cookie.price} KD</p>
    </DetailWrapper>
  );
};
```

## Step 2: Selecting a Cookie

1. What we need to do is change the rendered `cookie` in `CookieDetail` according to the cookie we click on. So we need to add an event handler in `CookieItem` that fetches the cookie when we click on the cookie's image. For now let's add an `alert`.

```jsx
<CookieWrapper>
  <img
    alt={cookie.name}
    src={cookie.image}
    onClick={() => alert(cookie.id)}
  />
```

2. But now the selected cookie must be saved in a state so that we can see the change. What did we agree on using if we want to change things on our screen? Yes! State! So we will create a state called `cookie`, and we'll give it an initial state of `cookies[0]`.

```javascript
const [cookie, setCookie] = useState(cookies[0]);
```

3. To use `setCookie` in `CookieItem`, we need to pass it down two levels: first from `App` to `CookieList`.

```jsx
<CookieList setCookie={setCookie} />
```

4. Now we will pass it from `CookieList` to `CookieItem`.

```jsx
<CookieItem cookie={cookie} key={cookie.id} setCookie={props.setCookie} />
```

5. Replace the `alert` with our method and pass it the whole `cookie` object

```jsx
<CookieWrapper>
  <img
    alt={cookie.name}
    src={cookie.image}
    onClick={() => props.setCookie(cookie)}
  />
```

6. Let's test it out. Yay! It's working.

7. But does it make sense to render both `CookieList` and `CookieDetail` at the same time? No! Let's add a conditional operator, but what will our condition be? We can set `cookie`'s default value to `null, and when selecting a cookie it will have a value. And that can be our condition:

```jsx
{
  cookie ? (
    <CookieDetail cookie={cookie} />
  ) : (
    <CookieList setCookie={setCookie} />
  );
}
```

8. But our JSX in `App` is already huge, so let's move our condition to its own function:

```javascript
const setView = () => {
  if (cookie) return <CookieDetail cookie={cookie} />;
  return <CookieList setCookie={setCookie} />;
};
```

9. Render it in the components' place:

```jsx
  </>
  {setView()}
</ThemeProvider>
```

10. Don't forget to set `cookie`'s initial value to `null`:

```javascript
const [cookie, setCookie] = useState(null);
```

And now either `CookieList` or `CookieDetail` will be rendered.
