import actions from "./actions";

const initState = {
    userId: JSON.parse(localStorage.getItem("userId")) || "",
    email: JSON.parse(localStorage.getItem("email")) || "",
    admin : JSON.parse(localStorage.getItem("admin")) || false,
    isLogged : JSON.parse(localStorage.getItem("isLogged")) || false,
    centers : []
}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
              case actions.SET_LOGGED_STATUS:
              //  if(!payload) return state;
              localStorage.setItem("isLogged",JSON.stringify(payload));
                return Object.assign({}, state, { 
                    ...state,
                    isLogged: payload
              });
              case actions.SET_USER_DETAILS:
                if(!payload) return state;
                localStorage.setItem("userId",JSON.stringify(payload.userId));
                localStorage.setItem("email",JSON.stringify(payload.email));
                localStorage.setItem("isLogged",JSON.stringify(true));
                localStorage.setItem("admin",JSON.stringify(payload.admin));
                return Object.assign({}, state, { 
                    ...state,
                    email: payload.email,
                    admin : payload.admin,
                    userId : payload.userId
              });
              case actions.SET_CENTERS:
                return Object.assign({}, state, { 
                    ...state,
                    centers : payload
              });
                
      default: return state;
    }
};

export default reducer;