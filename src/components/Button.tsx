import styled from "@emotion/styled";

export const Button = styled.button(
  ({
    theme: {
      color: { primary },
    },
  }) => ({
    outline: "none",

    border: `1px solid ${primary}`,
    borderRadius: 8,

    padding: ".6em 1.1em",

    fontSize: ".65em",
    fontWeight: "bolder",

    background: `${primary}33`,

    color: primary,

    "&:hover": {
      background: `${
        primary.startsWith("#") ? primary + "33" : `rgba("${primary}", 0.2)`
      }`,
    },
  })
);

export default Button;
