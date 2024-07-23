import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import BaseTable from './base-table.tsx';

it('should render a button', () => {
  // arrange
  render(<BaseTable>Click Me!</BaseTable>);

  // assert
  expect(screen.getByRole('button', { name: 'Click Me!' })).toBeInTheDocument();
});

it('should call onClick when clicked', async () => {
  // arrange
  const onClick = vi.fn();
  render(<BaseTable>Click Me!</BaseTable>);

  // action
  await userEvent.click(screen.getByRole('button', { name: 'Click Me!' }));

  // assert
  expect(onClick).toHaveBeenCalled();
});
