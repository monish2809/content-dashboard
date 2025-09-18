import { render, screen } from '@testing-library/react';
import Card from '@/components/Card';

describe('Card Component', () => {
  const item = {
    id: '1',
    title: 'Test News',
    description: 'This is a test description',
    image: '/test.jpg',
    type: 'news' as const,
    url: 'https://example.com',
  };

  test('renders card with correct data', () => {
    render(<Card item={item} index={0} moveCard={jest.fn()} />);
    expect(screen.getByText('Test News')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
    expect(screen.getByText('Read More')).toHaveAttribute('href', 'https://example.com');
  });
});