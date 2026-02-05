import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Input } from './index';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input label="Email" id="email" placeholder="Enter email" />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const handleChange = vi.fn();
    const { user } = render(<Input label="Email" id="email" onChange={handleChange} />);

    await user.type(screen.getByLabelText('Email'), 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with password type', () => {
    render(<Input label="Password" id="password" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('shows error message when error prop is provided', () => {
    render(<Input label="Email" id="email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies error styles when error prop is provided', () => {
    render(<Input label="Email" id="email" error="Invalid email" />);
    expect(screen.getByLabelText('Email')).toHaveClass('border-red-500');
  });

  it('has required attribute when required prop is true', () => {
    render(<Input label="Email" id="email" required />);
    expect(screen.getByLabelText('Email')).toBeRequired();
  });

  it('applies custom className to input', () => {
    render(<Input label="Email" id="email" className="custom-class" />);
    expect(screen.getByLabelText('Email')).toHaveClass('custom-class');
  });
});
