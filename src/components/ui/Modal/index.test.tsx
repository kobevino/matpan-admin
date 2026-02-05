import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Modal } from './index';

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Title">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const { user } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>,
    );

    // Get the close button inside the modal (not the backdrop)
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const handleClose = vi.fn();
    const { user } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>,
    );

    await user.click(screen.getByRole('button', { name: /close modal/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', async () => {
    const handleClose = vi.fn();
    const { user } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>,
    );

    await user.click(screen.getByText('Content'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const handleClose = vi.fn();
    const { user } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>,
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('applies sm size variant', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-sm');
  });

  it('applies md size variant by default', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-md');
  });

  it('applies lg size variant', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-lg');
  });

  it('applies xl size variant', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} size="xl">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-xl');
  });

  it('applies custom className to modal', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-modal');
  });

  it('has proper accessibility attributes', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Accessible Modal">
        <p>Content</p>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });

  it('focuses the modal when opened', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveFocus();
  });
});
