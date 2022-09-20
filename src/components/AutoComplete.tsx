import React, { useEffect, useState, useTransition } from 'react';
import styles from './autoComplete.module.css';

type Movie = {
  id: number;
  label: string;
  year: number;
};

const NavKeys = ['ArrowUp', 'ArrowDown', 'Enter'];

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
  const [focused, setFocused] = useState(0);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    if (event.target.value === '') {
      setSuggestion([]);

      return;
    }

    startTransition(() => {
      const filtered = options.filter((movie) => {
        return (
          movie.label.toLowerCase().indexOf(event.target.value.toLowerCase()) >
          -1
        );
      });

      setSuggestion(filtered);
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (NavKeys.includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();

      if (event.key === 'Enter' && suggestions.length > 0) {
        setSearch(suggestions[focused].label);
        setSuggestion([]);

        return
      }

      const next = focused + (event.key === 'ArrowDown' ? 1 : -1);

      if (next < 0 || next >= suggestions.length) {
        return;
      }

      setFocused(next);
    }
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
        onKeyDown={onKeyDown}
        placeholder="Search your favorite movie"
      />
      <ul className={styles.suggestions}>
        {suggestions.map((suggestion, index) => {
          const focusedClass = index === focused ? styles.focused : '';

          return (
            <li key={suggestion.id} className={focusedClass}>
              {suggestion.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AutoComplete;
