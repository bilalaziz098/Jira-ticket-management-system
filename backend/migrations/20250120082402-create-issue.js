'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Issues', {
      issue_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      issueType: {
        type: Sequelize.STRING
      },
      user_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id',
          as: 'user_id'
        },
        onDelete: 'CASCADE',
      },
      project_id: {  
        type: Sequelize.INTEGER,
        allowNull: true,  
        references: {
          model: 'Projects', 
          key: 'project_id',
          as: 'project_id' 
        },
        onDelete: 'CASCADE', 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      assignedTo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down(queryInterface, Sequelize) {
   
    await queryInterface.dropTable('Issues');
  }
};
