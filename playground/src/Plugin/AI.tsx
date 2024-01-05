import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalCommand,
  createCommand,
  COPY_COMMAND,
  COMMAND_PRIORITY_NORMAL,
  $getTextContent,
  $getSelection,
} from "lexical";
import { Fragment, useCallback, useEffect, useState } from "react";

export const COPY: LexicalCommand<string> = createCommand();
export const PASTE: LexicalCommand<string> = createCommand();
export function AIPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedContent, setSelectedcontent] = useState("");

  const ai = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      console.log("SELECTION", selection);
      const textContent = $getTextContent();
      console.log("TEXT CONTENT", textContent);
      setSelectedcontent(textContent);
    });
  }, [editor]);

  const handleAIResponse = useCallback((options: Array<string>) => {
    console.log("options", options);
  }, []);

  //   useEffect(() => {
  //     return editor.registerCommand();
  //   }, [editor]);

  const handleDropdown = () => {
    setShowOptions((prevState) => !prevState);
  };

  return (
    <Fragment>
      <button
        onClick={() => {
          ai();
          setShowOptions((prevState) => !prevState);
          //   handleDropdown();
        }}
      >
        AI
      </button>
      {showOptions ? (
        <div>
          <li
            onClick={() => {
              handleAIResponse(["shorten"]);
              handleDropdown();
            }}
          >
            shorten
          </li>
          <li
            onClick={() => {
              handleAIResponse(["summarize"]);
              handleDropdown();
            }}
          >
            Summarize
          </li>
          <li
            onClick={() => {
              handleAIResponse(["simplify"]);
              handleDropdown();
            }}
          >
            Simplify
          </li>
          <li
            onClick={() => {
              handleAIResponse(["splelling", "grammar"]);
              handleDropdown();
            }}
          >
            Splelling & Grammar
          </li>
        </div>
      ) : null}
    </Fragment>
  );
}
