import React from "react";
import { Entity, EntityCollection, FilterValues } from "../../types";
/**
 * @category Components
 */
export interface ReferenceSelectionInnerProps<M extends Record<string, any>> {
    /**
     * Allow multiple selection of values
     */
    multiselect?: boolean;
    /**
     * Entity collection config
     */
    collection?: EntityCollection<M>;
    /**
     * Absolute path of the collection.
     * May be not set if this hook is being used in a component and the path is
     * dynamic. If not set, the dialog won't open.
     */
    path: string;
    /**
     * If you are opening the dialog for the first time, you can select some
     * entity ids to be displayed first.
     */
    selectedEntityIds?: string[];
    /**
     * If `multiselect` is set to `false`, you will get the selected entity
     * in this callback.
     * @param entity
     * @callback
        */
    onSingleEntitySelected?(entity: Entity<any> | null): void;
    /**
     * If `multiselect` is set to `true`, you will get the selected entities
     * in this callback.
     * @param entities
     * @callback
        */
    onMultipleEntitiesSelected?(entities: Entity<any>[]): void;
    /**
     * Allow selection of entities that pass the given filter only.
     */
    forceFilter?: FilterValues<string>;
    /**
     * Use this description to indicate the user what to do in this dialog.
     */
    description?: React.ReactNode;
    /**
     * Maximum number of entities that can be selected.
     */
    maxSelection?: number;
}
/**
 * This component allows to select entities from a given collection.
 * You probably want to open this dialog as a side view using {@link useReferenceDialog}
 * @category Components
 */
export declare function ReferenceSelectionInner<M extends Record<string, any>>({ onSingleEntitySelected, onMultipleEntitiesSelected, multiselect, collection, path: pathInput, selectedEntityIds, description, forceFilter, maxSelection }: ReferenceSelectionInnerProps<M>): import("@emotion/react/jsx-runtime").JSX.Element;
