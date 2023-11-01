import React from "react";
import { useRef, useEffect } from "react";
import tippy from "tippy.js"; // Import Tippy.js
import "tippy.js/dist/tippy.css";
export const ToolTip = ({ content, children }) => {
  const tooltipRef = useRef();

  useEffect(() => {
    tippy(tooltipRef.current, {
      content: content,
      allowHTML: true,
      theme: "tooltip-theme",
    });
  }, [content]);
  return (
    <div className="tooltip" ref={tooltipRef}>
      {children}
    </div>
  );
};