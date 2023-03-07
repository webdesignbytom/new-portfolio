// Emitters
import { myEmitterErrors } from '../event/errorEvents.js';
import { myEmitterEvents } from '../event/eventsLog.js';
import { findAllEvents } from '../domain/events.js';
// Response messages
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js';
import {
  NotFoundEvent,
  ServerErrorEvent,
  MissingFieldEvent,
  RegistrationServerErrorEvent,
} from '../event/utils/errorUtils.js';

export const getAllEvents = async (req, res) => {
  console.log('get all events');
  try {
    const foundEvents = await findAllEvents();

    if (!foundEvents) {
      const notFound = new NotFoundEvent(
        req.user,
        'Not found events',
        'Event database'
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    myEmitterEvents.emit('get-all-events', req.user);
    return sendDataResponse(res, 200, { events: foundEvents });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get all events`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
