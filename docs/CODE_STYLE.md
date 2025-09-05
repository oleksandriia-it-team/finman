# Code style requirements

## Naming conventions
- PascalCase: classes, global constants such as ErrorTexts, components, interfaces, types, keys in enums, keys in global constants
```js
export default function MainPage(children) {
  return (
    <div className="size-full">
      { children }
    </div>
  )
}
```

- camelCase: variables, utilities, keys in objects, class methods,
```js
const authService = useInject(AuthServiceProvider, true);

authService.getUser().catch(err => {
  if(err === ErrorTexts.UnknownError || isEmpty(err)) {
    // do something
  }
});
```

- kebab-case: CSS class names and folder names
```css
.header-wrapper {
    width: 100%;
    height: 3rem;
    
    .header {
        background: red;
    }
}
```

- kebab-case + postfix: file names
```
shared
├─ is-empty.util.ts
```

## Code style
- Single quotes
```js 
console.log('Hello world');
```

- Whitespaces in brackets
```js 
import { something } from 'package';
```

- Tabulation style aligned to parent 
```js
<MyComponent
  firstProp="value"
  secondProp="value"
/>
```

## Links
- [Article about naming styles](https://medium.com/@alivander/camel-pascal-snake-case-%D0%B8-%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D0%B5-%D1%81%D1%82%D0%B8%D0%BB%D0%B8-%D0%BD%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D1%8F-288ec62ca0d0)