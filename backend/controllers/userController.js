import { getAllCollaborators,
        createCollaborator,
        updateCollaboratorById,
        findCollaboratorByName
 } from '../models/userModel.js';

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
        const id = req.params.id;
        const collaborator = req.body;
        const result = await updateCollaboratorById(id, collaborator);
        res.status(200).json({
            status: 'success',
            data: {
                collaborator: result
            }
        });
    } catch (err) {
        console.log(`UPDATE COLLABORATOR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

export const searchCollaborator = async (req, res) => {
    try {
        const { key } = req.query;
        const collaborators = await findCollaboratorByName(key);
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