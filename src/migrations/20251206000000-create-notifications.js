'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            comment: 'Usuário que receberá a notificação'
        },
        actorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            comment: 'Usuário que realizou a ação'
        },
        notificationType: {
            type: Sequelize.ENUM('like', 'comment', 'follow'),
            allowNull: false
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Posts',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        commentId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        isRead: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
    });

    // Adicionar índices para melhorar performance
    await queryInterface.addIndex('Notifications', ['userId']);
    await queryInterface.addIndex('Notifications', ['actorId']);
    await queryInterface.addIndex('Notifications', ['isRead']);
    await queryInterface.addIndex('Notifications', ['createdAt']);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
}
