import { User as FirebaseUser } from "firebase/auth";
import { AppCheckTokenResult, DataSource, StorageSource } from "../../types";
import { Authenticator, FirebaseAuthController } from "../types/auth";
/**
 * This hook is used internally for validating an authenticator.
 * You may want to use it if you are not using {@link FirebaseCMSApp}, but
 * building your own custom {@link FireCMS} instance.
 * @param authController
 * @param authentication
 * @param getAppCheckToken
 * @param appCheckForceRefresh
 * @param storageSource
 * @param dataSource
 */
export declare function useValidateAuthenticator({ authController, authentication, getAppCheckToken, appCheckForceRefresh, storageSource, dataSource }: {
    authController: FirebaseAuthController;
    authentication?: boolean | Authenticator<FirebaseUser>;
    getAppCheckToken?: (forceRefresh: boolean) => Promise<AppCheckTokenResult> | undefined;
    appCheckForceRefresh?: boolean;
    dataSource: DataSource;
    storageSource: StorageSource;
}): {
    canAccessMainView: boolean;
    authLoading: boolean;
    notAllowedError: any;
    authVerified: boolean;
};
