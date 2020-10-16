import React, { createContext, useContext, useReducer } from "react";

import { Action } from "./reducer";

import { Device, Devicetype, Os } from "../types/network";
import { Book, Bookgroup, Ownership, Format, Tongue } from "../types/book";

export type State = {
  devices: { [id: string]: Device };
  device: Device | undefined;
  devicetypes: { [id: string]: Devicetype };
  oss: { [id: string]: Os };
  os: Os | undefined;
  selectedversions: { [id: number]: string[] };
  bookgroups: { [id: string]: Bookgroup };
  bookgroup: Bookgroup | undefined; 
  selectedBookgroup: string; 
  selectedSubgroups: string[];
  selectedSubgroup: string;
  ownerships: { [id: string]: Ownership }; 
  ownership: Ownership | undefined;
  formats: { [id: string]: Format }; 
  format: Format | undefined;
  tongues: { [id: string]: Tongue }; 
  tongue: Tongue | undefined;
  books: { [id: string]: Book }; 
  book: Book | undefined;
  imageUrl: string;
  page: string;
};

const initialState: State = {
  devices: {},
  device: undefined,
  devicetypes: {},
  oss: {},
  os: undefined,
  selectedversions: {},
  bookgroups: {},
  bookgroup: undefined,
  selectedBookgroup: "",
  selectedSubgroups: [],
  selectedSubgroup: "",
  ownerships: {},
  ownership: undefined,
  formats: {},
  format: undefined,
  tongues: {},
  tongue: undefined,
  books: {},
  book: undefined,
  imageUrl: "",
  page: ""
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
