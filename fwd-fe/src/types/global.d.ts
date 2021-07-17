type Await<T> = T extends Promise<infer A> ? A : never;
