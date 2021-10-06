import { ReactNode } from "react"
import { AuthProvide } from "./auth-context"
import { QueryClientProvider, QueryClient } from 'react-query'

export const AppProvide = ({ children }: { children: ReactNode }) => {
    return <QueryClientProvider client={new QueryClient()}>
        <AuthProvide>
            {children}
        </AuthProvide>
    </QueryClientProvider>
}