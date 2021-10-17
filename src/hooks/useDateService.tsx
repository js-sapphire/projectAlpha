import * as React from 'react';
import { DateServiceContext } from "../context/dateServiceContext";

export function useDateService(){
    const dateServiceContext = React.useContext(DateServiceContext);
    return dateServiceContext?.dateService;
}

