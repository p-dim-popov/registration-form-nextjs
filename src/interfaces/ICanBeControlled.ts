export interface ICanBeControlled<T> {
    value?: T;
    onChange?: (value: T) => void;
}
