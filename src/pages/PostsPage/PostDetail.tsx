import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import Loading from '@/components/Loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Post } from '@/types/Post';
import type { Comment } from '@/types/Comment';

const getPost = async (postId: string): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const getComments = async (postId: string): Promise<Comment[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

function PostDetail() {
  const { postId } = useParams({ from: '/posts/$postId' });
  const navigate = useNavigate();

  const { data: post, isPending: isPendingPost } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
  });

  const { data: comments = [], isPending: isPendingComments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  });

  if (isPendingPost) {
    return <Loading message="Loading post details..." />;
  }

  if (!post) {
    return (
      <div>
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" className="mb-4" onClick={() => navigate({ to: '/posts' })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Posts
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{post.body}</p>
          <div className="border-t my-4" />
          <p className="text-sm text-muted-foreground">User ID: {post.userId}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">
        Comments {!isPendingComments && `(${comments.length})`}
      </h2>

      {isPendingComments ? (
        <Loading message="Loading comments..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{comment.name}</CardTitle>
                <CardDescription className="text-sm">{comment.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{comment.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
