import { Model } from "sequelize";
import sequelize from "../config/database.js";

class BubbleMember extends Model {}

BubbleMember.init ({}, {sequelize, modelName: "BubbleMember"})

export default BubbleMember;