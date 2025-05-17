import { reatomResource, withDataAtom } from '@reatom/framework';
import { reatomComponent } from '@reatom/npm-react';
import { createFileRoute } from '@tanstack/react-router';

import { getPromotions } from '$shared/api/promo';

export const promotionsResource = reatomResource((ctx) => {
    return ctx.schedule(() => getPromotions());
}, 'promotionsResource').pipe(withDataAtom([]));

const About = reatomComponent(({ ctx }) => {
    const promotions = ctx.spy(promotionsResource.dataAtom);

    return <div className="p-2">Hello from About!</div>;
}, 'About');

export const Route = createFileRoute('/about')({
    component: About,
});
