import * as React from 'react';
import { DateService, IDateService } from "../services/DateService";

type IDateServiceContext = {
    dateService: IDateService
} | null

export const DateServiceContext = React.createContext<IDateServiceContext>(null);

export function DateServiceProvider({children}: any){
    const dateService = new DateService();

    return (
        <DateServiceContext.Provider value={{dateService}}>
            { children }
        </DateServiceContext.Provider>
    )
}

