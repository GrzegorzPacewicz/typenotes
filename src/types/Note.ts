export type CategoryType = "money" | "todos" | "reminders" | "work";

export interface Note {
    id?: string;
    title?: string;
    category?: CategoryType;
    details?: string;
}