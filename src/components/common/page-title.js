/** @jsx jsx */
import { jsx } from "theme-ui";
import { useWindupString } from "windups";
import Glitch from "./glitch";

const PageTitle = ({ title }) => {
  const [pageTitle] = useWindupString(title, {
    pace: char => (char === " " ? 60 : 100)
  });

  return (
    <h1
      sx={{
        color: "text",
        fontFamily: "Jost",
        fontSize: ["1.7em", "2.5em", "3.8em"],
        fontWeight: "body",
        marginTop: "1em",
        display: "flex",
        justifyContent: "flex-start"
      }}
    >
      <Glitch>{pageTitle}</Glitch>
    </h1>
  );
};

export default PageTitle;
