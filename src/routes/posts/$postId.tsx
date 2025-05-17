import { reatomComponent } from '@reatom/npm-react';
import { createFileRoute } from '@tanstack/react-router';

import { reatomCtx } from '$shared/reatom-context';

import { postIdAtom } from './-model';

const PostRoute = reatomComponent(({ ctx }) => {
    const postId = ctx.spy(postIdAtom);

    return (
        <div>
            <h1>Post: {postId}</h1>
        </div>
    );
}, 'PostRoute');

export const Route = createFileRoute('/posts/$postId')({
    component: PostRoute,
    beforeLoad: ({ params }) => {
        postIdAtom(reatomCtx, params.postId);
    },
});
