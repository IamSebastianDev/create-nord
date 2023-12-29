/** @format */

export const wait = (ms: number = 1000) => new Promise<void>((res) => setTimeout(() => res(), ms));
