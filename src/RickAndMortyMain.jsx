import { gql, useApolloClient, useQuery } from '@apollo/client';
import React from 'react';

export const RickAndMortyMain = () => {
    const [viewCharacters, setViewCharacters] = React.useState(false);
    const [viewEpisodes, setViewEpisodes] = React.useState(false);

    const handleViewCharacters = () => {
        setViewCharacters(true);
    }

    const handleViewEpisodes = () => {
        setViewEpisodes(true);
    }

    return(
        <>
            {!viewCharacters && <button onClick={handleViewCharacters}>View Characters</button>}
            {!viewEpisodes && <button onClick={handleViewEpisodes}>View Episodes</button>}
            {viewCharacters && <CharacterList />}
            {viewEpisodes && <EpisodeList />}
        </>
    )
}


const characterListQuery = gql`
    query getCharacters($pageNumber: Int) {
        characters(page: $pageNumber){
            results {
                id
                name
                image
            }
        } 
    }
`;


const CharacterList = () => {
    const [pageNumber, setPageNumber] = React.useState(1);
    const { data, error } = useQuery(characterListQuery, {
        variables: {
            pageNumber
        }
    });

    if (error){
        return <>Error</>
    }

    console.log(data);

    return (
        <>
            {pageNumber !== 1 && <button onClick={() => setPageNumber(pageNumber-1)}>Prev</button>}
            <button onClick={() => setPageNumber(pageNumber+1)}>Next</button>
            <CharacterListView data={data} />
        </>
    )
}

const CharacterListView = ({data}) => {
    if (!data || !data.characters || !data.characters.results) {
        return "No characters";
    }

    const characters = data.characters.results;

    return(
        characters.map((character) => {
            return(
                <CharacterView character={character}/>
            )
        })
    )
}

const characterQuery = gql`
    query getCharacter($id: ID!){
        character(id: $id){
            id
            name
            image
            gender
            type
            created
        }
    }
`;

const CharacterView = ({character}) => {
    const [viewFullCharacter, setViewFullCharacter] = React.useState(false);
    const [viewError, setViewError] = React.useState(false);
    const [characterData, setCharacterData] = React.useState(null);
    const client = useApolloClient();

    const getCharacter = React.useCallback(async () => {
        try {
            const { data, error } = await client.query({
                query: characterQuery,
                variables: {
                    id: character.id
                }
            })

            if (error){
                return setViewError(true);
            }

            setViewFullCharacter(true);
            setCharacterData(data.character);
        } catch(err){
            setViewError(true);
        }
    }, [character.id, client]);

    React.useEffect(() => {
        if (!viewFullCharacter) {
            return;
        } 

        getCharacter();
    }, [viewFullCharacter, getCharacter]);

    return(
        <>
            <div>
            <span onClick={() => setViewFullCharacter(true)}>{character.name}</span>
            <img src={character.image} onClick={() => setViewFullCharacter(true)} alt="" width="50" height="50  "></img>
            {viewFullCharacter && <button onClick={() => setViewFullCharacter(false)}>Hide Details</button>}
            </div>
            {viewError && <h3>Error Screen</h3>}
            {viewFullCharacter && characterData && 
            <div>
                Name: {characterData.name}
                Gender: {characterData.gender}
                Type: {characterData.type}
                Created: {characterData.created}
            </div> }
        </>
    )
}   

const EpisodeList = () => {
    return(
        <h1>Hello</h1>
    )
}