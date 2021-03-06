/** @jsx jsx */
import { jsx } from "theme-ui";

const AccentBox = props => (
  <div
    sx={{
      border: "1px solid",
      borderColor: "accent",
      borderRadius: "5px",
      padding: "2em",
      fontFamily: "heading",
      fontWeight: "heading",
      color: "#fff",
      margin: "0 auto",
      backgroundColor: "secondaryDarker"
    }}
  >
    {props.children}
  </div>
);

export default AccentBox;
