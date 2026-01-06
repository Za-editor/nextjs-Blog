

export interface PostListProps {
    post: Array<{
        id: number
        title: string
        description: string
        slug: string
        createdAt: Date
        author: {
            name: string
        }
    }>
}

export interface PostCardProps {
    post: {
        id: number
        title: string
        description: string
        slug: string
        createdAt: Date
        author: {
            name: string
        }
    }
}

export interface PostContentProps {
  post: {
    id: number;
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    author: {
      name: string;
    };
    };
    isAuthor: boolean;
}