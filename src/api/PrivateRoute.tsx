"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!user) {
            router.push("/");
        }
    }, [user, router]);

    if (!user) return null;

    return <>(children)</>
}