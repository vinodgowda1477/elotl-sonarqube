import { homeActionTypes } from "../constants/navigator-constants/homeConstants";

export function setSignInFlag(flag) {
    return {
      type: homeActionTypes.SET_SIGNIN_FLAG,
      flag
    };
}