import React, { useEffect, useState, useRef, useMemo } from 'react';
import useSuggestions from '../../hooks/useSuggestions';
import { getCountrySuggestions } from '../../api';
import styles from './autoComplete.module.css';
import { Country } from '../../types';
import isVisible from '../../utils/isVisible';
import debounce from '../../utils/debounce';
import highlightKeyWord from '../../utils/highlightKeyword';

const NavKeys = ['ArrowUp', 'ArrowDown', 'Enter'];

type AutoCompleteProps = {
  onChange: (event: string) => void;
  search: string;
};

function AutoComplete({ onChange, search }: AutoCompleteProps) {
  const {
    state: { suggestions },
    run,
  } = useSuggestions({ status: 'idle' });
  const suggestionContainer = useRef<HTMLUListElement>(null);
  const [focused, setFocused] = useState(0);

  const debounceRun = useMemo(
    () =>
      debounce((search: string) => {
        const promise = getCountrySuggestions(search);
        run(promise);
      }, 150),
    [run],
  );

  useEffect(() => {
    debounceRun(search);
  }, [search, debounceRun]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
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
        const liElement = suggestionContainer.current.childNodes[
          next
        ] as HTMLLIElement;
        if (!isVisible(liElement, suggestionContainer.current)) {
          liElement.scrollIntoView(false);
        }
      }

      setFocused(next);
    }
  };

  const onMouseEnter = (index: number) => () => {
    setFocused(index);
  };

  const selectOption = (country: Country) => {
    onChange(country.common);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={search}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Type in a Country name"
      />
      <ul ref={suggestionContainer} className={styles.suggestions}>
        {suggestions.map((suggestion, index) => {
          const focusedClass = index === focused ? styles.focused : '';
          const compose = `${suggestion.common} / ${suggestion.official}`;

          return (
            <li
              key={suggestion.ccn3}
              className={focusedClass}
              onClick={() => selectOption(suggestion)}
              onMouseEnter={onMouseEnter(index)}
              dangerouslySetInnerHTML={highlightKeyWord(compose, search)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default AutoComplete;
