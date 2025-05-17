import { createFileRoute } from '@tanstack/react-router';

const IndexRoute = () => {
    return (
        <div>
            <div>Index Page</div>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: IndexRoute,
});
