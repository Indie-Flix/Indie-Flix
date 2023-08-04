import React, { useState } from 'react';
import '../styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Comes from clicking the edit button from the Studio's uploaded video section of the main page
const EditForm = ({ id, fetchVideos, data, getFeed }) => {
  //logic should be very similar to uploadform setup'

  const [formData, setFormData] = useState({
    title: '',
    credits: '',
    videoUrl: '',
    description: '',
    thumbnail: '',
    genre: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`api/videos/${id}`, {
        method:'DELETE',
      });
      if (response.status === 204) {
        console.log('Video delete success.');
        fetchVideos();
        getFeed();
      }
    } catch (err) {
      console.log('Error while deleting video:', err.message);
    }
  };
  
  /**
   * I think its more of that bootstrap stuff. yeah gonna eat see you after dinner
   * see ya
   * */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/videos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        // console.log('Video updated successfully!');
        fetchVideos();
        getFeed();
      }
    } catch (err) {
      console.log('Error while updating the video:', err.message);
    }
  };
  
  return (
    <div className='modal fade' id={`edit-modal-${id}`}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='d-flex justify-content-between m-2'>
            <h1>Edit Your Film Information</h1>
            <button className='btn-close' data-bs-dismiss='modal'></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleUpdate} id='edit-form'>
              <div className='form-floating mb-3'>
                <input
                  name='title'
                  type='text'
                  id='edit-title'
                  className='form-control'
                  placeholder='Place title here'
                  value={ formData.title }
                  onChange={handleChange}
                />
                <label htmlFor='edit-title' className='form-label'>
                  Title
                </label>
              </div>
              <div className='form-floating mb-3'>
                <input
                  name='credits'
                  type='text'
                  id='edit-credits'
                  className='form-control'
                  placeholder='Place credits here'
                  value={ formData.credits }
                  onChange={handleChange}
                />
                <label htmlFor='edit-credits' className='form-label'>
                  Credits/Creators
                </label>
              </div>
              <div className='form-floating mb-3'>
                <input
                  name='videoUrl'
                  type='text'
                  id='edit-vidURL'
                  className='form-control'
                  placeholder='Place URL here'
                  value={ formData.videoUrl }
                  onChange={handleChange}
                />
                <label htmlFor='edit-vidURL' className='form-label'>
                  URL for your Video
                </label>
              </div>
              <div className='form-floating mb-3'>
                <textarea
                  name='description'
                  className='form-control'
                  placeholder='Leave a desc'
                  value={ formData.description }
                  onChange={handleChange}
                  id='floatingTextarea2'
                  style={{ height: '100px' }}
                ></textarea>
                <label htmlFor='floatingTextarea2'>Description</label>
              </div>
              <div className='form-floating mb-3'>
                <input
                  name='thumbnail'
                  type='text'
                  id='edit-thumbURL'
                  className='form-control'
                  placeholder='Place URL here'
                  value={ formData.thumbnail }
                  onChange={handleChange}
                />
                <label htmlFor='edit-thumbURL' className='form-label'>
                  URL for your Thumbnail
                </label>
                <div>
                  <label htmlFor='genre'>Choose a genre</label>
                  <br />
                  <select name='genre' value={ formData.genre } onChange={ handleChange }>
                    <option value='action'>Action</option>
                    <option value='comedy'>Comedy</option>
                    <option value='drama'>Drama</option>
                    <option value='romance'>Romance</option>
                    <option value='horror'>Horror</option>
                    <option value='western'>Western</option>
                    <option value='sci-fi'>Sci-Fi</option>
                  </select>
                </div>
              </div>
              <div className='d-flex justify-content-between'>
                <button type='submit' className='btn btn-success' data-bs-dismiss='modal' > 
                  Submit
                </button>
                <button className='btn btn-danger' data-bs-dismiss='modal' onClick={() => handleDelete()}>
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
