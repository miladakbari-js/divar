import { useQuery } from "@tanstack/react-query"
import Main from "src/components/templates/Main"
import Sidebar from "src/components/templates/Sidebar"
import { getAllPosts } from "src/services/user"
import Loader from "src/components/modules/Loader"
import { getCategory } from "src/services/Admin"

function HomePage() {
  const styles = {display:"flex"}

  const {data:posts , isLoading: postLoader} = useQuery(["get-posts"] , getAllPosts);
  const { data:categories , isLoading: categoryLoader } = useQuery(["get-categories"], getCategory);

  
  return (
  <>
  {postLoader || categoryLoader?<Loader/>:<div style={styles}>
    <Sidebar categories={categories}/>
    <Main posts={posts}/>
  </div>}
  </>
  )
}

export default HomePage