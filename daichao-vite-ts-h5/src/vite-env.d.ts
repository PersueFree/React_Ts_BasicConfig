/// <reference types="vite/client" />
import { Theme } from "styled-components";

declare module "*.svg" {
    import React from "react";
    const content: React.RC<React.SVGProps<SVGSVGElement>>
    export default content;
}

declare module "*.module.css" {
    const classes: { readonly [key: string]: string }
    export default classes;
}

declare module "styled-components" {
    export interface DefaultTheme extends Theme {
        colors: {
            primary: string;
            button: string;
        };
        spacing: (multiplier?: number) => string;
    }
}