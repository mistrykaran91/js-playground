import { Dispatch } from "react";
import {
  CodeBundleAction,
  CodeBundleActionType,
  UpdateCodeContentAction,
} from "../actions/codeBundleActions";
import codeBundler from "../../code-bundler";

export const createCodeBundle = (code: string) => {
  return async (dispatch: Dispatch<CodeBundleAction>) => {
    dispatch({
      type: CodeBundleActionType.CODE_BUNDLE_START,
    });

    const response = await codeBundler(code);

    dispatch({
      type: CodeBundleActionType.CODE_BUNDLE_END,
      payload: {
        code: response.code,
        error: response.err,
      },
    });
  };
};

export const updateCodeContent = (content: string): UpdateCodeContentAction => {
  return {
    type: CodeBundleActionType.UPDATE_CODE_CONTENT,
    payload: {
      content,
    },
  };
};
