/* ============================================================
   EDIT THIS FILE to update the website. Nothing else needs touching.
   ============================================================ */

/* APPS
   name, about      : text shown on the site
   icon             : (optional) image path, e.g. "img/annua.png"
   repo             : (optional) "Owner/Repo" on GitHub. Shows version,
                      size, date and download count from its Releases.
   links            : buttons. The first one is the main (filled) button.
   status           : (optional) shown when there are no links yet.   */
const APPS = [
  {
    name: "0XDL",
    about: "A video downloader for Android.",
    status: "In development"
  },
  {
    name: "Annua",
    about: "Birthdays and events, with reminders.",
    icon: "img/annua.png",
    repo: "Zeroex-0X/Annua",
    links: [
      { label: "Download", url: "https://github.com/Zeroex-0X/Annua/releases/latest/download/Annua.apk" },
      { label: "Website",  url: "https://zeroex-0x.github.io/Annua/" },
      { label: "GitHub",   url: "https://github.com/Zeroex-0X/Annua" }
    ]
  }
];

/* PROJECTS: one entry per project.
   Example: { name: "Project name", about: "One line.", link: "https://github.com/Zeroex-0X/repo" } */
const PROJECTS = [];

/* SUPPORT METHODS (support page). Add one entry per method. */
const METHODS = [
  { name: "chaBondhu", about: "Support Zeroex through chaBondhu.", url: "https://chabondhu.com/zeroex", cta: "Open chaBondhu" }
];
