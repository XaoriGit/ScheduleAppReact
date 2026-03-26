export const Theme = {
    System: "system",
    Light: "light",
    Dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export const APP_THEME_LABELS: Record<Theme, string> = {
    [Theme.System]: "Системная",
    [Theme.Light]: "Светлая",
    [Theme.Dark]: "Тёмная",
};
