export interface ITrackerFun<Result> {
  (): Result;
}

/**
 * Runs a function inside Tracker.autorun and can return reactive data.
 */
export declare function useTracker<Result extends any>(trackerFun: ITrackerFun<Result>, deps?: any[]): Result;

/**
 * Subscribes to a publication and returns a reactive "loading" var.
 */
export declare function useSubscription(pubName: string, ...subOpts?: any[]): boolean;

export interface IUseMethodOptions<Input extends any, Output extends Input> {
  transform?: (result: Input) => Output;
}

export interface IMethodResult<Output, Args> {
  isLoading: boolean;
  data?: Output;
  error?: any;
  call: (...args: Args) => Promise<Output>;
};

/**
 * Returns { isLoading, data, error, call } object to work with meteor methods.
 */
export declare function useMethod(methodName: string, options?: IUseMethodOptions): IMethodResult;

/**
 * Fetches a MongoCursor and returns the result.
 */
export declare function useMongoFetch(cursor: any, deps?: any[]): any;

/**
 * Returns the current logged in User or null.
 */
export declare function useCurrentUser<User extends any>(): User | null;

/**
 * Returns value of a Session var.
 */
export declare function useSession(sessionName: string): any;