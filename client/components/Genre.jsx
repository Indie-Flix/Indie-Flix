import React, { useState } from 'react';
import '../styles.scss';

const Genre = ({ getByGenre }) => {
  // action, comedy, drama, romance, horror, western, sci-fi


  return (
    <form>
      <label htmlFor='genre'>Choose a genre </label>
      {/*Add on change function here!*/}
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