import React from 'react';
import { useGetAllPostsQuery, useAddCommentMutation, useLikePostMutation } from '../redux/postSlice';
import { Comments } from '../sections/Comments';

export const Home = () => {
  const { data: posts, isLoading, isError } = useGetAllPostsQuery();
  const [addComment] = useAddCommentMutation();
  const [likePost] = useLikePostMutation();

  const handleAddComment = async (postId, text) => {
    try {
      await addComment({ postId, text }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await likePost({ postId }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts</div>;

  return (
    <div>
      {posts.posts.map(post => (
        <div key={post._id} className="flex flex-col justify-center items-center py-7">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full py-4">
            <div className="mb-1 p-3">
              <div className='flex justify-between'>
                <span className="text-gray-800 font-semibold">{post.user.username}</span>
                <button>+Follow</button>
              </div>
              <span className="text-gray-600 text-sm">2 hours ago</span>
            </div>
            <div className="p-3">
              <p className="text-gray-700 leading-tight mb-4">{post.content}</p>
            </div>
            <img src={`http://localhost:8080/api/${post.image}`} alt="Post" className="w-full h-64 object-cover" />
            <div className='flex p-3 gap-2'>
              <button onClick={() => handleLikePost(post._id)}>Like</button>
              <button onClick={() => handleAddComment(post._id, 'Sample Comment')}>Comment</button>
            </div>
            <Comments postId={post._id} />
          </div>
        </div>
      ))}
    </div>
  );
};
