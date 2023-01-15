// inteligent container to do all the data interation like a controller

import React, { Fragment, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { exampleState } from "../localstate/example";
import { SearchExample } from "./search";
import { useApolloClient, useQuery, useReactiveVar } from "@apollo/client";
import { GET_RATES, GET_RATES_PLUS_CLIENT } from "./queries/queries";
import { Item } from "./item";

export function ExampleContainer(props) {
  const state = useReactiveVar(exampleState);

  const client = useApolloClient();

  const { loading, error, data } = useQuery(GET_RATES);

  useEffect(() => {
    console.log(state, " state changed");

    client.query({ query: GET_RATES_PLUS_CLIENT }).then((data) => {
      console.log(data.data, " got this data suing query");
    });
  }, [state.searchString]);

  if (loading) return <p> loading</p>;
  if (error) return <p> error</p>;

  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs={12}>
            {state.searchString}
            <SearchExample />
          </Col>
        </Row>
        <Row>
          {data.rates
            .filter((f) =>
              f.currency.includes(state.searchString.toUpperCase())
            )
            .map((item) => {
              return <Item currency={item.currency} />;
            })}
        </Row>
      </Container>
    </Fragment>
  );
}
