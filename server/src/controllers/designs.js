// Emitters
import { myEmitterErrors } from '../event/errorEvents.js';
import { myEmitterDesigns } from '../event/designEvents.js';
import {
  findAllDesigns,
  findDesignByName,
  createDesign,
  findDesignById,
  deleteDesignById,
  findUserDesignsById,
  checkFileDoesntExist
} from '../domain/designs.js';
import { findUserById } from '../domain/users.js';
// Response messages
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js';
import {
  NotFoundEvent,
  ServerErrorEvent,
  MissingFieldEvent,
  BadRequestEvent,
} from '../event/utils/errorUtils.js';

export const getAllDesigns = async (req, res) => {
  console.log('get all designs');
  try {
    const foundDesigns = await findAllDesigns();

    if (!foundDesigns) {
      const notFound = new NotFoundEvent(
        req.user,
        'Not found event',
        'Designs database'
      );
      myEmitterErrors.emit('error', notFound);
      // Send response
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // myEmitterDesigns.emit('get-all-designs', req.user);
    return sendDataResponse(res, 200, { designs: foundDesigns });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get all designs`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getDesignById = async (req, res) => {
  console.log('DesignById');
  const designId = req.params.designId

  try {
    const foundDesign = await findDesignById(designId);

    if (!foundDesign) {
      const notFound = new NotFoundEvent(
        req.user,
        'Not found event',
        'Cant find design by ID'
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // myEmitterDesigns.emit('get-design-by-id', req.user)
    return sendDataResponse(res, 200, { design: foundDesign });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get design by ID`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getDesignsFromUser = async (req, res) => {
  console.log('get user id design');
  const userId = req.params.userId;

  try {
    const foundUser = await findUserById(userId);

    if (!foundUser) {
      const notFound = new NotFoundEvent(
        req.user,
        'Not found event',
        'Cant find user by ID'
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const foundDesigns = await findUserDesignsById(userId);

    // myEmitterDesigns.emit('get-user-designs', req.user);
    return sendDataResponse(res, 200, { designs: foundDesigns });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(
      req.user,
      `Get user designs by ID`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewDesign = async (req, res) => {
  console.log('createNewDesign');
  const { userId, name, colorPalette } = req.body;

  try {
    if (!req.body) {
      const missingField = new MissingFieldEvent(
        null,
        'Design creation: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const foundDesign = await checkFileDoesntExist(name, userId);

    if (foundDesign) {
      return sendDataResponse(res, 400, { design: 'Design name already exists' });
    }

    const foundUser = await findUserById(userId);

    if (!foundUser) {
      const notFound = new NotFoundEvent(
        req.user,
        'Not found event',
        'Cant find user, design create'
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const createdDesign = await createDesign(userId, name, colorPalette);

    if (!createdDesign) {
      const notCreated = new BadRequestEvent(
        req.user,
        'Not found event',
        'Cant create design for user'
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    // myEmitterDesigns.emit('create-design', createdDesign);
    return sendDataResponse(res, 201, { createdDesign });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Create new design`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const deleteDesign = async (req, res) => {
  console.log('deleteDesign');
  const designId = req.params.designId

  try {
    const foundDesign = await findDesignById(designId);

    if (!foundDesign) {
      const notFound = new NotFoundEvent(
        req.user,
        'Not found design',
        'Event database'
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    await deleteDesignById(designId);
    myEmitterDesigns.emit('deleted-design', req.user);
    return sendDataResponse(res, 200, {
      design: foundDesign,
      message: `Design ${foundDesign.name} deleted`,
    });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Delete design`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
