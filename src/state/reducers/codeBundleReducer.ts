import { CodeBundleState } from "../../models";
import {
  CodeBundleAction,
  CodeBundleActionType,
} from "../actions/codeBundleActions";

const initialState: CodeBundleState = {
  code: "",
  content: "",
  err: null,
  loading: false,
};

const reducer = (
  state: CodeBundleState = initialState,
  action: CodeBundleAction
) => {
  switch (action.type) {
    case CodeBundleActionType.CODE_BUNDLE_START: {
      return {
        ...state,
        err: null,
        loading: true,
      };
    }

    case CodeBundleActionType.CODE_BUNDLE_END: {
      return {
        ...state,
        err: action.payload.error,
        loading: false,
        code: action.payload.code,
      };
    }

    case CodeBundleActionType.UPDATE_CODE_CONTENT: {
      return {
        ...state,
        content: action.payload.content,
      };
    }

    default:
      return state;
  }
};

export default reducer;
