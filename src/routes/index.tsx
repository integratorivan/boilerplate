import { createFileRoute } from '@tanstack/react-router';

const IndexRoute = () => {
    return (
        <div>
            <div>Index 3 Page</div>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: IndexRoute,
});
