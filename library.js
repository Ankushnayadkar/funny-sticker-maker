const funny = [
"Life is short laugh louder",
"I run on chai and chaos",
"Brain loading please wait",
"Why am I like this",
"Certified overthinker",
"Too tired to function",
"Error 404 motivation missing",
"Born to sleep forced to work",
"Low battery human",
"Mentally on vacation"
];

const savage = [
"I said what I said",
"Stay mad",
"Not your level",
"I don’t chase I replace",
"Respect the vibe",
"Zero explanation needed",
"Built different",
"Unbothered always",
"Energy unmatched",
"I’m the standard"
];

const insulting = [
"Even Google can’t fix you",
"You tried that’s enough",
"Confidence without skill",
"NPC behavior detected",
"System error human",
"Upgrade your brain",
"Skill issue",
"Try again later",
"Beta version human",
"Loading intelligence failed"
];

const wishes = [
"Good morning legend",
"Rise and shine",
"Make today epic",
"You got this",
"New day new win",
"Smile and conquer",
"Stay blessed",
"Winning mood only",
"Positive energy today",
"Start strong"
];

const hindi = [
"Zindagi mast hai",
"Sab moh maya hai",
"Jugaad hi life hai",
"Aaj kuch tufani karte hain",
"Dil se happy",
"Scene on hai",
"Full swag",
"No tension",
"Mast rehne ka",
"Bindass life"
];

const festival = [
"Happy Diwali",
"Happy Holi",
"Eid Mubarak",
"Merry Christmas",
"Happy New Year",
"Ganpati Bappa Morya",
"Navratri vibes",
"Festival mode on",
"Celebrate life",
"Joy everywhere"
];

const emoji = ["😂","🔥","😎","💀","✨","🚀","👀","🤣","❤️","☕","🎉","😈","🥳"];

function remix(arr) {
let out = [];
for (let i = 0; i < 20; i++) {
arr.forEach(line => {
const e = emoji[Math.floor(Math.random()*emoji.length)];
out.push(line + " " + e);
});
}
return out;
}

const LIBRARY = {
funny: remix(funny),
savage: remix(savage),
insulting: remix(insulting),
wishes: remix(wishes),
hindi: remix(hindi),
festival: remix(festival)
};
