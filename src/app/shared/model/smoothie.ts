import { Nutrition } from "./nutrition";

export interface Smoothie {
    id: number;
    name: String;
    description: String;
    nutritions: Nutrition;
}