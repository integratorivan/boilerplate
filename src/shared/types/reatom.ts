import type { AsyncDataAtom, AsyncStatusesAtom, ResourceAtom } from '@reatom/framework';

export type PropsResourceAtom<TAtom> = ResourceAtom<TAtom> & {
    dataAtom: AsyncDataAtom<TAtom | null>;
} & {
    statusesAtom: AsyncStatusesAtom;
};
