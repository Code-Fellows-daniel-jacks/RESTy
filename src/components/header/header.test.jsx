import Header from "./header.jsx";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Should output results from API call', () => {
  it('will print props.data to the screen', () => {
    render(<Header />)
    let dataFromScreen = screen.getByText('RESTy');
    expect(dataFromScreen).toBeInTheDocument();
  })
})