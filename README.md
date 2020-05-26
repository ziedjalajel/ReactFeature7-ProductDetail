# Cookie Detail

## Discussion

**Topics to discuss:**

- State to switch rendered UI

In today's class we will add a cookie detail page using the concepts that we already know.

## Step 1: Create Detail Component

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
