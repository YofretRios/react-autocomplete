import React, { useEffect, useState, useRef, useMemo } from 'react';
import useSuggestions from '../hooks/useAsync';
import { getCountrySuggestions } from '../api';
import styles from './autoComplete.module.css';
import { Country } from '../types';
import isVisible from '../utils/isVisible';
import debounce from '../utils/debounce';

const NavKeys = ['ArrowUp', 'ArrowDown', 'Enter'];

function AutoComplete() {
  const { state: { suggestions }, run } = useSuggestions({ status: 'idle' });
  const suggestionContainer = useRef<HTMLUListElement>(null);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(0);

  const debounceRun = useMemo(() => debounce((search: string) => {
    const promise = getCountrySuggestions(search);

    run(promise)
  }, 150), [run]);

  useEffect(() => {
    if (search !== '') {
      debounceRun(search)
    }
  }, [search, debounceRun]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (NavKeys.includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();

      if (event.key === 'Enter' && suggestions.length > 0) {
        selectOption(suggestions[focused]);

        return;
      }

      const next = focused + (event.key === 'ArrowDown' ? 1 : -1);

      if (next < 0 || next >= suggestions.length) {
        return;
      }

      if (suggestionContainer.current) {
        const liElement = suggestionContainer.current.childNodes[next] as HTMLLIElement
        if (!isVisible(liElement, suggestionContainer.current)) {
          liElement.scrollIntoView(false)
        }
      }

      setFocused(next);
    }
  };

  const onMouseEnter = (index: number) => () => {
    setFocused(index);
  };

  const selectOption = (country: Country) => {
    setSearch(country.common);
  };

  const highlighKeyWord = (common: string, official: string) => {
    const pattern = new RegExp(search, 'igm');
    const compose = `${common} / ${official}`

    let replaced = compose.replace(pattern, (match) => `<mark>${match}</mark>`);

    return { __html: replaced };
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={search}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Search your favorite movie"
      />
      <ul ref={suggestionContainer} className={styles.suggestions}>
        {suggestions.map((suggestion, index) => {
          const focusedClass = index === focused ? styles.focused : '';

          return (
            <li
              key={suggestion.ccn3}
              className={focusedClass}
              onClick={() => selectOption(suggestion)}
              onMouseEnter={onMouseEnter(index)}
              dangerouslySetInnerHTML={highlighKeyWord(suggestion.common, suggestion.official)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default AutoComplete;
