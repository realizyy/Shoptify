/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
    snap: {
        pay: (transaction: any) => void;
    };
}