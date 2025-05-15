import { BsFiletypeHtml } from "react-icons/bs";
import { FaCss3, FaGitAlt, FaInfoCircle, FaJs } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { PiFileSvgThin } from "react-icons/pi";
import { VscJson } from "react-icons/vsc";

export const FileIcon = ({ extension }) => {

    const iconStyle = {
        height: "25px",
        width: "25px",
    }

  const IconMapper = {
    js: (
      <FaJs
        color="yellow"
        style={iconStyle}
      />
    ),
    jsx: (
      <GrReactjs
        color="#268aa7"
        style={iconStyle}
      />
    ),

    css:(
        <FaCss3
        color="#3c99dc"
        style={iconStyle}
        />
    ),
    html:(
        <BsFiletypeHtml
        color="#e34c26"
        style={iconStyle}
        />
    ),
    json:(
        <VscJson
        color="yellow"
        style={iconStyle}
        />
    ),
    md:(
        <FaInfoCircle
        color="#0ebef1"
        style={iconStyle}
        />
    ),
    svg:(
        <PiFileSvgThin
            color="yellowGreen"
            style={iconStyle}
        />
    ),
    gitignore: (
        <FaGitAlt
        color="red"
        style={iconStyle}
        />
    )
  };

  return (
    <>
        {IconMapper[extension]}
    </>
  );
};
