import React, { useEffect, useState, useTransition } from 'react';
import styles from './autoComplete.module.css';

type Movie = {
  id: number;
  label: string;
  year: number;
};

const ArrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const films: Array<Movie> = [
  { id: 1, label: 'The Shawshank Redemption', year: 1994 },
  { id: 2, label: 'The Godfather', year: 1972 },
  { id: 3, label: 'The Godfather: Part II', year: 1974 },
  { id: 4, label: 'The Dark Knight', year: 2008 },
  { id: 5, label: '12 Angry Men', year: 1957 },
  { id: 6, label: "Schindler's List", year: 1993 },
  { id: 7, label: 'Pulp Fiction', year: 1994 },
];

function AutoComplete() {
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<Array<Movie>>([]);
  const [suggestions, setSuggestion] = useState<Array<Movie>>([]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('key up my friend', search, event.key, ArrowKeys.includes(event.key));

    if (ArrowKeys.includes(event.key)) {
      return;
    }

    const filtered = options.filter((movie) => {
      return movie.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });

    console.log(filtered);

    startTransition(() => {
      setSuggestion(filtered);
    });
  };

  useEffect(() => {
    setOptions(films);
  }, []);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={search}
        onChange={onInputChange}
        onKeyUp={onKeyUp}
        placeholder="Search your favorite movie"
      />
      <ul className={styles.suggestions}>
        {suggestions.map((suggestion) => {
          return (
            <li key={suggestion.id} tabIndex={0}>
              {suggestion.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AutoComplete;
