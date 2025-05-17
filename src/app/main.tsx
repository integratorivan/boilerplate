import { createRoot } from 'react-dom/client';
import { connectLogger } from '@reatom/framework';
import { reatomContext } from '@reatom/npm-react';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { reatomCtx } from '$shared/reatom-context';

import { routeTree } from '../routeTree.gen';

import './global.css';
import './global-variable.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

connectLogger(reatomCtx);

const StartApp = () => {
    const casino = import.meta.env.VITE_CASINO_NAME;
    return (
        <>
            <link rel="stylesheet" href={`/${casino}/variables.css`} />
            <reatomContext.Provider value={reatomCtx}>
                <RouterProvider router={router} />
            </reatomContext.Provider>
        </>
    );
};

createRoot(document.getElementById('root')!).render(<StartApp />);
