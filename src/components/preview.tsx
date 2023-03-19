import "./preview.css";
import { useRef, useEffect } from "react";

interface PreviewProps {
  code: string;
  err: string | null;
  html: string | undefined;
}

const Preview: React.FC<PreviewProps> = ({ code, err, html }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
