export interface Note {
    id: string;
    title: string;
    category: "money" | "todos" | "reminders" | "work";
    details: string;
}