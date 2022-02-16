import React from 'react';
import Form from "./form.jsx";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('Test if Form is rendering correctly', () => {
  it('will print GO! to the screen on a button', () => {
    render(<Form />)
    let dataFromScreen = screen.getByText('GO!');
    expect(dataFromScreen).toBeInTheDocument();
  })

  it('should change state when one of the methods are clicked', () => {
    render(<Form />)
    jest.spyOn(React, "useState");

    let getBtn = screen.getByTestId('get');
    fireEvent.click(getBtn);
    let putBtn = screen.getByTestId('put');
    fireEvent.click(putBtn);
    let postBtn = screen.getByTestId('post');
    fireEvent.click(postBtn);
    let deleteBtn = screen.getByTestId('delete');
    fireEvent.click(deleteBtn);

    expect(React.useState).toHaveBeenCalledTimes(4);
  })
})