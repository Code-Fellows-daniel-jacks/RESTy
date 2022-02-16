import Results from "./funIndex";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

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
    let propString = JSON.stringify(props);

    render(<Results props={propString} />)
    let dataFromScreen = screen.getByText('charmander');
    expect(dataFromScreen).toBeInTheDocument();
  })
})