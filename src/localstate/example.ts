import { makeVar } from "@apollo/client";

// shape of your local state
export interface ExampleState {
  searchString: string;
  items: Number[];
  orgid: Number;
  SelectAll: Boolean;
}

const initialState = {
  searchString: "",
  items: [],
  orgid: null,
  SelectAll: false
};

export const exampleState = makeVar<ExampleState>(initialState);
