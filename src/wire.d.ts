// Browser behaviour for rendered markup. Both return an unmount function.
export function mountDeck(root: HTMLElement, opts?: { onScene?: (index: number, type: string) => void }): () => void;
export function mountPromotions(root: HTMLElement): () => void;
