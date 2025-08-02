import { useState } from "react";
import emptyDp from "../assets/emptyDp.jpg";
import moment from "moment";

import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { LuSendHorizontal } from "react-icons/lu";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useEffect } from "react";
const Posts = ({
  id,
  description,
  author,
  image,
  like,
  comment,
  createdAt,
}) => {
  const { userData, setUserData, getAllPosts } = useContext(UserDataContext);

  const [readMore, setReadMore] = useState(false);
  const { serverURL } = useAuthContext();
  const [likes, setLikes] = useState(like || []);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState(comment || []);

  // post like fucntion
  const handleLikePost = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/post/like/${id}`, {
        withCredentials: true,
      });

      setLikes(response.data.like);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  // post comment fucntion
  const handleCommentPost = async (e) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      return; // prevent empty or whitespace-only comments
    }

    try {
      const response = await axios.post(
        `${serverURL}/api/post/comment/${id}`,
        { content: commentContent },
        {
          withCredentials: true,
        }
      );

      setComments(response.data.post.comment);
      setCommentContent("");
    } catch (error) {
      console.error("Error commenting post:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="w-full min-h-[500px] flex flex-col gap-[20px]  bg-white rounded-lg shadow-lg p-[20px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-start gap-[10px]">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
            <img
              src={author.profileImage || emptyDp}
              alt=""
              className="h-full"
            />
          </div>
          <div>
            <div className="text-[22px] font-semibold">
              {`${author.firstName} ${author.lastName}`}
            </div>
            <div className="text-[16px]">{author.headline} </div>
            <div className="text-[16px]">{moment(createdAt).fromNow()} </div>
          </div>
        </div>
        <div>{/* button */}</div>
      </div>
      <div
        className={`w-full ${
          readMore ? "" : "max-h-[100px] overflow-hidden"
        }  pl-[50px]`}
      >
        {description}
      </div>
      <div
        className="pl-[50px] text-[19px] font-semibold cursor-pointer"
        onClick={() => setReadMore((prev) => !prev)}
      >
        {readMore ? "read less..." : "read more..."}
      </div>
      {image && (
        <div className="w-full h-[300px] overflow-hidden flex justify-center rounded-lg">
          <img src={image} alt="" className="h-full rounded-lg" />
        </div>
      )}

      <div>
        <div className="w-full flex justify-between items-center p-[20px] border-b-2 border-gray-500">
          <div className="flex items-center justify-center gap-[5px] text-[18px]">
            <BiLike className="text-[#1ebbff] w-[20px] h-[20px]" />
            <span>{likes.length}</span>
          </div>
          <div className="flex items-center justify-center gap-[5px] text-[18px]">
            <span>{comments.length}</span>
            <span>comments</span>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center w-full p-[20px] gap-[20px]">
        {!likes.includes(userData._id) && (
          <div
            className="flex justify-center items-center gap-[5px] cursor-pointer"
            onClick={handleLikePost}
          >
            <BiLike className="w-[24px] h-[24px]" />
            <span>Like</span>
          </div>
        )}
        {likes.includes(userData._id) && (
          <div
            className="flex justify-center items-center gap-[5px] cursor-pointer"
            onClick={handleLikePost}
          >
            <BiSolidLike className="w-[24px] h-[24px] text-[#1ebbff]" />
            <span>Liked</span>
          </div>
        )}
        <div className="flex justify-center items-center gap-[5px] cursor-pointer">
          <FaRegCommentDots className="w-[24px] h-[24px]" />
          <span>Comment</span>
        </div>
      </div>
      <div>
        <form
          className="w-full flex justify-between items-center border-b-2 border-b-gray-300 p-[10px]"
          onSubmit={handleCommentPost}
        >
          <input
            type="text"
            placeholder="leave a comment"
            className="outline-none border-none w-full"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button type="submit">
            <LuSendHorizontal className="text-[#07a4ff] w-[22px] h-[22px] cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Posts;
