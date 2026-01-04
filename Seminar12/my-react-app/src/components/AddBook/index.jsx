// AddBookModal.jsx
import React, { useState } from 'react';
import "./style.css"

const AddBookModal = ({ onClose, onAddBook }) => {
  // 1. Local state for the form fields
  const [formData, setFormData] = useState({
    title: '', author: '', year: '', pages: ''
  });

  // 2. Handle typing in the inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pass the data up to the parent
    onAddBook(formData);
    
    // Reset the form and close
    setFormData({ title: '', author: '', year: '', pages: '' });
    onClose();
  };

  return (
    <dialog open className="modal">
      <form onSubmit={handleSubmit} id="addBookForm">
        <h3>Add a New Book</h3>
        
        <div className="input-group">
          <label htmlFor="title">Book Title</label>
          <input 
            type="text" name="title" placeholder="e.g. The Hobbit" required 
            value={formData.title} onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="author">Author Name</label>
          <input 
            type="text" name="author" placeholder="e.g. J.R.R. Tolkien" required 
            value={formData.author} onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="year">Year of Publication</label>
          <input 
            type="number" name="year" placeholder="e.g. 1937" 
            value={formData.year} onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="pages">Number of Pages</label>
          <input 
            type="number" name="pages" placeholder="e.g. 310" 
            value={formData.pages} onChange={handleInputChange}
          />
        </div>

        <button type="submit">Add Book</button>
        <button 
          type="button" 
          style={{backgroundColor: '#e74c3c', marginTop: '10px'}} 
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </dialog>
  );
};

export default AddBookModal;