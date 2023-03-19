import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/use-actions";
import { useCumulativeCode } from "../hooks/use-cumulative-code";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import axios from "axios";

const CodeCell: React.FC = () => {
  const { createCodeBundle, updateCodeContent } = useActions();

  const codeBundle = useTypedSelector((state) => state.codeBundle);
  const cumulativeCode = useCumulativeCode();
  const [previewHTML, setPreviewHTML] = useState(undefined);

  useEffect(() => {
    axios.get("./preview.html").then((response) => {
      setPreviewHTML(response.data);
    });
  }, []);

  useEffect(() => {
    if (!codeBundle) {
      createCodeBundle(cumulativeCode);
    }

    const timer = setTimeout(async () => {
      createCodeBundle(cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode, codeBundle.content, createCodeBundle]);

  return (
    <>
      <div style={{ height: "95vh" }}>
        <div className="app-wrapper">
          <div style={{ width: "50vw", height: "100vh" }}>
            <CodeEditor
              initialValue={codeBundle.content}
              onChange={(value) => updateCodeContent(value)}
            />
          </div>
          <div style={{ width: "50vw", height: "100vh" }}>
            <Preview
              code={codeBundle.code}
              err={codeBundle.err}
              html={previewHTML}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeCell;
