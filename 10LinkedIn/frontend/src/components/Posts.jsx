import { useState } from "react";
import emptyDp from "../assets/emptyDp.jpg";
import moment from "moment";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa6";
const Posts = ({
  id,
  description,
  author,
  image,
  like,
  comment,
  createdAt,
}) => {
  const [readMore, setReadMore] = useState(false);
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
            <SlLike className="text-[#1ebbff] w-[20px] h-[20px]" />
            <span>{like.length}</span>
          </div>
          <div className="flex items-center justify-center gap-[5px] text-[18px]">
            <span>{comment.length}</span>
            <span>comments</span>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center w-full p-[20px] gap-[20px]">
        <div className="flex justify-center items-center gap-[5px]">
          <SlLike className="w-[24px] h-[24px]" />
          <span>Like</span>
        </div>
        <div className="flex justify-center items-center gap-[5px]">
          <FaRegCommentDots className="w-[24px] h-[24px]" />
          <span>Comment</span>
        </div>
      </div>
    </div>
  );
};

export default Posts;
