import Bubble from "../models/bubbleAsideModel.js";

export async function seedBubbles() {
    try {
        const count = await Bubble.count();

        if (count > 0) {
            console.log("Bubbles já existem — seed ignorado.");
            return;
        }

        await Bubble.bulkCreate([
            { name: "funny" },
            { name: "games" },
            { name: "pets" },
            { name: "travel" },
            { name: "sports" },
            { name: "music" },
            { name: "nature" },
            { name: "dev" }
        ]);

        console.log("Bolhas inseridas com sucesso!");
    } catch (err) {
        console.error("Erro no seed das bolhas:", err);
    }
}
