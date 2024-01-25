import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalCommand,
  createCommand,
  $getTextContent,
  $getSelection,
} from "lexical";
import { useCallback, useState } from "react";
import { handleAIRequest } from "./util";
import DropDown from "./DropDown";
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
  const [selectedText, setSelectedText] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const getTextContent = useCallback(() => {
    editor.update(() => {
      const selection = window.getSelection();
      const textContent = $getTextContent();
      setSelectedText(textContent);
    });
  }, [editor]);

  const handleAIAssistant = useCallback(
    async (options: Array<string>) => {
      setIsLoadingResponse(true);
      const assitantResponse = await handleAIRequest(
        apiKey,
        selectedText,
        options
      );
      setIsLoadingResponse(false);
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
    getTextContent();
    toggleDropDown();
  };

  const closeDropDown = () => {
    setShowOptions(false);
  };

  const onDropDownClick = (options: Array<string>) => {
    handleAIAssistant(options);
    setShowOptions(false);
  };

  return (
    <div>
      <button
        style={{ outline: "none", background: "transparent", border: "none" }}
        onClick={openDropDown}
      >
        <span>AI</span>
      </button>
      {showOptions && (
        <DropDown
          parentRef={parentRef}
          closeDropDown={closeDropDown}
          setShowOptions={setShowOptions}
          onDropDownClick={onDropDownClick}
        />
      )}
    </div>
  );
}
