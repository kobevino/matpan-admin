# UI Component: $ARGUMENTS

Create a reusable UI component following project conventions.

## Instructions

Create a new UI component with the following structure:

```
src/components/ui/$ARGUMENTS/
├── index.tsx        # Component implementation
├── index.css        # Styles (if needed)
└── index.test.tsx   # Unit tests
```

## Requirements

1. **Location**: All UI components must be placed in `src/components/ui/[ComponentName]/`

2. **File Structure**:
   - `index.tsx` - Main component file with TypeScript
   - `index.css` - Component-specific styles (only if needed)
   - `index.test.tsx` - Unit tests using Vitest and React Testing Library

3. **Component Guidelines**:
   - Make the component reusable and composable
   - Use TypeScript with proper prop types interface
   - Export the component as named export
   - Support `className` prop for style customization
   - Use Tailwind CSS for styling
   - Follow accessibility best practices (ARIA attributes, keyboard navigation)

4. **Test Requirements**:
   - Write tests FIRST (TDD approach)
   - Test rendering with default props
   - Test all prop variations
   - Test user interactions
   - Test accessibility requirements

## Example Structure

```tsx
// src/components/ui/Button/index.tsx
import type { ComponentProps } from 'react';
import './index.css';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

```tsx
// src/components/ui/Button/index.test.tsx
import { render, screen } from '@/test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './index';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Button variant="secondary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Button</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

## Steps

1. Create the component folder: `src/components/ui/$ARGUMENTS/`
2. Write failing tests first in `index.test.tsx`
3. Implement the component in `index.tsx`
4. Add styles in `index.css` if needed
5. Run `pnpm test:run` to verify tests pass
6. Run `pnpm lint` to check code quality
7. Verify with MCP Playwright if visual verification is needed
