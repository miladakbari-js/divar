import AddPost from "src/components/templates/AddPost";
import PostList from "src/components/templates/PostList";

function DashboardPage() {
  return (
    <div>
      <PostList />
      <AddPost />
    </div>
  );
}

export default DashboardPage;
