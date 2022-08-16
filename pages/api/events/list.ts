import api from "utils/api";
import db from "utils/db";

const url = "/api/events/list/";

const listEvents = api.createHandler({
  url,
  fn: async () => {
    const events = await db.event.findMany();

    return events;
  },
});

export type ListEvents = typeof listEvents;

export default listEvents;
