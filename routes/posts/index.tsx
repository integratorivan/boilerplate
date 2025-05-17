import { createFileRoute } from '@tanstack/react-router';

const PostRootRoute = () => {
    return (
        <div>
            <h1>Post</h1>
        </div>
    );
};

export const Route = createFileRoute('/posts/')({
    component: PostRootRoute,
});
