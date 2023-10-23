import { Entity, EntityCollection, EntityStatus, EntityValues, FormContext, ResolvedEntityCollection } from "../types";
/**
 * @category Components
 */
export interface EntityFormProps<M extends Record<string, any>> {
    /**
     * New or existing status
     */
    status: EntityStatus;
    /**
     * Path of the collection this entity is located
     */
    path: string;
    /**
     * The collection is used to build the fields of the form
     */
    collection: EntityCollection<M>;
    /**
     * The updated entity is passed from the parent component when the underlying data
     * has changed in the datasource
     */
    entity?: Entity<M>;
    /**
     * The callback function called when Save is clicked and validation is correct
     */
    onEntitySaveRequested: (props: EntityFormSaveParams<M>) => Promise<void>;
    /**
     * The callback function called when discard is clicked
     */
    onDiscard?: () => void;
    /**
     * The callback function when the form is dirty, so the values are different
     * from the original ones
     */
    onModified?: (dirty: boolean) => void;
    /**
     * The callback function when the form original values have been modified
     */
    onValuesChanged?: (values?: EntityValues<M>) => void;
    /**
     *
     * @param id
     */
    onIdChange?: (id: string) => void;
    currentEntityId?: string;
    onFormContextChange?: (formContext: FormContext<M>) => void;
    hideId?: boolean;
    autoSave?: boolean;
    onIdUpdateError?: (error: any) => void;
}
export type EntityFormSaveParams<M extends Record<string, any>> = {
    collection: ResolvedEntityCollection<M>;
    path: string;
    entityId: string | undefined;
    values: EntityValues<M>;
    previousValues?: EntityValues<M>;
    closeAfterSave: boolean;
    autoSave: boolean;
};
/**
 * This is the form used internally by the CMS
 * @param status
 * @param path
 * @param collection
 * @param entity
 * @param onEntitySave
 * @param onDiscard
 * @param onModified
 * @param onValuesChanged
 * @constructor
 * @category Components
 */
export declare const EntityForm: typeof EntityFormInternal;
declare function EntityFormInternal<M extends Record<string, any>>({ status, path, collection: inputCollection, entity, onEntitySaveRequested, onDiscard, onModified, onValuesChanged, onIdChange, onFormContextChange, hideId, autoSave, onIdUpdateError }: EntityFormProps<M>): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
