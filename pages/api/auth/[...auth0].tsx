import { handleAuth } from "@auth0/nextjs-auth0";
import { getUserProfile } from "utils/auth";

export default handleAuth({
  profile: async (req, res, options) => {
    const profile = await getUserProfile(req, res);

    if (!profile) {
      res.status(400).end();
    } else {
      res.status(200).send(profile);
    }
  },
});
