import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import React from "react";

export function MarkdownContent(props: {
  style: string | undefined;
  html: string | undefined;
  headingFont: string | undefined;
  textFont: string | undefined;
  highlightFont: string | undefined;
  headingUppercase: string | undefined;
}) {
  const theme = useTheme();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: props.style ?? "",
        }}
      />
      <div
        className={css({
          fontFamily: props.textFont,
          wordBreak: "break-word",
          "& blockquote": {
            marginLeft: "0",
            marginRight: "0",
            padding: ".5rem 1rem",
            background: theme.palette.background.paper,
            border: `4px solid ${theme.palette.secondary.main}`,
            "& h1,h2,h3,h4,h5,h6": {
              marginTop: ".5rem",
            },
          },
          "&  code": {
            fontFamily: props.highlightFont,
            fontWeight: theme.typography.fontWeightBold,
          },
          "& pre": {
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            background: theme.palette.action.selected,
            borderRadius: "4px",
            fontFamily: theme.typography.body1.fontFamily,
            fontWeight: theme.typography.fontWeightRegular,
            padding: "1rem",
            "& code,": {
              fontFamily: theme.typography.body1.fontFamily,
              fontWeight: theme.typography.fontWeightRegular,
            },
          },

          "& p": {
            ...(theme.typography.body1 as any),
            fontFamily: props.textFont,
          },
          "& a": {
            color: theme.palette.secondary.main,
            fontWeight: "bold",
            "&:visited": {
              color: theme.palette.secondary.main,
            },
          },
          "& .anchor, .anchor:visited": {
            color: theme.palette.text.secondary,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
              color: theme.palette.text.primary,
            },
          },
          "& table": {
            borderSpacing: "initial",
            // borderLeft: `1px solid ${theme.palette.divider}`,
            // borderRight: `1px solid ${theme.palette.divider}`,
            display: "block",
            overflowX: "auto",
            whiteSpace: "nowrap",
            "& thead": {
              "& th": {
                background: theme.palette.primary.main,
                color: theme.palette.getContrastText(
                  theme.palette.primary.main
                ),
                textAlign: "left",
                padding: ".5rem",
                fontFamily: props.highlightFont,

                "&:empty": {
                  display: "none",
                },
                "&:not(:last-child)": {
                  borderLeft: `1px solid ${theme.palette.divider}`,
                },
                "&:last-child": {
                  borderRight: `1px solid ${theme.palette.divider}`,
                },
              },
            },
            "& tbody": {
              "& tr": {
                "&:first-child td": {
                  borderTop: `1px solid ${theme.palette.divider}`,
                },
                "&:nth-child(even)": {
                  background: theme.palette.background.paper,
                },
                "&:nth-child(odd)": {
                  background: theme.palette.background.default,
                },
                "& td": {
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  padding: ".5rem",
                  "&:not(:last-child)": {
                    borderLeft: `1px solid ${theme.palette.divider}`,
                  },
                  "&:last-child": {
                    borderRight: `1px solid ${theme.palette.divider}`,
                  },
                },
              },
            },
          },
          "& img": {
            maxWidth: "100%",
            margin: "0 auto",
            display: "block",
          },
          "& .document-image": {
            fontSize: ".8rem",
            margin: "0 auto",

            "& figcaption": {
              marginTop: "0.5rem",
            },
            "& a": {
              color: theme.palette.text.primary,
            },
          },
          "& h1": {
            ...(theme.typography.h1 as any),
            fontFamily: props.headingFont,
            borderBottom: `4px solid ${theme.palette.text.primary}`,
            textTransform:
              props.headingUppercase === "true" ? "uppercase" : "none",
          },
          "& h2": {
            ...(theme.typography.h2 as any),
            fontFamily: props.headingFont,
            textTransform:
              props.headingUppercase === "true" ? "uppercase" : "none",
          },
          "& h3": {
            ...(theme.typography.h3 as any),
            fontFamily: props.headingFont,

            textTransform:
              props.headingUppercase === "true" ? "uppercase" : "none",
          },
          "& h4": {
            ...(theme.typography.h4 as any),
            fontFamily: props.headingFont,
            textTransform:
              props.headingUppercase === "true" ? "uppercase" : "none",
          },
          "& h5": {
            ...(theme.typography.h5 as any),
            fontFamily: props.headingFont,
            textTransform:
              props.headingUppercase === "true" ? "uppercase" : "none",
          },
          "& h6": {
            ...(theme.typography.h6 as any),
            fontFamily: props.headingFont,
            textTransform:
              props.headingUppercase === "true" ? "uppercase" : "none",
          },
        })}
        dangerouslySetInnerHTML={{
          __html: props.html ?? "",
        }}
      />
    </>
  );
}
