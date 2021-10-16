import React from "react";
import { useCurrentUser } from "../hooks"

export function withCurrentUser(Component: React.ReactElement) {
    const currentUser = useCurrentUser();
    if (!currentUser){
        return null;
    }
    return Component;
}