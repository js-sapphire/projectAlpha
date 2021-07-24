import React from "react";
import { Habits } from "./Habits";
import { Tracker } from "./Tracker";
import { HabitProvider } from "./HabitStore";
import { MainWithApolloCache } from "./MainWithApolloCache";
import { RickAndMortyMain } from "./RickAndMortyMain";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClientConfig";


function App() {
  return (
    // <ApolloProvider client={client}>
    //   <RickAndMortyMain />
    // </ApolloProvider>
    <HabitProvider>
      <Habits />
      <Tracker />
    </HabitProvider>
  );
}

export default App;
