export type Setter<X> = (value: X) => void;
export type ElementOf<X> = X extends Array<infer R> ? R : never;
