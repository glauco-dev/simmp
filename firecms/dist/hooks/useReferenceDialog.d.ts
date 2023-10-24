import { ReferenceSelectionInnerProps } from "../core";
/**
 * This hook is used to open a side dialog that allows the selection
 * of entities under a given path.
 * You can use it in custom views for selecting entities.
 * You need to specify the path of the target collection at least.
 * If your collection is not defined in your  top collection configuration
 * (in your `FireCMS` component), you need to specify explicitly.
 * This is the same hook used internally when a reference property is defined.
 * @category Hooks and utilities
 */
export declare function useReferenceDialog<M extends Record<string, any>>(referenceDialogProps: Omit<ReferenceSelectionInnerProps<M>, "path"> & {
    path?: string | false;
    onClose?: () => void;
}): {
    open: () => void;
    close: () => void;
};
