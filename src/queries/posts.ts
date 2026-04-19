import { queryOptions } from '@tanstack/react-query';
import type { Post } from '@/types/Post';
import type { Comment } from '@/types/Comment';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const POSTS_PER_PAGE = 5;
export const TOTAL_POSTS = 100;

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const postsListQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ['posts', page],
    queryFn: () => {
      const start = (page - 1) * POSTS_PER_PAGE;
      return fetchJson<Post[]>(`${API_BASE}/posts?_limit=${POSTS_PER_PAGE}&_start=${start}`);
    },
  });

export const allPostsQueryOptions = queryOptions({
  queryKey: ['posts', 'all'],
  queryFn: () => fetchJson<Post[]>(`${API_BASE}/posts`),
});

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['post', postId],
    queryFn: () => fetchJson<Post>(`${API_BASE}/posts/${postId}`),
  });

export const postCommentsQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['comments', postId],
    queryFn: () => fetchJson<Comment[]>(`${API_BASE}/posts/${postId}/comments`),
  });
