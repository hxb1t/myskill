import RenderHTML from "react-native-render-html";
import { theme } from "../constants/theme";

export default function AppRenderHtml({ width, data }) {
  const customTagsStyles = {
    b: { fontWeight: "bold" },
    strong: { fontWeight: "bold" },
    i: { fontStyle: "italic" },
    em: { fontStyle: "italic" },
    u: { textDecorationLine: "underline" },
    ul: {
      marginLeft: 10,
      marginBottom: 10,
    },
    li: {
      marginTop: 4,
    },
  };

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: data }}
      tagsStyles={customTagsStyles}
      baseStyle={{
        fontSize: 14,
        textAlign: "left",
        color: theme.colors.text,
        lineHeight: 21,
        marginTop: 5,
      }}
    />
  );
}
