import { useState } from 'react';
import './styles.css';

type Props = {
  onSearch: Function;
}

export default function SearchBar({ onSearch }: Props) {

  const [text, setText] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSearch(text);
  }

  const handleChange = (event: any) => {
    setText(event.target.value);
  }

  const handleResetClick = () => {
    setText("");
    onSearch(text);
  }

    return(
        <form className="dsc-search-bar" onSubmit={handleSubmit}>
        <button type="submit">🔎︎</button>
        <input 
        value={text}
        type="text" 
        placeholder="Nome do produto" 
        onChange={handleChange}
        />
        
        <button onClick={handleResetClick}>🗙</button>
      </form>
    );
}