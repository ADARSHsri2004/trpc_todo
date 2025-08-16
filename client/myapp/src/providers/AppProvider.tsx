import type { ReactNode } from 'react';
import { trpc } from '../api/trpc';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: ReactNode }) {
    const trpcClient = trpc.createClient({
        links: [
            httpBatchLink({
                url: 'http://localhost:3000/trpc',
                async headers() {
                    const token = localStorage.getItem('token');
                    return token ? { Authorization: `Bearer ${token}` } : {};
                },
            }),
        ],
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
