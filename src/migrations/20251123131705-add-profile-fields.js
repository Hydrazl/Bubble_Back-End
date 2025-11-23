'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  // Adicionar coluna profilePic
  await queryInterface.addColumn("Users", "profilePic", {
    type: Sequelize.STRING(255),
    allowNull: true,
  });

  await queryInterface.changeColumn("Users", "nickname", {
    allowNull: true,
    defaultValue: null,
  })

  // Adicionar coluna banner
  await queryInterface.addColumn("Users", "banner", {
    type: Sequelize.STRING(255),
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  // Remover as colunas na ordem inversa
  await queryInterface.removeColumn("Users", "banner");
  await queryInterface.removeColumn("Users", "profilePic");
}