import { getAllCollaborators, createCollaborator, updateCollaboratorById, findCollaboratorBySearch, deleteCollaboratorById } from '../models/userModel.js';

export const getCollaborators = async (req, res) => {
    try {
      const users = await getAllCollaborators();
      res.status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    } catch (err) {
      console.log(`GET USERS: ${err.message}`);
      res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
  };

  export const addCollaborator = async (req, res) => {
    try {
        const collaborator = req.body;
        const result = await createCollaborator(collaborator);
        res.status(201).json({
            status: 'success',
            data: {
                collaborator: result
            }
        });
    } catch (err) {
        console.log(`ADD COLLABORATOR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};


export const updateCollaborator = async (req, res) => {
    try {
        const { id } = req.params;
        const collaborator = req.body;

        // Check for missing parameters
        const { CO_Nom, CO_Prenom, CO_EMail,CO_Fonction } = collaborator;
        if (!CO_Nom || !CO_Prenom || !CO_EMail || !CO_Fonction) {
            return res.status(400).json({
                status: 'fail',
                message: 'One or more parameters are missing or undefined'
            });
        }

        console.log(`Received update request for collaborator with id: ${id}`);
        const result = await updateCollaboratorById(id, collaborator);
        console.log('Update result:', result);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Collaborator updated successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`UPDATE COLLABORATOR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const searchCollaborator = async (req, res) => {
    try {
        const { key } = req.query;
        const collaborators = await findCollaboratorBySearch(key);
        res.status(200).json({
            status: 'success',
            data: {
                collaborators
            }
        });
    } catch (err) {
        console.log(`SEARCH COLLABORATOR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

export const deleteCollaborator = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteCollaboratorById(id);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Collaborator not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Collaborator deleted successfully'
            }
        });
    } catch (err) {
        console.log(`DELETE COLLABORATOR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};
  