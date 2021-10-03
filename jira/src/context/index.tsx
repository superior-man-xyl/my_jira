import { ReactNode } from "react"
import { AuthProvide } from "./auth-context"

export const AppProvide = ({ children }: { children: ReactNode }) => {
    return <AuthProvide>
        {children}
    </AuthProvide>
}