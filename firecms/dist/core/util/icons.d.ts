/// <reference types="react" />
import { CMSView, EntityCollection } from "../../types";
import { SvgIconTypeMap } from "@mui/material";
export declare function getIcon(iconKey?: string): (import("@mui/material/OverridableComponent").OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}) | undefined;
export declare function getIconForView(collectionOrView: EntityCollection | CMSView): React.ComponentType<SvgIconTypeMap["props"]>;
export declare const collectionIconKeys: string[];
