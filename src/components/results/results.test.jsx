import Results from "./results.jsx";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Should output results from API call', () => {
  it('will print props.data to the screen', () => {
    let props = {
      data: {
        count: 1118,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        previous: null,
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
          },
          {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon/2/"
          },
          {
            name: "venusaur",
            url: "https://pokeapi.co/api/v2/pokemon/3/"
          },
          {
            name: "charmander",
            url: "https://pokeapi.co/api/v2/pokemon/4/"
          },
        ]
      }
    }

    render(<Results data={props} />)
    let dataFromScreen1 = screen.getByText(/\bbulbasaur\b/gm);
    let dataFromScreen2 = screen.getByText(/\bivysaur\b/gm);
    let dataFromScreen3 = screen.getByText(/\bvenusaur\b/gm);
    let dataFromScreen4 = screen.getByText(/\bcharmander\b/gm);
    expect(dataFromScreen1).toBeInTheDocument();
    expect(dataFromScreen2).toBeInTheDocument();
    expect(dataFromScreen3).toBeInTheDocument();
    expect(dataFromScreen4).toBeInTheDocument();
  })
})