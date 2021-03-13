import path from "path";
import express from "express";
import { handerError } from "./error";
import { JWT, Auth } from "../lib/token";
import { createState } from "../lib/state";
import { createSocket } from "../lib/socket";
import { api, FORCE_OPEN, HEADERTOKEN } from "../src/service";

import type { Server as Io } from "socket.io";
import type { PostRoom, PostMessage, ResGuests } from "../src/service";

const build = path.join(__dirname, "..", "build");

export = function create({ io, ...auth }: Options) {
  const state = createState();

  const jwt = new JWT(auth);

  const socket = createSocket(state, jwt, io);

  const router = express.Router();

  router.post(api.addMessage, (req, res) => {
    const data: PostMessage = req.body;

    socket.addMessageGuess(data);

    if (data.message.content !== FORCE_OPEN) {
      socket.addMessageAdmin(data);
    }

    res.end();
  });

  router.get(api.online, (req, res) => {
    res.json({ online: state.getOnline() });

    const data: PostRoom = req.query as any;

    state.addRoom(data.room);

    socket.addRoom(data);
  });

  /**
   * Admin Auth
   */
  router.get(api.getGuests, (req, res) => {
    try {
      const token = req.headers[HEADERTOKEN] as string;

      jwt.check(token);

      const data: ResGuests = {
        guests: state.getRooms(),
      };

      res.json(data);
    } catch (error) {
      const [code, data] = handerError(error);

      res.status(code).json(data);
    }
  });

  router.post(api.login, async (req, res) => {
    try {
      const token = await jwt.sigin(req.body);

      res.json({ token });

      socket.setOnlineAdmin();
    } catch (error) {
      const [code, data] = handerError(error);

      res.status(code).json(data);
    }
  });

  router.use(express.static(build));

  return router;
};

/**
 * Types
 */
interface Options extends Auth {
  io: Io;
}
