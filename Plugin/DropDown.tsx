import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { options } from "./util";
type Props = {
  parentRef: React.RefObject<HTMLDivElement>;
  closeDropDown: () => void;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  onDropDownClick: (options: Array<string>) => void;
};

function DropDown(props: Props) {
  const { parentRef, closeDropDown, onDropDownClick } = props;
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropDown = dropDownRef?.current;
    const parentWrapper = parentRef?.current;

    if (dropDown && parentWrapper) {
      const handle = (event: MouseEvent) => {
        const target = event.target as Node;

        if (dropDown.contains(target) || parentWrapper?.contains(target)) {
          return;
        }

        closeDropDown();
      };

      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, parentRef]);
  return (
    <div className="dropdown" ref={dropDownRef}>
      {options.map((option, idx) => (
        <button
          key={idx}
          className="item"
          onClick={() => {
            onDropDownClick(option.value);
          }}
        >
          <span className="text">{option.name}</span>
        </button>
      ))}
    </div>
  );
}

export default DropDown;
