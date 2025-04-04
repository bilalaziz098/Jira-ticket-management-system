

  'use strict';

module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    issue_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
      allowNull: false,
    },
    title:{
      type : DataTypes.STRING,
      allowNull: false
    },

    description: {
        type : DataTypes.TEXT,
        allowNull: false
    },
    issueType: {
      type : DataTypes.STRING,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'Projects', 
        key: 'project_id'
      },
      allowNull: true
    },
    user_id: {
      type : DataTypes.INTEGER,
      allowNull: false,
      references: {
        model : 'Users',
        key: 'id',
        as: 'user_id'
      }
    },
    assignedTo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Issue.associate = function(models) {
    Issue.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project' 
    });
    Issue.belongsTo(models.Users,{
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  };

  return Issue;
};
