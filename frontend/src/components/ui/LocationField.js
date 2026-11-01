"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import styles from "./LocationField.module.css";

function LocationField({
  placeholder,
  options = [],
  value,
  onChange,
  title = "پرتردد",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  const isFiltering = query !== "" && query !== value?.name;
  const filtered = isFiltering
    ? options.filter((o) => o.name.includes(query))
    : options;

  const closeDropdown = () => {
    setIsOpen(false);
    setQuery("");
  };

  const selectHandler = (option) => {
    onChange(option);
    closeDropdown();
  };

  const focusHandler = (e) => {
    setQuery(value?.name ?? "");
    setIsOpen(true);
    e.target.select(); 
  };

  const changeHandler = (e) => {
    const text = e.target.value;
    setQuery(text);
    setIsOpen(true);
    if (text === "") onChange(null); 
  };

  const keyHandler = (e) => {
    if (e.key === "Escape") closeDropdown();
    if (e.key === "Enter" && isOpen) {
      e.preventDefault(); 
      if (filtered.length > 0) selectHandler(filtered[0]);
    }
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.field}>
        <Image src="/images/location.svg" width={20} height={20} alt="" />
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={isOpen ? query : (value?.name ?? "")}
          onFocus={focusHandler}
          onChange={changeHandler}
          onKeyDown={keyHandler}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listId}
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {!isFiltering && <p className={styles.title}>{title}</p>}
          <ul id={listId} role="listbox">
            {filtered.length === 0 && (
              <li className={styles.empty}>موردی یافت نشد</li>
            )}
            {filtered.map((option) => (
              <li
                key={option.id}
                role="option"
                aria-selected={value?.id === option.id}
              >
                <button type="button" onClick={() => selectHandler(option)}>
                  <Image
                    src="/images/location.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LocationField;
