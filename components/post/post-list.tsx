import { PostListProps } from "@/lib/types"
import PotstCard from "./post-card"


function PostList({posts}: PostListProps) {
  return (
    <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <PotstCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList