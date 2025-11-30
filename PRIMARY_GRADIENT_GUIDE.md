# Primary Gradient Color System

## Overview
Your primary color is now set to a beautiful gradient: `linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%)`

## CSS Variables Available

```css
--gradient-start: #FF7CE5;
--gradient-end: #5D5FEF;
--primary-gradient: linear-gradient(90deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
--primary: #FF7CE5; /* Fallback solid color */
```

## Usage Guide

### 1. **Gradient Backgrounds** ✨
Use `bg-primary-gradient` for gradient backgrounds:

```tsx
<div className="bg-primary-gradient">
  Gradient background
</div>

<button className="bg-primary-gradient hover:opacity-90">
  Click me
</button>
```

### 2. **Gradient Text** 📝
Use `text-primary-gradient` for gradient text:

```tsx
<h1 className="text-primary-gradient text-4xl font-bold">
  Beautiful Gradient Text
</h1>
```

### 3. **Gradient Borders** 🎨
Use `border-primary-gradient` for gradient borders:

```tsx
<div className="border-primary-gradient p-4 rounded-lg">
  Content with gradient border
</div>
```

### 4. **Solid Primary Color** (Fallback)
When you use `bg-primary` or `text-primary`, it will use the solid fallback color (#FF7CE5):

```tsx
<div className="bg-primary text-primary-foreground">
  Solid primary background
</div>
```

### 5. **Custom Tailwind Gradients**
You can also use Tailwind's gradient utilities with the gradient colors:

```tsx
<div className="bg-gradient-to-r from-primary-start to-primary-end">
  Custom gradient direction
</div>

<div className="bg-gradient-to-br from-primary-start to-primary-end">
  Diagonal gradient
</div>
```

## Examples

### Button with Gradient
```tsx
<button className="bg-primary-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
  Gradient Button
</button>
```

### Card with Gradient Border
```tsx
<div className="border-primary-gradient bg-white p-6 rounded-xl">
  <h2 className="text-primary-gradient text-2xl font-bold">Card Title</h2>
  <p>Card content</p>
</div>
```

### Heading with Gradient Text
```tsx
<h1 className="text-primary-gradient text-5xl font-bold">
  Amazing Gradient Heading
</h1>
```

### Mixed Usage
```tsx
<div className="bg-primary-gradient p-8 rounded-2xl">
  <h2 className="text-white text-3xl font-bold mb-4">
    White text on gradient background
  </h2>
  <div className="bg-white p-4 rounded-lg">
    <p className="text-primary-gradient font-semibold">
      Gradient text on white background
    </p>
  </div>
</div>
```

## Important Notes

⚠️ **Limitations:**
- `bg-primary` will use the solid fallback color (#FF7CE5), not the gradient
- For gradients, always use `bg-primary-gradient`
- `text-primary` will use the solid color; use `text-primary-gradient` for gradient text

✅ **Best Practices:**
- Use `bg-primary-gradient` for buttons, headers, and accent elements
- Use `text-primary-gradient` for headings and important text
- Use `hover:opacity-90` or `hover:opacity-80` for hover effects on gradients
- The gradient works in both light and dark mode

## Color Values
- **Start Color:** #FF7CE5 (Pink)
- **End Color:** #5D5FEF (Purple)
- **Direction:** Left to Right (90deg)
