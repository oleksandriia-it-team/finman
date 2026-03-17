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

## CSS & Tailwind

- Use Tailwind for layout, spacing, positioning, and colors
- Use CSS files for animations, complex transitions, and pseudo-elements
- When a component has too many Tailwind classes, extract it into a separate component
- CSS class names in kebab-case (see Naming conventions)
- Use CSS files for media queries, avoid Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)

## Links
- [Eslint](../eslint.config.mjs)
- [Prettier](../.prettierrc)