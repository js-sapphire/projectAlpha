// import { gql, useApolloClient, useQuery } from "@apollo/client";



// export const ComponentWhichReads = () => {
// const { data, error}  = useQuery(SPACEX_QUERY, { variables: { limit: 5 }}); 

// if (error) {
//   return <>Error..</>
// }

// return <>DATA RECEIVED</>;
// };


// export const ComponentWhichWritesToCache = () => {
// const client = useApolloClient();

// try {

//   setTimeout(() => {

//     const data = client.readQuery({
//       query: SPACEX_QUERY,
//       variables: {
//         limit: 6
//       },
//     })
  
//     console.log(data);
//   }, 5000);


// } catch (err) {
//   console.log("Here", err);
// }

// return <></>;
// };


// export const MainWithApolloCache = () => {
//     return (
//         <>
//         <ComponentWhichWritesToCache />
//         <ComponentWhichReads />
//         </>
//     )
// }