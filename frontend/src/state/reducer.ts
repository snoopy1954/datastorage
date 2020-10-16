import { State } from "./state";

import { Device, Devicetype, Os } from "../types/network";
import { Book, Bookgroup, Ownership, Format, Tongue } from "../types/book";


export type Action =
  | {
      type: "SET_DEVICE_LIST";
      payload: Devicetype[];
    }
  | {
      type: "SET_DEVICETYPE_LIST";
      payload: Devicetype[];
    }
  | {
      type: "SET_OS_LIST";
      payload: Os[];
    }
  | {
      type: "ADD_DEVICE";
      payload: Device;
    }
  | {
      type: "UPDATE_DEVICE";
      payload: Device;
    }
  | {
      type: "REMOVE_DEVICE";
      payload: string;
    }
  | {
      type: "ADD_DEVICETYPE";
      payload: Devicetype;
    }
  | {
      type: "ADD_OS";
      payload: Os;
    }
  | {
      type: "SET_SELECTED_OS";
      payload: Os;
    }
  | {
      type: "CLEAR_SELECTED_OS";
    }
  | {
      type: "SET_SELECTED_DEVICE";
      payload: Device;
    }
  | {
      type: "CLEAR_SELECTED_DEVICE";
    }
  | {
      type: "ADD_FILTERED_VERSIONS";
    }
  | {
      type: "SET_FILTERED_VERSIONS";
      payload: { id: number; versions: string[] };
    }
  | {
      type: "CLEAR_FILTERED_VERSIONS";
    }
  | {
      type: "SET_BOOK_LIST";
      payload: Book[];
    }
  | {
      type: "ADD_BOOK";
      payload: Book;
    }
  | {
      type: "UPDATE_BOOK";
      payload: Book;
    }
  | {
      type: "REMOVE_BOOK";
      payload: string;
    }
  | {
      type: "SET_SELECTED_BOOK";
      payload: Book;
    }
  | {
      type: "CLEAR_SELECTED_BOOK";
    } 
  | {
      type: "SET_BOOKGROUP_LIST";
      payload: Bookgroup[];
    }
  | {
      type: "ADD_BOOKGROUP";
      payload: Bookgroup;
    }  
  | {
      type: "SET_SELECTED_BOOKGROUP";
      payload: Bookgroup;
    }
  | {
      type: "CLEAR_SELECTED_BOOKGROUP";
    } 
  | {
      type: "SET_SELECTED_BOOKGROUP_SELECTION";
      payload: string;
    }
  | {
      type: "CLEAR_SELECTED_BOOKGROUP_SELECTION";
    } 
  | {
      type: "SET_FILTERED_SUBGROUPS";
      payload: string[];
    }
  | {
      type: "CLEAR_FILTERED_SUBGROUPS";
    }
  | {
      type: "SET_SUBGROUP_SELECTION";
      payload: string;
    }
  | {
      type: "CLEAR_SUBGROUP_SELECTION";
    } 
  | {
      type: "SET_OWNERSHIP_LIST";
      payload: Ownership[];
    }
  | {
      type: "ADD_OWNERSHIP";
      payload: Ownership;
    }
  | {
      type: "SET_SELECTED_OWNERSHIP";
      payload: Ownership;
    }
  | {
      type: "CLEAR_SELECTED_OWNERSHIP";
    } 
  | {
      type: "SET_FORMAT_LIST";
      payload: Format[];
    }
  | {
      type: "ADD_FORMAT";
      payload: Format;
    }
  | {
      type: "SET_SELECTED_FORMAT";
      payload: Format;
    }
  | {
      type: "CLEAR_SELECTED_FORMAT";
    } 
  | {
      type: "SET_TONGUE_LIST";
      payload: Tongue[];
    }
  | {
      type: "ADD_TONGUE";
      payload: Tongue;
    }
  | {
      type: "SET_SELECTED_TONGUE";
      payload: Tongue;
    }
  | {
      type: "CLEAR_SELECTED_TONGUE";
    } 
  | {
      type: "SET_IMAGEURL";
      payload: string;
    }
  | {
      type: "CLEAR_IMAGEURL";
    }
  | {
      type: "SET_PAGE";
      payload: string;
    }
;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DEVICE_LIST":
      return {
        ...state,
        devices: {
          ...action.payload.reduce(
            (memo, device) => ({ ...memo, [device.id]: device }),
            {}
          ),
          ...state.devices
        }
      };
    case "SET_DEVICETYPE_LIST":
      return {
        ...state,
        devicetypes: {
          ...action.payload.reduce(
            (memo, devicetype) => ({ ...memo, [devicetype.id]: devicetype }),
            {}
          ),
          ...state.devicetypes
        }
      };
    case "SET_OS_LIST":
      return {
        ...state,
        oss: {
          ...action.payload.reduce(
            (memo, os) => ({ ...memo, [os.id]: os }),
            {}
          ),
          ...state.oss
        }
      };
    case "ADD_DEVICE":
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_DEVICE": 
      return {
        ...state,
        devices:{
          ...state.devices,
          [action.payload.id]: action.payload
        }    
      };
    case "REMOVE_DEVICE": {
      let newDevices = {} 
      Object.keys(state.devices).forEach(element => {
        if (element!==action.payload) {
          newDevices = {
            ...newDevices,
            [element]: state.devices[element]
          }
        }
      })      
      return {
        ...state,
        devices: newDevices
      };
    }
    case "ADD_DEVICETYPE":
      return {
        ...state,
        devicetypes: {
          ...state.devicetypes,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_OS":
      return {
        ...state,
        oss: {
          ...state.oss,
          [action.payload.id]: action.payload
        }
      };
    case "SET_SELECTED_OS":
      return {
        ...state,
        os: action.payload
      };
    case "CLEAR_SELECTED_OS":
      return {
        ...state,
        os: undefined
      };
    case "SET_SELECTED_DEVICE":
      return {
        ...state,
        device: action.payload
      };
    case "CLEAR_SELECTED_DEVICE":
      return {
        ...state,
        device: undefined
      };
    case "ADD_FILTERED_VERSIONS":
      return {
        ...state,
        selectedversions: {
          ...state.selectedversions,
          [Object.keys(state.selectedversions).length]: []
        }
      };
    case "SET_FILTERED_VERSIONS":
      return {
        ...state,
        selectedversions: {
          ...state.selectedversions,
          [action.payload.id]: action.payload.versions
        }
      };
    case "CLEAR_FILTERED_VERSIONS":
      return {
        ...state,
        selectedversions: []
      };
    case "SET_BOOK_LIST":
      return {
        ...state,
        books: {
          ...action.payload.reduce(
            (memo, book) => ({ ...memo, [book.id]: book }),
            {}
          ),
          ...state.books
        }
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: {
          ...state.books,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_BOOK": 
      return {
        ...state,
        books:{
          ...state.books,
          [action.payload.id]: action.payload
        }    
      };
    case "REMOVE_BOOK": {
      let newBooks = {} 
        Object.keys(state.books).forEach(element => {
        if (element!==action.payload) {
          newBooks = {
            ...newBooks,
            [element]: state.books[element]
          }
        }
      })      
      return {
        ...state,
        books: newBooks
      };
    }
    case "SET_SELECTED_BOOK":
      return {
        ...state,
        book: action.payload
      };
    case "CLEAR_SELECTED_BOOK":
      return {
        ...state,
        book: undefined
      };
    case "SET_BOOKGROUP_LIST":
      return {
        ...state,
        bookgroups: {
          ...action.payload.reduce(
            (memo, bookgroup) => ({ ...memo, [bookgroup.id]: bookgroup }),
            {}
          ),
          ...state.bookgroups
        }
      };
    case "ADD_BOOKGROUP":
      return {
        ...state,
        bookgroups: {
          ...state.bookgroups,
          [action.payload.id]: action.payload
        }
      };
    case "SET_SELECTED_BOOKGROUP":
      return {
        ...state,
        bookgroup: action.payload
      };
    case "CLEAR_SELECTED_BOOKGROUP":
      return {
        ...state,
        bookgroup: undefined
      };
    case "SET_SELECTED_BOOKGROUP_SELECTION":
      return {
        ...state,
        selectedBookgroup: action.payload
      };
    case "CLEAR_SELECTED_BOOKGROUP_SELECTION":
      return {
        ...state,
        selectedBookgroup: ""
      };
    case "SET_FILTERED_SUBGROUPS":
      return {
        ...state,
        selectedSubgroups: action.payload
      };
    case "CLEAR_FILTERED_SUBGROUPS":
      return {
        ...state,
        selectedSubgroups: []
      };  
    case "SET_SUBGROUP_SELECTION":
      return {
        ...state,
        selectedSubgroup: action.payload
      };
    case "CLEAR_SUBGROUP_SELECTION":
      return {
      ...state,
      selectedSubgroup: ""
      };
    case "SET_OWNERSHIP_LIST":
      return {
        ...state,
        ownerships: {
          ...action.payload.reduce(
            (memo, ownership) => ({ ...memo, [ownership.id]: ownership }),
            {}
          ),
        ...state.ownerships
        }
      };
    case "ADD_OWNERSHIP":
      return {
        ...state,
        ownerships: {
          ...state.ownerships,
          [action.payload.id]: action.payload
        }
      };
    case "SET_SELECTED_OWNERSHIP":
      return {
        ...state,
        ownership: action.payload
      };
    case "CLEAR_SELECTED_OWNERSHIP":
      return {
        ...state,
        ownership: undefined
      };
    case "SET_FORMAT_LIST":
      return {
        ...state,
        formats: {
          ...action.payload.reduce(
            (memo, format) => ({ ...memo, [format.id]: format }),
            {}
          ),
          ...state.formats
        }
      };
    case "ADD_FORMAT":
      return {
        ...state,
        formats: {
          ...state.formats,
          [action.payload.id]: action.payload
        }
      };
    case "SET_SELECTED_FORMAT":
      return {
        ...state,
        format: action.payload
      };
    case "CLEAR_SELECTED_FORMAT":
      return {
        ...state,
        format: undefined
      };
    case "SET_TONGUE_LIST":
      return {
        ...state,
        tongues: {
          ...action.payload.reduce(
            (memo, tongue) => ({ ...memo, [tongue.id]: tongue }),
            {}
          ),
          ...state.tongues
        }
      };
    case "ADD_TONGUE":
      return {
        ...state,
        tongues: {
          ...state.tongues,
          [action.payload.id]: action.payload
        }
      };
    case "SET_SELECTED_TONGUE":
      return {
        ...state,
        tongue: action.payload
        };
    case "CLEAR_SELECTED_TONGUE":
      return {
        ...state,
        tongue: undefined
      };
    case "SET_IMAGEURL":
      return {
        ...state,
        imageUrl: action.payload
      };
    case "CLEAR_IMAGEURL":
      return {
        ...state,
        imageUrl: ""
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload
      };  
    default:
      return state;
  }
};

export const setDeviceList = (payload: Device[]) => {
  const action: Action = {
    type: "SET_DEVICE_LIST",
    payload
  };
  return action;
};

export const setDevicetypeList = (payload: Devicetype[]) => {
  const action: Action = {
    type: "SET_DEVICETYPE_LIST",
    payload
  };
  return action;
};

export const setOsList = (payload: Os[]) => {
  const action: Action = {
    type: "SET_OS_LIST",
    payload
  };
  return action;
};

export const addDevice = (payload: Device) => {
  const action: Action = {
    type: "ADD_DEVICE",
    payload
  };
  return action;
};

export const updateDevice = (payload: Device) => {
  const action: Action = {
    type: "UPDATE_DEVICE",
    payload
  };
  return action;
};

export const removeDevice = (payload: string) => {
  const action: Action = {
    type: "REMOVE_DEVICE",
    payload
  };
  return action;
};

export const addDevicetype = (payload: Devicetype) => {
  const action: Action = {
    type: "ADD_DEVICETYPE",
    payload
  };
  return action;
};

export const addOs = (payload: Os) => {
  const action: Action = {
    type: "ADD_OS",
    payload
  };
  return action;
};

export const setSelectedOs = (payload: Os) => {
  const action: Action = {
    type: "SET_SELECTED_OS",
    payload
  };
  return action;
};

export const clearSelectedOs = () => {
  const action: Action = {
    type: "CLEAR_SELECTED_OS"
  };
  return action;
};

export const setSelectedDevice = (payload: Device) => {
  const action: Action = {
    type: "SET_SELECTED_DEVICE",
    payload
  };
  return action;
};

export const clearSelectedDevice = () => {
  const action: Action = {
    type: "CLEAR_SELECTED_DEVICE"
  };
  return action;
};

export const addFilteredVersions = () => {
  const action: Action = {
    type: "ADD_FILTERED_VERSIONS"
  };
  return action;
};

export const setFilteredVersions = (payload: { id: number; versions: string[] }) => {
  const action: Action = {
    type: "SET_FILTERED_VERSIONS",
    payload
  };
  return action;
};

export const clearFilteredVersions = () => {
  const action: Action = {
    type: "CLEAR_FILTERED_VERSIONS"
  };
  return action;
};

export const setBookList = (payload: Book[]) => {
  const action: Action = {
    type: "SET_BOOK_LIST",
    payload
  };
  return action;
};

export const addBook = (payload: Book) => {
  const action: Action = {
    type: "ADD_BOOK",
    payload
  };
  return action;
};

export const updateBook = (payload: Book) => {
  const action: Action = {
    type: "UPDATE_BOOK",
    payload
  };
  return action;
};

export const removeBook = (payload: string) => {
  const action: Action = {
    type: "REMOVE_BOOK",
    payload
  };
  return action;
};

export const setSelectedBook = (payload: Book) => {
  const action: Action = {
    type: "SET_SELECTED_BOOK",
    payload
  };
  return action;
};

export const clearSelectedBook = () => {
  const action: Action = {
    type: "CLEAR_SELECTED_BOOK"
  };
  return action;
};

export const setBookgroupList = (payload: Bookgroup[]) => {
  const action: Action = {
    type: "SET_BOOKGROUP_LIST",
    payload
  };
  return action;
};

export const addBookgroup = (payload: Bookgroup) => {
  const action: Action = {
    type: "ADD_BOOKGROUP",
    payload
  };
  return action;
};

export const setSelectedBookgroup = (payload: Bookgroup) => {
  const action: Action = {
    type: "SET_SELECTED_BOOKGROUP",
    payload
  };
  return action;
};

export const clearSelectedBookgroup = () => {
  const action: Action = {
    type: "CLEAR_SELECTED_BOOKGROUP"
  };
  return action;
};

export const setSelectedBookgroupSelection = (payload: string) => {
  const action: Action = {
    type: "SET_SELECTED_BOOKGROUP_SELECTION",
    payload
  };
  return action;
};

export const clearSelectedBookgroupSelection = () => {
  const action: Action = {
    type: "CLEAR_SELECTED_BOOKGROUP_SELECTION"
  };
  return action;
};

export const setFilteredSubgroups = (payload: string[]) => {
  const action: Action = {
    type: "SET_FILTERED_SUBGROUPS",
    payload
  };
  return action;
};

export const clearFilteredSubgroups = () => {
  const action: Action = {
    type: "CLEAR_FILTERED_SUBGROUPS"
  };
  return action;
};

export const setSelectedSubgroupSelection = (payload: string) => {
  const action: Action = {
    type: "SET_SUBGROUP_SELECTION",
    payload
  };
  return action;
};

export const clearSelectedSubgroupSelection = () => {
  const action: Action = {
    type: "CLEAR_SUBGROUP_SELECTION"
  };
  return action;
};

export const setOwnershipList = (payload: Ownership[]) => {
  const action: Action = {
    type: "SET_OWNERSHIP_LIST",
    payload
  };
  return action;
};

export const addOwnership = (payload: Ownership) => {
  const action: Action = {
    type: "ADD_OWNERSHIP",
    payload
  };
  return action;
};

export const setSelectedOwnership = (payload: Ownership) => {
  const action: Action = {
    type: "SET_SELECTED_OWNERSHIP",
    payload
  };
  return action;
};

export const clearSelectedOwnership = () => {
  const action: Action = {
    type: "CLEAR_SELECTED_OWNERSHIP"
  };
  return action;
};

export const setFormatList = (payload: Format[]) => {
  const action: Action = {
    type: "SET_FORMAT_LIST",
    payload
  };
  return action;
};

export const addFormat = (payload: Format) => {
  const action: Action = {
    type: "ADD_FORMAT",
    payload
  };
  return action;
};

export const setSelectedFormat = (payload: Format) => {
  const action: Action = {
    type: "SET_SELECTED_FORMAT",
    payload
  };
  return action;
};

export const clearSelectedFormat = () => {
  const action: Action = {
    type: "CLEAR_SELECTED_FORMAT"
  };
  return action;
};

export const setTongueList = (payload: Tongue[]) => {
  const action: Action = {
    type: "SET_TONGUE_LIST",
    payload
  };
  return action;
};

export const addTongue = (payload: Tongue) => {
  const action: Action = {
    type: "ADD_TONGUE",
    payload
  };
  return action;
};

export const setSelectedTongue = (payload: Tongue) => {
  const action: Action = {
    type: "SET_SELECTED_TONGUE",
    payload
  };
  return action;
};

export const clearSelectedTongue = () => {
  const action: Action = {
    type: "CLEAR_SELECTED_TONGUE"
  };
  return action;
};

export const setImageUrl = (payload: string) => {
  const action: Action = {
    type: "SET_IMAGEURL",
    payload
  };
  return action;
};

export const clearImageUrl = () => {
  const action: Action = {
    type: "CLEAR_IMAGEURL"
  };
  return action;
};

export const setPage = (payload: string) => {
  const action: Action = {
    type: "SET_PAGE",
    payload
  };
  return action;
};



