import User from "../models/userModel.js";

export async function seedUsers() {
  const count = await User.count();
  if (count === 0) {
    await User.bulkCreate([
      { username: "Admin", email: "Admin@bubble.com", password: "admin007", nickname: "Admin-Ts" }
    ]);
    console.log("Adm inserido!");
  } else {
    console.log("Adm já existe, seed ignorado.");
  }
}
