import { MessageObject } from "@api/MessageEvents";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import redirectMap from "./redirectMap"; // <-- Import the redirect map

export default definePlugin({
    name: "ReEmbed",
    description: "Converts unsupported embeds to supported embeds.",
    authors: [{ name: "The Cat", id: 0 }],

    onBeforeMessageSend(_, msg) {
        return this.replaceLinks(msg);
    },

    onBeforeMessageEdit(_, __, msg) {
        return this.replaceLinks(msg);
    },

    replaceLinks(msg: MessageObject) {
        if (!msg.content) return;

        msg.content = msg.content.replace(
            /https?:\/\/(?:www\.)?([a-zA-Z0-9.-]+)\/([^\s<.,:;"')\]\[|]+)/gi,
            (match, domain, path) => {
                const newDomain = redirectMap[domain.toLowerCase()];
                if (!newDomain) return match;
                return `https://${newDomain}/${path}`;
            }
        );

        return msg;
    }
});
