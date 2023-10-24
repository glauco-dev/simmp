import { EntityCollection, EntityReference } from "../../types";
export declare function getParentReferencesFromPath(props: {
    path: string;
    collections: EntityCollection[] | undefined;
    currentFullPath?: string;
}): EntityReference[];
