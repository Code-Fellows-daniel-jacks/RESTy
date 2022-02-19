import React from 'react';
import { act } from 'react-dom/test-utils';
import App from './app.js';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const fakeResponse = rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
  return res(ctx.json({
    "id": 1,
    "userId": 1,
    "data": "test"
  }));
});
const server = new setupServer(fakeResponse);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



describe('Test if Form is rendering correctly', () => {

  it('should change state when one of the methods are clicked', async () => {
    render(<App />)

    let urlArea = screen.getByTestId('urlArea');
    fireEvent.change(urlArea, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    let getBtn = screen.getByTestId('get');
    fireEvent.click(getBtn)
    let goBtn = screen.getByTestId('GO');

    act(() => {
      fireEvent.click(goBtn);
    });

    // const data = await screen.findByText('userId');
    expect().toBeVisible();
  })
})