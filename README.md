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
const CookieDetail = props => {
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

const CookieDetail = props => {
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

1. What we need to do is change the rendered `cookie` in `CookieDetail` according to the cookie we click on. So we need to add an event handler in `CookieItem` that fetches the cookie ID when we click on the cookie's image. For now let's add an `alert`.

```jsx
<CookieWrapper>
  <img
    alt={cookie.name}
    src={cookie.image}
    onClick={() => alert(cookie.id)}
  />
```

2. Let's create our `selectCookie` method, it takes the cookie ID as an argument and `find`s the cookie with this ID.

```javascript
const selectCookie = cookieId => {
  const selectedCookie = cookies.find(cookie => cookie.id === cookieId);
  console.log("App -> selectedCookie", selectedCookie);
};
```

3. To use this method in `CookieItem`, we need to pass it down two levels: first from `App` to `CookieList`.

```jsx
<CookieList deleteCookie={deleteCookie} selectCookie={selectCookie} />
```

4. Now we will pass it from `CookieList` to `CookieItem`.

```jsx
<CookieItem
  cookie={cookie}
  key={cookie.id}
  deleteCookie={props.deleteCookie}
  selectCookie={props.selectCookie}
/>
```

5. Replace the `alert` with our method:

```jsx
<CookieWrapper>
  <img
    alt={cookie.name}
    src={cookie.image}
    onClick={() => props.selectCookie(cookie.id)}
  />
```

6. Let's test it out and check our console. Yay! It's working. But now `selectedCookie` must be saved in `cookie` so that we can see the change. What did we agree on using if we want to change things on our screen? Yes! State! So we will turn `cookie` to a state, and we'll give it an initial state of `cookies[0]`.

```javascript
const [cookie, setCookie] = useState(cookies[0]);
```

7. Let's fix `selectCookie` method to change the value of `cookie`:

```javascript
const selectCookie = cookieId => {
  const selectedCookie = cookies.find(cookie => cookie.id === cookieId);
  setCookie(selectedCookie);
};
```

It's working!

8. But does it make sense to render both `CookieList` and `CookieDetail` at the same time? No! Let's add a conditional operator, but what will our condition be? We can set `cookie`'s default value to `null, and when selecting a cookie it will have a value. And that can be our condition:

```jsx
{
  cookie ? (
    <CookieDetail cookie={cookie} deleteCookie={deleteCookie} />
  ) : (
    <CookieList
      cookies={_cookies}
      selectCookie={selectCookie}
      deleteCookie={deleteCookie}
    />
  );
}
```

9. But our JSX in `App` is already huge, so let's move our condition to its own function:

```javascript
const setView = () => {
  if (cookie)
    return <CookieDetail cookie={cookie} deleteCookie={deleteCookie} />;
  return (
    <CookieList
      cookies={_cookies}
      selectCookie={selectCookie}
      deleteCookie={deleteCookie}
    />
  );
};
```

10. Render it in the components' place:

```jsx
  </>
  {setView()}
</ThemeProvider>
```

11. Don't forget to set `cookie`'s initial value to `null`:

```javascript
const [cookie, setCookie] = useState(null);
```

## Step 3: Fix the Delete

We forgot to add the delete button to our detail page!

1. In `CookieDetail` import `DeleteButton` from `styles` and render it.

```javascript
// Styling
import { DeleteButton, DetailWrapper } from "../styles";
```

```jsx
<DeleteButton>Delete</DeleteButton>
```

Now, we need to pass the `deleteCookie` method as a prop. But we a problem. `deleteCookie` is in `CookieList`, and `CookieList` is in no way connected to `CookieDetail`. So for them to share the same method, we need to place it in `App.js` and pass it as a prop to **both** `CookieList` and `CookieDetail`. We will also need to pass the `_cookies` as a prop from `App`.

2. Move `_cookies` and `deleteCookies` from `CookieList` to `App` and pass it as a prop.

```javascript
function App() {
  const [theme, setTheme] = useState("light");
  const [cookie, setCookie] = useState(null);
  const [_cookies, setCookies] = useState(cookies);

  const deleteCookie = cookieId => {
    const updatedCookies = _cookies.filter(cookie => cookie.id !== +cookieId);
    setCookies(updatedCookies);
    setCookie(null);
  };
```

```jsx
<CookieList
  cookies={_cookies}
  selectCookie={selectCookie}
  deleteCookie={deleteCookie}
/>
```

3. In `CookieList`:

```javascript
const CookieList = props => {
  const cookieList = props.cookies.map(cookie => (
    <CookieItem
      cookie={cookie}
      key={cookie.id}
      deleteCookie={props.deleteCookie}
      selectCookie={props.selectCookie}
    />
  ));

  return <ListWrapper>{cookieList}</ListWrapper>;
};
```

4. Test the delete from the list of cookies, it should work properly.

5. Now pass `deleteCookie` as a prop to `CookieDetail`:

```javascript
const setView = () => {
  if (cookie)
    return <CookieDetail cookie={cookie} deleteCookie={deleteCookie} />;

  return (
    <CookieList
      cookies={_cookies}
      selectCookie={selectCookie}
      deleteCookie={deleteCookie}
    />
  );
};
```

6. In `CookieDetail`:

```jsx
<DeleteButton onClick={() => props.deleteCookie(cookie.id)}>
  Delete
</DeleteButton>
```

7. Let's try it out. Nothing happened. But if you check `cookies` in React Dev Tools, you'll see that the cookie is being deleted. But the problem is that `cookie` has the cookie saved inside it, that's why we're not returned to the list page.

8. To do that, we will set `cookie` to `null` in `deleteCookie`:

```javascript
const deleteCookie = cookieId => {
  const updatedCookies = _cookies.filter(cookie => cookie.id !== +cookieId);
  setCookies(updatedCookies);
  setCookie(null);
};
```
