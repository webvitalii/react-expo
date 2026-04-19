import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { postQueryOptions, postCommentsQueryOptions } from '@/queries/posts';

function PostDetail() {
  const params = useParams({ strict: false }) as { lang?: string; postId: string };
  const { postId } = params;
  const currentLang = params.lang || 'en';
  const navigate = useNavigate();

  const { data: post } = useSuspenseQuery(postQueryOptions(postId));
  const { data: comments } = useSuspenseQuery(postCommentsQueryOptions(postId));

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate({ to: '/$lang/posts', params: { lang: currentLang } })}
      >
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

      <h2 className="text-2xl font-semibold mb-4">Comments ({comments.length})</h2>

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
    </div>
  );
}

export default PostDetail;
