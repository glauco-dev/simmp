import { EntityCollection, EntityCustomView } from "../../types";
export type NavigationViewInternal<M extends Record<string, any> = any> = NavigationViewEntityInternal<M> | NavigationViewCollectionInternal<M> | NavigationViewEntityCustomInternal<M>;
export interface NavigationViewEntityInternal<M extends Record<string, any>> {
    type: "entity";
    entityId: string;
    path: string;
    parentCollection: EntityCollection<M>;
}
export interface NavigationViewCollectionInternal<M extends Record<string, any>> {
    type: "collection";
    path: string;
    collection: EntityCollection<M>;
}
export interface NavigationViewEntityCustomInternal<M extends Record<string, any>> {
    type: "custom_view";
    path: string;
    view: EntityCustomView<M>;
}
export declare function getNavigationEntriesFromPathInternal(props: {
    path: string;
    collections: EntityCollection[] | undefined;
    customViews?: EntityCustomView<any>[];
    currentFullPath?: string;
}): NavigationViewInternal[];
