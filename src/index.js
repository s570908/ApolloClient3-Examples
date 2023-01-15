import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { GET_RATES } from "./example/queries/queries";
import { exampleState } from "./localstate/example";

// setup apollo

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          local: {
            read() {
              return exampleState();
            }
          }
        }
      }
    }
  })
});

// const client = ...

client
  .query({
    query: GET_RATES
  })
  .then((result) => console.log(result));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  rootElement
);
