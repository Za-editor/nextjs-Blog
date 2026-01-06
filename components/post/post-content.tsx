import { PostContentProps } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "../ui/card";
import { formatDate } from "@/lib/utils";

function PostContent({post, isAuthor} : PostContentProps) {
    return <Card> 
        <CardHeader>
            <CardTitle className="text-3xl">
                {post.title}
            </CardTitle>
            <CardDescription>
                By {post.author.name} {formatDate(post.createdAt)}
            </CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
  </Card>
}

export default PostContent;
