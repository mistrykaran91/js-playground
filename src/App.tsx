import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import bundle from "./code-bundler";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import { useCumulativeCode } from "./hooks/use-cumulative-code";

const showFunc = `
import _React from 'react';
import _ReactDOM from 'react-dom';
var show = (value) => {
  const root = document.querySelector('#root');

  if (typeof value === 'object') {
    if (value.$$typeof && value.props) {
      _ReactDOM.render(value, root);
    } else {
      root.innerHTML = JSON.stringify(value);
    }
  } else {
    root.innerHTML = value;
  }
};
`;

const codeinJS = `const CodeCellJs = ()=>{
  return (<div>Red in This..</div>)
}
show(<CodeCellJs/>)
show([1,2,3,4,5])
`

const App: React.FC = () => {
  const [editor, setEditor] = useState({
    code: `<div>Red!!</div>`,
    err: null,
  });

  const [bundledCode, setBundledCode] = useState("");

  const createBundledCode = async (code: string) => {
    debugger;
    const result = await bundle(code);
    console.log(result.code);
    debugger;
    eval(result.code)
    return result;
  };

  // const cumulativeCode = useCumulativeCode(editor.code);

  createBundledCode(`${showFunc}\n\n ${codeinJS}`);

  const updateCode = (code: string) => {  
    debugger;    
    setEditor({ code, err: null });
  };

  // useEffect(() => {
  //   if (!bundledCode) {
  //     createBundledCode(editor.code).then((res) => {
  //       setBundledCode(`${showFunc} \n ${res.code}` );
  //     });
  //     return;
  //   }

  //   const timer = setTimeout(async () => {
  //     createBundledCode(editor.code).then((res) => {
  //       debugger;
  //       setBundledCode(`${showFunc} \n ${res.code}`);
  //     });
  //   }, 750);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [editor]);

  return (
    <div>Hey there!</div>
    // <div style={{ height: "95vh" }}>
    //   <div className="app-wrapper">
    //     <div style={{ width: "50vw", height: "100vh" }}>
    //       <CodeEditor
    //         initialValue={editor.code}
    //         onChange={(value) => updateCode(value)}
    //       />
    //     </div>
    //     <div style={{ width: "50vw", height: "100vh" }}>
    //       <Preview code={bundledCode} err={editor.err} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default App;
