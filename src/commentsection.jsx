
import React, { useState } from 'react';
import './App.css';

export default function CommentSection() {
    const [commentText, setCommentText] = useState('');
    const [savedComments, setSavedComments] = useState([]);
    const [isActive, setIsActive] = useState(false); // NEW STATE

    const handleSaveComment = () => {
        if (commentText.trim() === '') return;
        setSavedComments((prev) => [...prev, commentText]);
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
                {savedComments.map((comment, idx) => (
                    <div key={idx} className="saved-comment">
                        {comment}
                    </div>
                ))}
            </div>

            <textarea
                className="comment-textarea"
                value={commentText}
                onFocus={() => setIsActive(true)} // Activate on focus
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Make a comment..."
            />

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

