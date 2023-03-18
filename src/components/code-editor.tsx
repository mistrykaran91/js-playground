import "./code-editor.css";

import React, { useRef } from "react";
import MonacoEditor, { OnMount, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import Highlighter from "monaco-jsx-highlighter";
import codeShift from "jscodeshift";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: OnMount = (
    monacoEditor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      const model = monacoEditor.getModel()?.getValue() || "";
      onChange(model);
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    // const highlighter = new Highlighter(
    //   // @ts-ignore
    //   window.monaco,
    //   codeShift,
    //   monacoEditor
    // );
    // highlighter.highLightOnDidChangeModelContent(
    //   () => {},
    //   () => {},
    //   undefined,
    //   () => {}
    // );
  };

  const onFormatClick = () => {};
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>

      <MonacoEditor
        onMount={onEditorDidMount}
        theme="vs-dark"
        value={initialValue}
        language="javascript"
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
