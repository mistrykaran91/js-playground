import "./code-editor.css";

import React, { useRef } from "react";
import MonacoEditor, { OnMount, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import Highlighter from "monaco-jsx-highlighter";
import codeShift from "jscodeshift";
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

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

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };
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
