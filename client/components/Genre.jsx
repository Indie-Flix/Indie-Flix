import React, { useState } from 'react';
import '../styles.scss';

const Genre = () => {
  // action, comedy, drama, romance, horror, western, sci-fi
  const [genre, setGenre] = useState('');

	const handleChange = (event) => {
    const { name, value } = event.target;

    
	}

  return (
    <form>
      <label htmlFor='genre'>Choose a genre</label>
      <select onChange={handleChange} name='genre'>
        <option value='action'>Action</option>
        <option value='comedy'>Comedy</option>
        <option value='drama'>Drama</option>
        <option value='romance'>Romance</option>
        <option value='horror'>Horror</option>
        <option value='western'>Western</option>
        <option value='sci-fi'>Sci-Fi</option>
      </select>
    </form>
  );
};

export default Genre;