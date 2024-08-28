import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {ThemeProvider} from 'styled-components';
import {LIGHT_THEME, FontsVTBGroup, DropdownProvider} from '@admiral-ds/react-ui';

import {App} from './App';

const queryClient = new QueryClient();

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <StrictMode>
        <ThemeProvider theme={LIGHT_THEME}>
            <FontsVTBGroup />
            <DropdownProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </DropdownProvider>
        </ThemeProvider>
    </StrictMode>,
);
