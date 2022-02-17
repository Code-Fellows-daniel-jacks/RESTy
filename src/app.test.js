import React from 'react';
import App from './app.js';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const fakeResponse = rest.get('fakeurlthing.com', (req, res, ctx) => {
  return res(ctx.json({ id: 1, userId: 1, data: 'test' }))
});
const handler = fakeResponse;
const server = new setupServer(handler);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



xdescribe('Test if Form is rendering correctly', () => {

  it('should change state when one of the methods are clicked', async () => {
    jest.spyOn(React, 'useEffect');
    render(<App />);

    let setLoading = jest.fn();

    let putBtn = screen.getByTestId('GO');
    fireEvent.click(putBtn);
    expect(setLoading).toHaveBeenCalledTimes(1);
  })
})