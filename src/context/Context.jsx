/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

const AppContext = createContext();

const initalState = {
  data: [],
  cartItems: JSON.parse(localStorage.getItem("cartItem")) || [],
  status: "loading",
  isInCart: false,
  itemQuantity: "1",
  clicked: false,
  checkoutPrice: JSON.parse(localStorage.getItem("totalPrice")),
};

function reducer(state, action) {
  switch (action.type) {
    case "getTotal":
      return {
        ...state,
        checkoutPrice: action.payload,
      };

    case "itemQuantity":
      return {
        ...state,
        itemQuantity: action.payload,
      };

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

    case "addToCart":
      return {
        ...state,
        cartItems: action.payload,
      };

    // case "removeFromCart":
    //   return {
    //     ...state,
    //     cartItems: action.payload,
    //   };

    case "toggleCatButton":
      return {
        ...state,
        isInCart: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const {
    clicked,
    data,
    status,
    cartItems,
    isInCart,
    itemQuantity,
    checkoutPrice,
  } = state;
  let imageContainerRef = useRef(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const resp = await fetch(
          "https://api.jsonbin.io/v3/b/65fc7dfadc74654018b6519b"
        );
        const data = await resp.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data.record.categories });
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

  function prev() {
    imageContainerRef.current.scrollLeft -= 250;
  }

  function next() {
    imageContainerRef.current.scrollLeft += 250;
  }

  function addToCart(product) {
    let updatedItem;

    try {
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItem")) || [];

      if (storedCartItems.some((item) => item.id === product?.id)) {
        // updatedItem = storedCartItems.filter((item) => item.id !== product.id);
        dispatch({ type: "addToCart", payload: storedCartItems });
        updatedItem = [...storedCartItems];
        alert("Already in the cart");
      } else {
        updatedItem = [...storedCartItems, { ...product, itemQuantity }];
      }

      dispatch({ type: "addToCart", payload: updatedItem });
      localStorage.setItem("cartItem", JSON.stringify(updatedItem || []));
      dispatch({ type: "itemQuantity", payload: "1" });
      dispatch({
        type: "getTotal",
        payload: updatedItem?.reduce(
          (acc, rate) => (acc + rate.price) * rate.itemQuantity,
          0
        ),
      });
      localStorage.setItem("totalPrice", JSON.stringify(checkoutPrice));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  function removeFromCart(id) {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    dispatch({ type: "addToCart", payload: updatedCartItems });
    localStorage.setItem("cartItem", JSON.stringify(updatedCartItems || []));
    dispatch({
      type: "getTotal",
      payload: updatedCartItems?.reduce(
        (acc, rate) => (acc + rate.price) * rate.itemQuantity,
        0
      ),
    });
    localStorage.setItem("totalPrice", JSON.stringify(checkoutPrice));
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
  });

  return (
    <AppContext.Provider
      value={{
        clicked,
        formatter,
        handleClick,
        data,
        status,
        handleSort,
        getProduct,
        prev,
        next,
        imageContainerRef,
        dispatch,
        addToCart,
        isInCart,
        cartItems,
        itemQuantity,
        removeFromCart,
        checkoutPrice,
      }}
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
