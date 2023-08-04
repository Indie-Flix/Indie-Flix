import React from 'react';
import '../styles.scss';

const Genre = ({ getByGenre }) => {
  return (
    <form>
      <label htmlFor='genre'>Filter by genre </label>
      <br/>
      <select name='genre' onChange={getByGenre}>
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