import { Message } from "../screens/ChatScreen";
import { ON_MESSAGE, TOKEN, USER_PAYLOAD } from "./Actions";

export type User = {
    userId: string,
    userName: string,
    userProfile: string,
    userMobile: string,
    userEmail: string
}

export interface State {
    user: User | null;
    token: string | null;
    message: Message | null;
}

const initialState: State | undefined = {
  user: null,
  token: null,
  message: null,
};

const Reducer = (state: State = initialState, action: any ): State  => {
    switch (action.type) {
      case USER_PAYLOAD:
        return {
          ...state,
          user: {
            userName : action.payload.name,
            userEmail : action.payload.email,
            userMobile : action.payload.mobile,
            userId : action.payload.id,
            userProfile : action.payload.image_url
          }
        };
        case TOKEN: return {
            ...state,
            token: action.payload
        }
        case ON_MESSAGE: return {
          ...state,
          message: action.payload
        }
      default:
        return state;
    }
}

export default Reducer;