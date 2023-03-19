export enum CodeBundleActionType {
  CODE_BUNDLE_START = "CODE_BUNDLE_START",
  CODE_BUNDLE_END = "CODE_BUNDLE_END",
  UPDATE_CODE_CONTENT = "UPDATE_CODE_CONTENT",
}

export interface CodeBundleStartAction {
  type: CodeBundleActionType.CODE_BUNDLE_START;
}

export interface CodeBundleEndAction {
  type: CodeBundleActionType.CODE_BUNDLE_END;
  payload: {
    code: string;
    error: string | null;
  };
}

export interface UpdateCodeContentAction {
  type: CodeBundleActionType.UPDATE_CODE_CONTENT;
  payload: {
    content: string;
  };
}

export type CodeBundleAction =
  | CodeBundleStartAction
  | CodeBundleEndAction
  | UpdateCodeContentAction;
