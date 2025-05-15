import React from 'react';
import './EditorButton.css';

export const EditorButton = ({ isActive, onClose }) => {

    function handleClick() {
        // Optional: Handle tab activation or other logic
        console.log("Editor tab clicked");
    }

    function closeButton(e) {
        e.stopPropagation(); // Prevent triggering the parent button's click
        onClose();           // Call the prop correctly (with capital C!)
    }

    return (
        <button
            className='editor-button'
            style={{
                color: isActive ? 'white' : '#959eba',
                backgroundColor: isActive ? '#303242' : '#4a4859',
                borderTop: isActive ? '1px solid #ff79c8' : 'none'
            }}
            onClick={handleClick}
        >
            file.js
            <span 
                onClick={closeButton}
                style={{ marginLeft: '10px', cursor: 'pointer', backgroundColor:' #4b4242 ', borderRadius: '20%', width: '20px', height: '20px', padding: '3px' }}
            >
                X
            </span>
        </button>
    );
};
