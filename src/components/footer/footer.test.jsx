import Footer from "./funIndex";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('Should output results from API call', () => {
  it('will print props.data to the screen', () => {
    render(<Footer />)
    let dataFromScreen = screen.getByText('© 2018');
    expect(dataFromScreen).toBeInTheDocument();
  })
})