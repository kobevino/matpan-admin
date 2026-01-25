import App from './App';
import { render, screen } from './test/test-utils';

describe('App', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText('Matpan Admin')).toBeInTheDocument();
  });
});
