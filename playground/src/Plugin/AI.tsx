import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalCommand,
  createCommand,
  $getTextContent,
  $getSelection,
} from "lexical";
import { useCallback, useState } from "react";
import Icon from "../assets/Luc.svg";
import { handleAIRequest } from "./util";
export const COPY: LexicalCommand<string> = createCommand();
export const PASTE: LexicalCommand<string> = createCommand();

type Props = {
  apiKey: string;
};

export default function AIPlugin({ apiKey }: Props) {
  const [editor] = useLexicalComposerContext();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const ai = useCallback(() => {
    editor.update(() => {
      const textContent = $getTextContent();
      setSelectedText(textContent);
    });
  }, [editor]);

  const handleAIResponse = useCallback(
    (options: Array<string>) => {
      //TODO handleAIRequest(apiKey, selectedText, options);
      editor.update(() => {
        const selection = $getSelection();
        if (selection) {
          selection.insertText("the text I wanted to insert");
        }
      });
    },
    [editor]
  );

  const handleDropdown = () => {
    setShowOptions((prevState) => !prevState);
  };

  return (
    <div>
      <button
        onClick={() => {
          ai();
          setShowOptions((prevState) => !prevState);
        }}
      >
        <img src={Icon} />
      </button>
      {showOptions ? (
        <div>
          <option
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleAIResponse(["shorten"]);
              handleDropdown();
            }}
          >
            shorten
          </option>
          <option
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleAIResponse(["summarize"]);
              handleDropdown();
            }}
          >
            Summarize
          </option>
          <option
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleAIResponse(["simplify"]);
              handleDropdown();
            }}
          >
            Simplify
          </option>
          <option
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleAIResponse(["splelling", "grammar"]);
              handleDropdown();
            }}
          >
            Splelling & Grammar
          </option>
        </div>
      ) : null}
    </div>
  );
}
