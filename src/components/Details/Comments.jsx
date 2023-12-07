import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import './comments.css'
const Comments = ({ petId }) => {
  const commentsCollectionRef = collection(db, "comments");
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const commentsQuery = query(commentsCollectionRef, where('petId', '==', petId));
      const commentsSnapshot = await getDocs(commentsQuery);

      const commentsData = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [petId]);

  const addComment = async (commentText) => {
    try {
      await addDoc(commentsCollectionRef, {
        petId,
        text: commentText,
        // Add other comment fields as needed
      });
      // After adding the comment, you may want to fetch the updated comments
      fetchComments();
      // Clear the new comment input field
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddComment = () => {
    // Your comment addition logic here
    addComment(newComment);
  };

  return (
    
    <div className="comments-container">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
        </div>
      ))}
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default Comments;