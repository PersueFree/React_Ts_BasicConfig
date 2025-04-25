import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
    colors: {
        primary: "#1890ff",
        button: "#52c41a"
    },
    spacing: (multiplier = 1) => `${8 * multiplier}px`
}

export default theme;