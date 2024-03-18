/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext();

const initalState = {
  data: [],
  status: "loading",
  clicked: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "hamburger/clicked":
      return {
        ...state,
        clicked: !state.clicked,
      };

    case "dataReceived":
      return {
        ...state,
        data: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "featured":
      return {
        ...state,
        data: state.data,
      };

    case "A-Z": {
      // accending Order
      const sortedAcc = [];
      for (const category in state.data) {
        if (Object.prototype.hasOwnProperty.call(state.data, category)) {
          sortedAcc[category] = state.data[category]
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name));
        }
      }
      return {
        ...state,
        data: sortedAcc,
      };
    }

    case "Z-A": {
      //  decending Order
      const sortedDcc = {};
      for (const category in state.data) {
        if (Object.prototype.hasOwnProperty.call(state.data, category)) {
          sortedDcc[category] = state.data[category]
            .slice()
            .sort((a, b) => b.name.localeCompare(a.name));
        }
      }
      return {
        ...state,
        data: sortedDcc,
      };
    }

    case "lowToHigh": {
      // sorted Low to high
      const sortedLowToHigh = {};
      for (const category in state.data) {
        if (Object.prototype.hasOwnProperty.call(state.data, category)) {
          sortedLowToHigh[category] = state.data[category]
            .slice()
            .sort((a, b) => a.price - b.price);
        }
      }
      return {
        ...state,
        data: sortedLowToHigh,
      };
    }

    case "highToLow": {
      const sortedHighToLow = {};
      for (const category in state.data) {
        if (Object.prototype.hasOwnProperty.call(state.data, category)) {
          sortedHighToLow[category] = state.data[category]
            .slice()
            .sort((a, b) => b.price - a.price);
        }
      }

      return {
        ...state,
        data: sortedHighToLow,
      };
    }

    default:
      throw new Error("Unknown action type");
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { clicked, data, status } = state;

  useEffect(function () {
    async function fetchData() {
      try {
        const resp = await fetch("http://localhost:8000/categories/");
        const data = await resp.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataReceived", payload: "Data failed" });
      }
    }
    fetchData();
  }, []);

  function handleClick() {
    dispatch({ type: "hamburger/clicked" });
  }

  function handleSort(e) {
    if (e.target.value === "featured") {
      dispatch({ type: "featured" });
    }
    if (e.target.value === "A-Z") {
      dispatch({ type: "A-Z" });
    }
    if (e.target.value === "Z-A") {
      dispatch({ type: "Z-A" });
    }
    if (e.target.value === "low to high") {
      dispatch({ type: "lowToHigh" });
    }
    if (e.target.value === "high to low") {
      dispatch({ type: "highToLow" });
    }
  }

  function getProduct(catName, prodId) {
    if (catName && prodId) {
      // const categoryData = data ? data[catName] : null;
      // console.log(categoryData, "data");
      const productData = data
        ? data[catName]?.find((item) => item.id === prodId)
        : null;

      return productData;
    }
  }

  return (
    <AppContext.Provider
      value={{ clicked, handleClick, data, status, handleSort, getProduct }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("Context was used outside the provider");

  return context;
}

export { AppProvider, useAppContext };
