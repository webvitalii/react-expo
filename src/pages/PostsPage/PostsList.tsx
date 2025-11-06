import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import Loading from '@/components/Loading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/Post';

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

function PostsList() {
  const navigate = useNavigate();

  const { data: posts = [], isPending } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isPending) {
    return <Loading message="Loading posts..." />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]"
            onClick={() =>
              navigate({ to: '/posts/$postId', params: { postId: post.id.toString() } })
            }
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>

              <CardDescription className="line-clamp-3">{post.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PostsList;
