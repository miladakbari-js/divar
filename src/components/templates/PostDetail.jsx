import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "src/configs/api";

function PostDetail() {
  const { id } = useParams();
  const fetchPostDetail = ({queryKey}) => {
   return api.get(`/${queryKey[1]}`)
    
  };
  const { data } = useQuery(["get-posts", id], fetchPostDetail);
  console.log(data);
  return <div>PostDetail - {id}</div>;
}

export default PostDetail;
