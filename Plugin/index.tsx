import React, { useCallback, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalCommand,
  createCommand,
  $getTextContent,
  $getSelection,
} from "lexical";
import { handleAIRequest } from "./util";
import Dropdown from "./dropdown";
import "./index.css";

export const COPY: LexicalCommand<string> = createCommand();
export const PASTE: LexicalCommand<string> = createCommand();

type Props = {
  apiKey: string;
  parentRef: React.RefObject<HTMLDivElement>;
};

export default function AIPlugin({ apiKey, parentRef }: Props) {
  const [editor] = useLexicalComposerContext();
  const [showOptions, setShowOptions] = useState(false);

  const getTextContent = useCallback(() => {
    let text = "";
    editor.update(() => {
      const textContent = $getTextContent();
      return textContent;
    });
    return text;
  }, [editor]);

  const handleAIAssistant = useCallback(
    async (options: Array<string>) => {
      const text = getTextContent();
      const assitantResponse = await handleAIRequest(apiKey, text, options);
      editor.update(() => {
        const selection = $getSelection();
        if (selection && assitantResponse) {
          selection.insertText(assitantResponse);
        }
      });
    },
    [editor]
  );

  const toggleDropDown = () => {
    setShowOptions((prevState) => !prevState);
  };

  const openDropDown = () => {
    toggleDropDown();
  };

  const closeDropDown = () => {
    setShowOptions(false);
  };

  const handleDropDown = (options: Array<string>) => {
    handleAIAssistant(options);
    toggleDropDown();
  };

  return (
    <div>
      <button className="button" onClick={openDropDown}>
        <span>AI</span>
      </button>
      {showOptions && (
        <Dropdown
          parentRef={parentRef}
          closeDropDown={closeDropDown}
          setShowOptions={setShowOptions}
          onDropDownClick={handleDropDown}
        />
      )}
    </div>
  );
}
