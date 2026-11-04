// Writes public/wedding.ics from the invitation config, so "Add to calendar" is a plain
// file link (blob downloads fail inside WhatsApp's in-app browser). Runs before every build.
import { writeFileSync } from "node:fs";
import { invitation } from "../src/config/invitation";
import { buildIcs } from "../src/lib/invite-utils";

const site =
  process.env["SITE_URL"] ??
  (process.env["VERCEL_PROJECT_PRODUCTION_URL"]
    ? `https://${process.env["VERCEL_PROJECT_PRODUCTION_URL"]}`
    : "");
writeFileSync(new URL("../public/wedding.ics", import.meta.url), buildIcs(invitation, site));
console.log("public/wedding.ics written");
