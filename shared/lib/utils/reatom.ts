import type { Atom } from '@reatom/core';
import { atom } from '@reatom/core';
import type { AsyncAction } from '@reatom/framework';

export const withReadyAtom =
    <T extends AsyncAction & { dataAtom?: Atom }>(initState = false) =>
    (anAsync: T): T & { readyAtom: Atom<boolean> } => {
        // use `spy` to prevent any race conditions
        const readyAtom = atom((ctx, state?: boolean) => {
            // trigger connection to start the fetch if `onConnect` used
            if (anAsync.dataAtom) ctx.spy(anAsync.dataAtom);

            const pending = ctx.spy(anAsync.pendingAtom);

            return state === undefined ? initState : pending === 0;
        }, 'readyAtom');

        // grand correct state even for unconnected atom
        anAsync.pendingAtom.onChange((ctx) => {
            ctx.get(readyAtom);
        });

        return Object.assign(anAsync, { readyAtom });
    };
