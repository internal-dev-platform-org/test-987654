import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { attachLogger } from 'effector-logger';

import { App } from './App';

attachLogger();

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
