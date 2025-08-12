
import React, { useState } from 'react';
import './App.css';

export default function CommentSection() {
    const [commentText, setCommentText] = useState('');
    const [savedComments, setSavedComments] = useState([]);
    const [isActive, setIsActive] = useState(false); // NEW STATE

    //function to save current comment 
    const handleSaveComment = () => {
        //ignore empty comments
        if (commentText.trim() === '') return;

        //Add current comment to array of saved comments 
        setSavedComments((prev) => [...prev, commentText]);

        //clear textbox 
        setCommentText('');
        setIsActive(false); // Hide buttons after saving
    };

    const handleCancel = () => {
        setCommentText('');
        setIsActive(false); // Hide buttons after cancel
    };

    return (
        <div className="comment-section">
            <h3>Comments</h3>

            <div className="saved-comments-list">
                {/*display array of comments*/}
                {savedComments.map((comment, idx) => (
                    <div key={idx} className="saved-comment">
                        {comment}
                    </div>
                ))}
            </div>

            <textarea
                className="comment-textarea"
                value={commentText}
                onFocus={() => setIsActive(true)}                       // Activate on focus
                onChange={(e) => setCommentText(e.target.value)}        //update commentText 
                placeholder="Make a comment..."
            />

            {/*if in an active state, display buttons */}
            {isActive && (

                <div className="comment-buttons">
                    <button onClick={handleSaveComment} className="save-comment-btn">
                        Save
                    </button>
                    <button onClick={handleCancel} className="cancel-comment-btn">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

