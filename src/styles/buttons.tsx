import styled from "@emotion/styled";

export const Button = styled.button(({ theme }) => ({
  outline: "none",

  border: `1px solid ${theme.color.primary}`,
  borderRadius: 8,

  padding: ".6em 1.1em",

  fontSize: ".65em",
  fontWeight: "bolder",

  background: `${theme.color.primary}33`,

  color: theme.color.primary,

  "&:hover": {
    background: `${theme.color.primary}40`,
  },
}));
