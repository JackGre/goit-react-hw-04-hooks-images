import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { toast } from "react-toastify";




export default function SearchBar({ onSubmit }) {
    const [value, setValue] = useState("");
   

    const handleNameImag = e => {
        setValue(e.target.value.toLowerCase())
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (value.trim() === '') {            
            toast("Введите имя изображения!!!");
            return;
        }
        onSubmit(value);
        setValue("");                
    }

    return (
            
            <header className={styles.Searchbar}>
                <form onSubmit={handleSubmit} className={styles.SearchForm}>
                    <button type="submit" className={styles.button}>
                        <span className="styles.SearchForm-button-label">Поиск</span>
                    </button>

                    <input
                       onChange={handleNameImag}
                       className={styles.input}
                       type="text"
                       autoComplete="off"
                       autoFocus
                       placeholder="Поиск изображения и фото"
                       value={value}
                    />
                </form>
            </header>
        );
    
}