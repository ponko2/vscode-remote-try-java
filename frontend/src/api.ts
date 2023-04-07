import type { HTTPError } from "ky";
import ky from "ky";

export const api = ky.extend({
  hooks: {
    beforeError: [
      async (error: HTTPError) => {
        const { response } = error;
        const body = (await response.json()) as { message: string };

        if (response?.body) {
          // eslint-disable-next-line no-param-reassign
          error.message = body.message;
        }

        return error;
      },
    ],
  },
});
